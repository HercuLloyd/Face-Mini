import { useEffect, useState } from "react";
import UpcomingEvent from "./upcomingevent";
import api from "@/app/util/api";
import { Literata } from "next/font/google";

export default function UpcomingList({ profileId }) {
  const [upcomingList, setUpcomingList] = useState([]);

  useEffect(() => {
    getList();
    console.log(upcomingList);
  }, []);
  const getList = async () => {
    await api
      .get(`/user/profile-upcoming/list/${profileId}/`)
      .then((res) => res.data)
      .then((data) => {
        const list = formatList(data);
        setUpcomingList(list);
      });
  };

  const upcoming = upcomingList.map((item) => (
    <UpcomingEvent
      profilePicture={item.profile_picture}
      eventTitle={item.event_title}
      location={item.location}
      time={item.time}
      eventId={item.event}
    />
  ));

  const formatList = (list) => {
    const now = new Date();
    //remove events before current date
    const oldEventsRemovedList = list
      .map((item) => {
        const eventTime = new Date(item.time);
        if (eventTime > now) return item;
      })
      .filter(Boolean);
    //sort in chronological order
    const chronologicalList = oldEventsRemovedList.sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
    });

    //upcoming list up to 3 items
    const listLength = () => {
      if (chronologicalList.length < 3) return chronologicalList.length;
      return 3;
    };
    list = chronologicalList.slice(0, listLength());
    console.log(list);
    return list;
  };

  console.log(upcomingList.length === 0);
  return (
    <div className="flex flex-col gap-2">
      <h1
        className={`${upcomingList.length === 0 ? "hidden" : "flex w-96 text-lg font-medium"}`}
      >
        Upcoming
      </h1>
      {upcoming}
    </div>
  );
}
