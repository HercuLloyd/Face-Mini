import PostListContainer from "@/app/util/components/containers/postlistcontainer";
import EventPost from "./eventpost";
import { useState, useEffect, useContext } from "react";
import api from "@/app/util/api";
import { EventDataContext } from "../[id]/page";
import { longDateTimeFormat } from "@/app/util/time";

export default function MemoriesList({ eventId }) {
  const eventData = useContext(EventDataContext);

  const memoriesList = eventData.memoriesList.map((post, key) => (
    <EventPost
      key={key}
      type="memories-post"
      eventPostId={post.id}
      userProfile={post.user}
      username={post.display_name}
      created_at={longDateTimeFormat(post.created_at)}
      text={post.message}
      image={post.image}
    />
  ));

  return (
    <div>
      <PostListContainer>
        {eventData.memoriesList.length !== 0 ? (
          memoriesList
        ) : (
          <EmptyMemoriesList />
        )}
      </PostListContainer>
    </div>
  );
}

function EmptyMemoriesList() {
  return (
    <div className="flex h-screen flex-col items-center justify-center pb-20">
      <p className="w-60 text-center text-2xl font-semibold">
        Be the first to share!
      </p>
    </div>
  );
}
