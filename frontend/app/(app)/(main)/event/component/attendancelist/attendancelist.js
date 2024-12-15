import { useContext } from "react";
import { EventDataContext } from "../../[id]/page";
import Attendee from "./attendee";
import { useEffect } from "react";

export default function AttendanceList() {
  const eventData = useContext(EventDataContext);
  //console.log(eventData.attendance);

  const attendancelist = eventData.attendance.map((user, key) => (
    <Attendee
      key={key}
      id={user.id}
      userProfile={user.user}
      profilePicture={user.profile_picture}
      extraInfo={user.extra_info}
      username={user.display_name}
    />
  ));

  return (
    <div className="flex h-60 w-full flex-col gap-4 overflow-y-auto overflow-x-hidden">
      {attendancelist}
    </div>
  );
}
