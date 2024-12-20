import { ProfileContext } from "@/app/context/AuthContext";
import api from "@/app/util/api";
import { useContext, useEffect, useState } from "react";
import { ExploreDataContext } from "../../page";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function JoinButton({ eventId }) {
  const profileData = useContext(ProfileContext);
  const exploreData = useContext(ExploreDataContext);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    checkJoined();
  }, [exploreData.upcomingEvents]);

  const joinEvent = async () => {
    if (!joined) {
      setJoined(true);
      await api.post(`/event/event-user/create/${profileData.id}/${eventId}/`);
      exploreData.getUpcomingEvents();
      return;
    }
    cancelEvent();
  };

  const cancelEvent = async () => {
    const upcomingList = exploreData.upcomingEvents;
    let joinedEvent;
    //find event in your upcoming events
    for (const upcoming of upcomingList) {
      if (upcoming.event == eventId) {
        joinedEvent = upcoming.id;
        break;
      }
    }
    setJoined(false);
    await api.delete(`/event/event-user/delete/${joinedEvent}/`);
    exploreData.getUpcomingEvents();
  };

  const checkJoined = () => {
    const upcomingList = exploreData.upcomingEvents;
    const eventIdList = upcomingList.map((event) => {
      return event.event;
    });
    //check if the current event is in the upcoming events list
    if (eventIdList.includes(eventId)) {
      setJoined(true);
    }
  };
  return (
    <div>
      <button className="rounded-md" onClick={() => joinEvent()}>
        {joined ? (
          <PersonRemoveIcon sx={{ color: "#1BB12C" }} fontSize="large" />
        ) : (
          <PersonAddAlt1Icon sx={{ color: "#1BB12C" }} fontSize="large" />
        )}
      </button>
    </div>
  );
}
