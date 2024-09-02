import { useEffect, useState } from "react";
import CreateAndSaveButton from "./createandsavebutton";
import api from "@/app/util/api";

export default function EventHeader({
  currentTab,
  setTab,
  createButton,
  eventId,
}) {
  return (
    <div className="sticky top-0 flex items-center justify-center">
      <div className="h-20 w-96 border-b-2 border-stone-400 bg-white">
        <h1 className="flex h-full items-center justify-between">
          <button
            className={`text-xl font-medium ${currentTab == "chat" ? "text-green-600" : ""}`}
            onClick={() => setTab("chat")}
          >
            CHAT
          </button>
          <button
            className={`text-xl font-medium ${currentTab == "memories" ? "text-green-600" : ""}`}
            onClick={() => setTab("memories")}
          >
            MEMORIES
          </button>

          <CreateAndSaveButton
            createButton={createButton}
            eventId={eventId}
            currentTab={currentTab}
          />
        </h1>
      </div>
    </div>
  );
}
