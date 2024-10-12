import { useContext, useEffect, useState } from "react";
import JoinButton from "./joinbutton";
import api from "@/app/util/api";
import { ExploreDataContext } from "../../page";

export default function EventFooter({ eventId }) {
  const exploreData = useContext(ExploreDataContext);
  const [attendanceCounter, setAttendanceCounter] = useState();
  useEffect(() => {
    getAttendance();
  }, [exploreData.upcomingEvents]);

  const getAttendance = () => {
    api
      .get(`/event/event-user/list/${eventId}/`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data.length);
        setAttendanceCounter(data.length);
      });
  };
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-medium">{attendanceCounter}</p>
      <JoinButton eventId={eventId} />
    </div>
  );
}
