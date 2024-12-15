"use client";
import { useRouter } from "next/navigation";
import ProfilePostDropDown from "./profilepostdropdown";
import { useContext, useEffect, useState } from "react";
import DeleteProfileEventModal from "./deleteprofileeventmodal";
import api from "@/app/util/api";
import { ProfilePageContext } from "../[id]/page";
import { ProfileContext } from "@/app/context/AuthContext";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";

export default function ProfilePost({
  profilePic,
  username,
  location,
  time,
  text,
  image,
  memoryId,
  deletePost,
}) {
  // dropdown state
  // button that changes dropdown state
  //
  const [dropDown, setDropDown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();
  const [memoryImages, setMemoryImages] = useState([]);
  const [imageCounter, setImageCounter] = useState(0);
  const profilePageData = useContext(ProfilePageContext);
  const profileData = useContext(ProfileContext);

  //get a list of all memories in an event
  //make a list of all images in those memories\

  useEffect(() => {
    getMemoryData();
    setImageCounter(0);
  }, [image]);

  console.log(memoryImages.length);
  const getMemoryData = async () => {
    await api
      .get(`/user/profile-memories/get/${memoryId}/`)
      .then((res) => res.data)
      .then((data) => {
        const imageList = data.map((memory) => memory.image);
        if (image != null || undefined) imageList.unshift(image);
        setMemoryImages(imageList.filter(Boolean));
      });
  };

  return (
    <div className="flex w-full flex-col gap-1 pt-4 sm:w-96">
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
        <div className="relative">
          <button
            className={`ml-2 flex items-center justify-center rounded-[3px] bg-green-400 p-2 text-3xl ${profilePageData.profileData.id == profileData.id ? "" : "hidden"}`}
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <MoreVertIcon sx={{ color: "black" }} />
          </button>
          <ProfilePostDropDown
            visible={dropDown}
            onClose={() => setDropDown(false)}
            deletePost={() => {
              deletePost();
            }}
          />
        </div>
      </div>

      <h1 className="text-sm">{text}</h1>
      <div className="relative">
        <img
          src={memoryImages[imageCounter]}
          className={`flex aspect-square flex-col justify-center rounded-md bg-slate-400 object-cover text-center sm:h-96 sm:w-96 ${
            memoryImages.length !== 0 ? "" : "hidden"
          }`}
        />
        <button
          className="absolute left-0 top-0 h-full w-1/4"
          onClick={() => {
            if (imageCounter > 0) setImageCounter(imageCounter - 1);
          }}
        ></button>
        <button
          className="absolute right-0 top-0 h-full w-1/4"
          onClick={() => {
            if (imageCounter < memoryImages.length - 1)
              setImageCounter(imageCounter + 1);
          }}
        ></button>
      </div>
      {/* <DeleteProfileEventModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        deletePost={() => deletePost()}
      /> */}
    </div>
  );
}
