"use client";
import api from "@/app/util/api";
import EditDropDown from "@/app/util/components/editdropdown";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import UpdateEventPostForm from "./updateeventpostform";
import Modal from "@/app/util/components/modal";
import { EventDataContext } from "../[id]/page";
import { ProfileContext } from "@/app/context/AuthContext";

export default function EventPost({
  eventPostId,
  type,
  userProfile,
  username,
  created_at,
  text,
  image,
}) {
  const router = useRouter();

  const eventData = useContext(EventDataContext);
  const yourProfileData = useContext(ProfileContext);

  const [profileData, setProfileData] = useState({});
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    api
      .get(`/user/profile/${userProfile}/`)
      .then((res) => res.data)
      .then((data) => {
        setProfileData(data);
        return data;
      });
  };

  const deletePost = async () => {
    try {
      if (type == "event-post")
        await api.delete(`/event/event-post/delete/${eventPostId}/`);
      else if (type == "memories-post")
        await api.delete(`/event/memories-post/delete/${eventPostId}/`);
    } catch (error) {
      alert(error);
    }
    eventData.getLists();
  };

  const editModal = () => {
    if (eventData.targetEvent == eventPostId)
      return (
        <Modal
          open={eventData.updateEventPostModal}
          onClose={() => eventData.setUpdateEventPostModal(false)}
        >
          <UpdateEventPostForm
            type={type}
            eventPostId={eventPostId}
            text={text}
            image={image}
          />
        </Modal>
      );
  };
  const openEditForm = () => {
    eventData.setTargetEvent(eventPostId);
    eventData.setUpdateEventPostModal(true);
  };
  return (
    <div className="flex w-96 flex-col gap-1 pt-4">
      <div className="flex items-center justify-between bg-[#EEFDEE] p-2">
        <div className="flex items-center gap-2 bg-[#EEFDEE]">
          <img
            src={profileData.profile_picture}
            className="h-12 w-12 rounded-sm bg-slate-400 object-cover"
            onClick={() => router.push(`/profile/${userProfile}`)}
          ></img>
          <div className="flex flex-col text-sm font-medium leading-tight">
            <h1 className="font-semibold">{username}</h1>
            <h1 className="font-normal">{created_at}</h1>
          </div>
        </div>
        <div className="">
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-[3px] bg-green-400 pt-2 text-3xl ${
              yourProfileData.id == userProfile ? "" : "hidden"
            }`}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            *
          </button>
          <EditDropDown
            type={type}
            visible={showDropDown}
            closeDropDown={() => setShowDropDown(false)}
            deletePost={() => deletePost()}
            editPost={() => openEditForm()}
          />
        </div>
      </div>

      <h1 className="text-sm">{text}</h1>
      <img
        className={`flex h-96 w-96 flex-col justify-center rounded-md bg-slate-400 object-cover text-center ${
          image ? "" : "hidden"
        }`}
        src={image}
      />
      {editModal()}
    </div>
  );
}
