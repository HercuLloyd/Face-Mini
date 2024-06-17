import PostListContainer from "@/app/util/components/postlistcontainer";
import Post from "./post";
import { useContext, useEffect, useState } from "react";
import api from "@/app/util/api";
import { ExploreDataContext } from "../page";
export default function PostList() {
  const [events, setEvents] = useState([]);

  const exploreData = useContext(ExploreDataContext);

  function date(value) {
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const time = new Date(value);
    return f.format(time);
  }

  const list = exploreData.eventList.map((eventPost) => (
    <Post
      key={eventPost.id}
      id={eventPost.id}
      event_title={eventPost.event_title}
      username={eventPost.display_name}
      host={eventPost.host}
      location={eventPost.location}
      time={date(eventPost.time)}
      text={eventPost.event_description}
      image={eventPost.image}
    />
  ));
  return (
    <div>
      <PostListContainer>{list}</PostListContainer>
    </div>
  );
}
