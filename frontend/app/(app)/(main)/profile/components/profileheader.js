import api from "@/app/util/api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "@/app/util/constants";
import { useContext, useEffect, useState } from "react";
import { ProfilePageContext } from "../[id]/page";

import { TbSettings } from "react-icons/tb";

export default function ProfileHeader({
  settingsButton,
  username,
  bio,
  profilePic,
  pageId,
}) {
  const profileDataContext = useContext(ProfilePageContext);

  const [profileData, setProfileData] = useState({ id: "" });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      await api
        .get(
          `/user/get-profile/${
            jwtDecode(localStorage.getItem(ACCESS_TOKEN)).user_id
          }/`,
        )
        .then((res) => res.data)
        .then((data) => {
          setProfileData(data);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className={`${profileData.id === pageId ? "" : "pt-14"}`}>
      <div className="flex items-center justify-end pt-2">
        <button
          className={`h-min rounded-md p-2 hover:bg-gray-200 ${profileData.id == pageId ? "" : "hidden"}`}
          onClick={settingsButton}
        >
          <TbSettings size={40} />
        </button>
      </div>
      <div className="flex h-40 flex-col items-center justify-center border-b border-slate-400">
        <div className={`flex w-96 gap-2`}>
          <img
            src={profileDataContext.profileData.profile_picture}
            className={`h-20 w-20 shrink-0 rounded-md object-cover text-center bg-gray-400${profileDataContext.profileData.profile_picture == null ? "hidden" : ""}`}
          />
          <div className="flex w-full flex-col justify-center">
            <h1 className="text-2xl">{username}</h1>
            <h1>{bio}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
