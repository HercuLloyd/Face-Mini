"use client";
import PostListContainer from "@/app/util/components/containers/postlistcontainer";
import EventPost from "./eventpost";
import { useState, useEffect, useContext } from "react";

import { EventDataContext } from "../[id]/page";

export default function EventPostList({ id }) {
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
    <div className="pb-[72px]">
      <PostListContainer>
        {eventData.eventPostList.length !== 0 ? (
          eventPostList
        ) : (
          <EmptyEventPostList />
        )}
      </PostListContainer>
    </div>
  );
}

function EmptyEventPostList() {
  return (
    <div className="flex h-screen flex-col items-center justify-center pb-20">
      <p className="w-60 text-center text-2xl font-semibold">
        Be the first to share!
      </p>
    </div>
  );
}
