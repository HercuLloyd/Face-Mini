import { useContext, useEffect, useState } from "react";
import JoinButton from "./joinbutton";
import api from "@/app/util/api";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
      <div className="flex">
        <PersonAddIcon color="primary" />
        <p className="text-lg font-medium">{attendanceCounter}</p>
      </div>

      <JoinButton eventId={eventId} />
    </div>
  );
}
