import PostListContainer from "@/app/util/components/containers/postlistcontainer";
import Post from "./post";
import { useContext, useEffect, useState } from "react";
import api from "@/app/util/api";
import { ExploreDataContext } from "../page";
export default function PostList() {
  const [events, setEvents] = useState([]);

  const exploreData = useContext(ExploreDataContext);

  function date(value) {
    // console.log(new Date(value).getUTCMilliseconds());
    // console.log(value);
    const time = new Date(value);
    if (value == null) {
      return "";
    }
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "long",
      timeStyle: "short",
    });

    return f.format(time);
  }

  const exploreList = () => {
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
    return list.reverse();
  };
  return (
    <div className="">
      <PostListContainer>{exploreList()}</PostListContainer>
    </div>
  );
}
