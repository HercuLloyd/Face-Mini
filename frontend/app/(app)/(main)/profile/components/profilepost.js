"use client";
import { useRouter } from "next/navigation";
import ProfilePostDropDown from "./profilepostdropdown";
import { useContext, useState } from "react";
import DeleteProfileEventModal from "./deleteprofileeventmodal";
import api from "@/app/util/api";
import { ProfilePageContext } from "../[id]/page";
import { ProfileContext } from "@/app/context/AuthContext";

export default function ProfilePost({
  profilePic,
  username,
  location,
  time,
  text,
  image,
  memoryId,
  update,
}) {
  // dropdown state
  // button that changes dropdown state
  //
  const [dropDown, setDropDown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();
  const profilePageData = useContext(ProfilePageContext);
  const profileData = useContext(ProfileContext);

  const deletePost = async () => {
    await api.delete(`/user/profile-memories/delete/${memoryId}/`);
    await api
      .get(`/user/profile-memories/list/${profilePageData.profileData.id}/`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        update(data);
      });
  };

  return (
    <div className="flex w-96 flex-col gap-1 pt-4">
      <div className="flex items-center justify-between bg-[#EEFDEE] p-2">
        <button>
          <div className="flex items-center gap-2" onClick={() => {}}>
            <img
              src={profilePic}
              className="h-12 w-12 rounded-sm bg-slate-400 object-cover"
            ></img>
            <div className="flex flex-col text-start text-sm font-medium leading-tight">
              <h1>{username}</h1>
              <h1>{location}</h1>
              <h1>{time}</h1>
            </div>
          </div>
        </button>
        <div>
          <button
            className={`ml-2 flex h-10 w-10 items-center justify-center rounded-[3px] bg-green-400 pt-2 text-3xl ${profilePageData.profileData.id == profileData.id ? "" : "hidden"}`}
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            *
          </button>
          <ProfilePostDropDown
            visible={dropDown}
            onClose={() => setDropDown(false)}
            deletePost={() => setDeleteModal(true)}
          />
          <DeleteProfileEventModal
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            deletePost={() => deletePost()}
          />
        </div>
      </div>

      <h1 className="text-sm">{text}</h1>
      <img
        src={image}
        className={`flex h-96 w-96 flex-col justify-center rounded-md bg-slate-400 object-cover text-center ${
          image ? "" : "hidden"
        }`}
      />
    </div>
  );
}
