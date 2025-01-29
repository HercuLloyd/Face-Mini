import { useEffect, useState } from "react";
import JourneyPoint from "./journeypoint";
import api from "@/app/util/api";
import { longDateTimeFormat, shortTimeFormat } from "@/app/util/time";
import JourneyForm from "./journeyform";
import JourneyList from "./journeylist";

export const JourneyPageEnum = Object.freeze({
  LIST: "LIST",
  FORM: "FORM",
});

export const JourneyType = Object.freeze({
  POINT: "POINT",
  ROUTE: "ROUTE",
});

export default function Journey({ eventId }) {
  //list of events

  //create a enum of different states for journey
  //Journey.LIST Journey.FORM

  const [journeyPage, setJourneyPage] = useState(JourneyPageEnum.LIST);

  const journeyPageSelect = () => {
    if (journeyPage == JourneyPageEnum.LIST)
      return (
        <JourneyList
          eventId={eventId}
          changePage={(page) => setJourneyPage(page)}
        />
      );
    else if (journeyPage == JourneyPageEnum.FORM)
      return (
        <JourneyForm
          eventId={eventId}
          changePage={(page) => setJourneyPage(page)}
        />
      );
  };

  return <div>{journeyPageSelect()}</div>;
}
