import PostListContainer from "@/app/util/components/postlistcontainer";
import ProfilePost from "./profilepost";
import ProfileHeader from "./profileheader";

export default function ProfileList() {
  /*
    get the profile
    get events
    map events to profile event prop
    */
  return (
    <div>
      <PostListContainer>
        <ProfilePost
          username="Big Lloyd"
          text="Text. Text. Text. Text. Text. Text. Text. Text. Text. Text. Text. Text."
          image={true}
        />
        <ProfilePost
          username="Big Lloyd"
          text="Text. Text. Text. Text. Text. Text. Text. Text. Text. Text. Text. Text."
          image={true}
        />
        <ProfilePost
          username="Big Lloyd"
          text="Text. Text. Text. Text. Text. Text. Text. Text. Text. Text. Text. Text."
          image={true}
        />
      </PostListContainer>
    </div>
  );
}
