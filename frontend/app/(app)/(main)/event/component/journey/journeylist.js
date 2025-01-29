import { useContext, useEffect, useState } from "react";
import JourneyPoint from "./journeypoint";
import api from "@/app/util/api";
import { longDateTimeFormat, shortTimeFormat } from "@/app/util/time";
import { JourneyPageEnum } from "./journey";
import { EventDataContext } from "../../[id]/page";

export default function JourneyList({ changePage }) {
  const eventData = useContext(EventDataContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    await api
      .get(`/event/post/get/${eventData.params.id}/`)
      .then((res) => res.data)
      .then((data) => {
        setData(data);
      });
  };

  const formattedList = () => {
    const chronologicalList = eventData.journey.sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });
    //move empty date points to bottom of list
    chronologicalList.forEach((item) => {
      chronologicalList.push(chronologicalList.splice(item, 1)[0]);
    });

    return chronologicalList;
  };

  const journeyList = formattedList().map((point, key) => {
    return (
      <JourneyPoint
        key={key}
        id={point.id}
        type={point.type}
        title={point.title}
        location={point.location}
        startDate={longDateTimeFormat(point.start_date)}
        endDate={shortTimeFormat(point.end_date)}
      />
    );
  });

  return (
    <div className="flex h-96 w-96 flex-col justify-between gap-2">
      <h1 className="text-2xl font-bold">{data.event_title}</h1>
      <div className="scroll scroll- flex h-full flex-col gap-2 overflow-auto">
        {journeyList}
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => changePage(JourneyPageEnum.FORM)}
          className="rounded-md bg-green-600 px-2 py-1 text-white"
        >
          Add
        </button>
      </div>
    </div>
  );
}
