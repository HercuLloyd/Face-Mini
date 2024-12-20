"use client";
import api from "@/app/util/api";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import PostDropDown from "./postdropdown";
import { ExploreDataContext } from "../page";
import DeleteConfirmationModal from "./deleteconfirmationmodal";
import { ProfileContext } from "@/app/context/AuthContext";
import EventFooter from "./postfooter/footer";

import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Post({
  id,
  host,
  event_title,
  username,
  location,
  time,
  text,
  image,
}) {
  const router = useRouter();

  const exploreData = useContext(ExploreDataContext);
  const profileData = useContext(ProfileContext);

  const [hostProfileData, setHostProfileData] = useState({});
  const [showDropDown, setShowDropDown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getHostProfile();
  }, []);

  const getHostProfile = async () => {
    try {
      await api
        .get(`/user/profile/${host}/`)
        .then((res) => res.data)
        .then((data) => {
          setHostProfileData(data);
          return data;
        });
    } catch (error) {
      alert(error);
    }
  };

  const deletePost = async () => {
    try {
      await api.delete(`/event/post/delete/${id}/`);
    } catch (error) {
      alert(error);
    }
    exploreData.getEventList();
  };

  const editPost = () => {
    exploreData.setUpdateEventModal(true);
    exploreData.setTargetEvent(id);
  };

  return (
    <div className="flex w-full flex-col gap-2 pt-4 sm:w-96">
      <div className="flex items-center justify-between bg-[#EEFDEE] p-2">
        <div className="flex w-full items-center gap-2">
          <img
            src={hostProfileData.profile_picture}
            className="h-12 w-12 shrink-0 rounded-sm bg-slate-400 object-cover"
            onClick={() => router.push(`/profile/${host}`)}
          />
          <div
            className="flex w-full cursor-pointer flex-col text-start text-sm font-medium leading-tight"
            onClick={() => router.push(`/event/${id}/`)}
          >
            <h1 className="font-semibold">{username}</h1>
            <h1>{location}</h1>
            <h1>{time}</h1>
          </div>
        </div>

        <div className="">
          <button
            className={`ml-2 flex items-center justify-center rounded-[3px] bg-green-400 p-2 text-3xl ${host == profileData.id ? "" : "hidden"}`}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <MoreVertIcon sx={{ color: "black" }} />
          </button>
          <PostDropDown
            visible={showDropDown}
            onClose={() => setShowDropDown(false)}
            deletePost={() => setDeleteModal(true)}
            editPost={() => editPost()}
          />
          <DeleteConfirmationModal
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            deletePost={() => deletePost()}
          />
        </div>
      </div>
      <div className="">
        <h1 className="text-sm font-semibold">{event_title}</h1>
        <h1 className="text-sm">{text}</h1>
      </div>

      <div
        className={`flex w-full cursor-default flex-col justify-center rounded-md bg-slate-400 text-center sm:h-96 sm:w-96 ${
          image ? "" : "hidden"
        }`}
      >
        <img
          className="aspect-square w-full rounded-sm object-cover"
          src={image}
          onClick={() => router.push(`/event/${id}/`)}
        />
      </div>
      <EventFooter eventId={id} />
    </div>
  );
}
