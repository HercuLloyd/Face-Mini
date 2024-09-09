import PostListContainer from "@/app/util/components/postlistcontainer";
import EventPost from "./eventpost";
import { useState, useEffect, useContext } from "react";
import api from "@/app/util/api";
import { EventDataContext } from "../[id]/page";

export default function MemoriesList({ eventId }) {
  const eventData = useContext(EventDataContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = () => {
    api
      .get(`/event/memories-list/${eventId}/`)
      .then((res) => res.data)
      .then((data) => {
        setPosts(data);
      });
  };

  function date(value) {
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "full",
      timeStyle: "short",
    });
    const time = new Date(value);
    return f.format(time);
  }
  const memoriesList = eventData.memoriesList.map((post, key) => (
    <EventPost
      key={key}
      type="memories-post"
      eventPostId={post.id}
      userProfile={post.user}
      username={post.display_name}
      created_at={date(post.created_at)}
      text={post.message}
      image={post.image}
    />
  ));

  return (
    <div>
      <PostListContainer>{memoriesList}</PostListContainer>
    </div>
  );
}
