import { useEffect, useState } from "react";
import UpcomingEvent from "./upcomingevent";
import api from "@/app/util/api";
import { Literata } from "next/font/google";

export default function UpcomingList({ profileId }) {
  const [upcomingList, setUpcomingList] = useState([]);

  useEffect(() => {
    getList();
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
  //get all events that have yet to occur or have no date on them
  const formatList = (list) => {
    const now = new Date();
    //remove events before current date
    const oldEventsRemovedList = list
      .map((item) => {
        if (item.time === null) return item;
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
    const slicedList = chronologicalList.slice(0, listLength());

    //send events with no time to bottom of list
    const nullBottom = slicedList.map((item) => {
      if (item.time === null) {
        slicedList.push(slicedList.shift());
      }

      //new list
      //if null add to this new list and remove from sliced
      //then null list back to sliced
    });
    return slicedList;
  };

  return (
    <div
      className={`flex w-full flex-col gap-2 ${upcoming.length === 0 ? "" : "border-b border-slate-400 pb-4"}`}
    >
      <h1
        className={`${upcomingList.length === 0 ? "hidden" : "flex text-lg font-medium"}`}
      >
        Upcoming
      </h1>
      {upcoming}
    </div>
  );
}
