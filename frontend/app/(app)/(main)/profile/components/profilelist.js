import PostListContainer from "@/app/util/components/containers/postlistcontainer";
import ProfilePost from "./profilepost";
import DeleteProfileEventModal from "./deleteprofileeventmodal";
import ProfileHeader from "./profileheader";
import { ProfilePageContext } from "../[id]/page";
import { useContext, useEffect, useState } from "react";
import api from "@/app/util/api";

export default function ProfileList() {
  //get profile
  const profileContext = useContext(ProfilePageContext);
  const [memoriesData, setMemoriesData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [seletedPost, setSeletedPost] = useState();
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
  //console.log(memoriesData);

  const loadMems = async () => {
    if (profileId !== undefined)
      await api
        .get(`/user/profile-memories/list/${profileContext.profileData.id}/`)
        .then((res) => res.data)
        .then((data) => {
          setMemoriesData(data.reverse());
        });
  };

  const deletePost = async (memoryId) => {
    await api.delete(`/user/profile-memories/delete/${memoryId}/`);
    //remove element from local list and rerender
    const newList = memoriesData.filter((post) => post.id != seletedPost);
    setMemoriesData(newList);
    console.log(newList);
  };

  const profileMemoriesList = () => {
    return memoriesData.map((memory, key) => (
      <ProfilePost
        key={key}
        memoryId={memory.id}
        profilePic={profileContext.profileData.profile_picture}
        username={memory.host_name}
        location={memory.location}
        time={date(memory.created_at)}
        text={memory.event_title}
        image={memory.image}
        deletePost={() => {
          setDeleteModal(true);
          setSeletedPost(memory.id);
        }}
      />
    ));
  };

  return (
    <div>
      <PostListContainer>{profileMemoriesList()}</PostListContainer>
      <DeleteProfileEventModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        deletePost={() => deletePost(seletedPost)}
      />
    </div>
  );
}
