import SideBarButton from "./sidebarbutton";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../../api";
import { ACCESS_TOKEN } from "../../../constants";

export default function Sidebar() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    api
      .get(
        `/user/get-profile/${
          jwtDecode(localStorage.getItem(ACCESS_TOKEN)).user_id
        }/`,
      )
      .then((res) => res.data)
      .then((data) => {
        setProfileData(data);
      });
  };

  return (
    <div className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r-2 border-stone-400 ps-6 pt-4 lg:flex">
      <h1 className="mb-10 ml-2 text-2xl font-semibold text-green-600">
        FACE 2 FACE
      </h1>
      <div className="flex flex-col gap-4">
        <SideBarButton name="EXPLORE" route="/" />
        <SideBarButton name="PROFILE" route={`/profile/${profileData.id}/`} />
      </div>
    </div>
  );
}
