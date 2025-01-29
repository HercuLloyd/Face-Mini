import PostListContainer from "@/app/util/components/containers/postlistcontainer";
import Post from "./post";
import { useContext, useEffect, useState } from "react";
import api from "@/app/util/api";
import { ExploreDataContext } from "../page";
import NoEvents from "../../profile/components/noevent";
import { longDateTimeFormat } from "@/app/util/time";
export default function PostList() {
  const [events, setEvents] = useState([]);

  const exploreData = useContext(ExploreDataContext);

  const exploreList = () => {
    const list = exploreData.eventList.map((eventPost) => (
      <Post
        key={eventPost.id}
        id={eventPost.id}
        event_title={eventPost.event_title}
        username={eventPost.display_name}
        host={eventPost.host}
        location={eventPost.location}
        time={longDateTimeFormat(eventPost.time)}
        text={eventPost.event_description}
        image={eventPost.image}
      />
    ));
    return list.reverse();
  };
  console.log(exploreData.eventList);
  return (
    <div className="">
      <PostListContainer>{exploreList()}</PostListContainer>
    </div>
  );
}
