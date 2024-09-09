import PostListContainer from "@/app/util/components/postlistcontainer";
import ProfilePost from "./profilepost";
import ProfileHeader from "./profileheader";
import { ProfilePageContext } from "../[id]/page";
import { useContext, useEffect, useState } from "react";
import api from "@/app/util/api";

export default function ProfileList() {
  //get profile
  const profileContext = useContext(ProfilePageContext);
  const [memoriesData, setMemoriesData] = useState([]);
  const profileId = profileContext.profileData.id;

  useEffect(() => {
    loadMems();
  }, [profileId]);

  function date(value) {
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const time = new Date(value);
    return f.format(time);
  }

  const loadMems = async () => {
    if (profileId !== undefined)
      await api
        .get(`/user/profile-memories-list/${profileContext.profileData.id}/`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setMemoriesData(data.reverse());
        });
  };

  const profileMemoriesList = () => {
    return memoriesData.map((memory, key) => (
      <ProfilePost
        key={key}
        profilePic={profileContext.profileData.profile_picture}
        username={memory.display_name}
        location={memory.location}
        time={date(memory.time)}
        text={memory.event_title}
        image={memory.image}
      />
    ));
  };

  return (
    <div>
      <PostListContainer>{profileMemoriesList()}</PostListContainer>
    </div>
  );
}
