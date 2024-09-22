import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../util/api";
import { ACCESS_TOKEN } from "../util/constants";

export const ProfileContext = createContext();

export default function AuthContext({ children }) {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (localStorage.getItem(ACCESS_TOKEN) !== null) {
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
    }
  };

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
}
