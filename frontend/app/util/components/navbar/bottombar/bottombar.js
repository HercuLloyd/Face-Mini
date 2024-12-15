import { useContext, useEffect, useState } from "react";
import BottomBarButton from "./bottombarbutton";
import { ProfileContext } from "@/app/context/AuthContext";

import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

export default function BottomBar() {
  const [userData, setUserData] = useState({});
  const profileData = useContext(ProfileContext);
  useEffect(() => {
    setUserData(profileData);
  }, [profileData]);
  return (
    <div className="fixed bottom-0 left-0 flex h-12 w-full items-center justify-between border-t border-gray-600 bg-white md:hidden">
      <BottomBarButton
        icon={<SearchIcon sx={{ color: "#1BB12C" }} fontSize="large" />}
        route={`/`}
      />
      <BottomBarButton
        icon={<PersonIcon sx={{ color: "#1BB12C" }} fontSize="large" />}
        route={`/profile/${userData.id}/`}
      />
    </div>
  );
}
