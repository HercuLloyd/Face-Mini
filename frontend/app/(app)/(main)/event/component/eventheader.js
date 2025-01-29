import { useContext, useEffect, useState } from "react";
import CreateAndSaveButton from "./createandsavebutton";
import api from "@/app/util/api";
import { EventDataContext } from "../[id]/page";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function EventHeader({
  currentTab,
  setTab,
  createButton,
  eventId,
}) {
  const eventData = useContext(EventDataContext);

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
          <button
            className="h-10 w-10 rounded-md bg-blue-500 p-1 text-white"
            onClick={() => {
              eventData.setJourneyModal(true);
            }}
          >
            <CalendarTodayIcon />
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
