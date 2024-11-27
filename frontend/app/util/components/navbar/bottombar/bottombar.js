import { useContext, useEffect, useState } from "react";
import BottomBarButton from "./bottombarbutton";
import { ProfileContext } from "@/app/context/AuthContext";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function BottomBar() {
  const [userData, setUserData] = useState({});
  const profileData = useContext(ProfileContext);
  useEffect(() => {
    setUserData(profileData);
  }, [profileData]);
  console.log(userData);
  return (
    <div className="fixed bottom-0 left-0 flex h-12 w-full items-center justify-between border-t border-gray-600 bg-white sm:hidden">
      <BottomBarButton icon={<PersonAddIcon color="primary" />} route={`/`} />
      <BottomBarButton
        icon={<PersonAddIcon color="primary" />}
        route={`/profile/${userData.id}/`}
      />
    </div>
  );
}
