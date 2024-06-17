"use client";
import PostListContainer from "@/app/util/components/postlistcontainer";
import EventPost from "./eventpost";
import api from "@/app/util/api";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import MessageInput from "./messageinput";
import { EventDataContext } from "../[id]/page";

export default function EventPostList({ id }) {
  const [posts, setPosts] = useState([]);

  const eventData = useContext(EventDataContext);

  function date(value) {
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const time = new Date(value);
    return f.format(time);
  }

  const eventPostList = eventData.eventPostList.map((post, key) => (
    <EventPost
      key={key}
      type="event-post"
      eventPostId={post.id}
      userProfile={post.user}
      username={post.display_name}
      created_at={date(post.created_at)}
      text={post.message}
      image={post.image}
    />
  ));
  return (
    <div className="pb-14">
      <PostListContainer>{eventPostList}</PostListContainer>
    </div>
  );
}
