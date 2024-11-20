import { useContext, useEffect, useState } from "react";
import BottomBarButton from "./bottombarbutton";
import { ProfileContext } from "@/app/context/AuthContext";

import { TbUserFilled } from "react-icons/tb";
import { TbSearch } from "react-icons/tb";

export default function BottomBar() {
  const [userData, setUserData] = useState({});
  const profileData = useContext(ProfileContext);
  useEffect(() => {
    setUserData(profileData);
  }, [profileData]);
  console.log(userData);
  return (
    <div className="fixed bottom-0 left-0 flex h-12 w-full items-center justify-between border-t border-gray-600 bg-white px-14 sm:hidden">
      <BottomBarButton icon={<TbSearch size={30} />} route={`/`} />
      <BottomBarButton
        icon={<TbUserFilled size={30} />}
        route={`/profile/${userData.id}/`}
      />

      {/* <BottomBarButton name="PROFILE" route={`/profile/${profileData.id}/`} /> */}
    </div>
  );
}
