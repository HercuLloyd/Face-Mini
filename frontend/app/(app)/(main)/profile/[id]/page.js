"use client";
import { createContext, useEffect, useState } from "react";
import Modal from "@/app/util/components/modal";
import ProfileHeader from "../components/profileheader";
import ProfileList from "../components/profilelist";
import SettingsForm from "../components/settingsform";
import api from "@/app/util/api";
import Upcoming from "../components/upcoming/upcoming";
import MainPanel from "@/app/util/components/containers/mainpanel";
import SecondaryPanel from "@/app/util/components/containers/secondarypanel";
import { Main } from "next/document";

export const ProfilePageContext = createContext(null);

export default function Profile({ params }) {
  const [settingsModal, setSettingsModal] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    user_memories: [],
  });
  //get profile id

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      await api
        .get(`/user/profile/${params.id}/`)
        .then((res) => res.data)
        .then((data) => {
          setProfileData(data);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ProfilePageContext.Provider
      value={{ profileData, setProfileData, getProfile }}
    >
      <div className="flex w-full">
        <MainPanel>
          <ProfileHeader
            settingsButton={() => setSettingsModal(true)}
            username={profileData.display_name}
            bio={profileData.bio}
            profilePic={profileData.profile_picture}
            pageId={params.id}
          />
          <Upcoming profileId={params.id} />
          <ProfileList />
          <Modal open={settingsModal} onClose={() => setSettingsModal(false)}>
            <SettingsForm onClose={() => setSettingsModal(false)} />
          </Modal>
        </MainPanel>
        <SecondaryPanel></SecondaryPanel>
      </div>
    </ProfilePageContext.Provider>
  );
}
