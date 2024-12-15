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
    <div className="sticky top-0 flex w-full items-center justify-center">
      <div className="h-20 w-full border-b-2 border-stone-400 bg-white sm:w-96">
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
