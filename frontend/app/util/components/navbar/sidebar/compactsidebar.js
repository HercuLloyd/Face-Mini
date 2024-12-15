import CompactSideBarButton from "./compactsidebarbutton";
import { useState, useEffect } from "react";
import api from "@/app/util/api";
import { jwtDecode } from "jwt-decode";

import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

import { ACCESS_TOKEN } from "@/app/util/constants";

export default function CompactSideBar() {
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
    <div className="sticky top-0 hidden h-screen w-28 shrink-0 flex-col border-r-2 border-stone-400 ps-6 pt-20 md:flex lg:hidden">
      <div className="flex flex-col gap-6">
        <CompactSideBarButton
          icon={<SearchIcon sx={{ color: "#1BB12C" }} fontSize="large" />}
          route={`/`}
        />
        <CompactSideBarButton
          icon={<PersonIcon sx={{ color: "#1BB12C" }} fontSize="large" />}
          route={`/profile/${profileData.id}/`}
        />
      </div>
    </div>
  );
}
