import api from "@/app/util/api";
import { useContext } from "react";
import { EventDataContext } from "../../[id]/page";

import DeleteIcon from "@mui/icons-material/Delete";

//Individual point in a journey that have different types

export default function JourneyPoint({
  id,
  type,
  position,
  title,
  location,
  startLocation,
  endLocation,
  startDate,
  endDate,
}) {
  return (
    <div>
      {type == "POINT" ? (
        <JourneyLocation
          id={id}
          title={title}
          location={location}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <JourneyRoute
          title={title}
          startLocation={startLocation}
          endLocation={endLocation}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
}

//Points that are locations
function JourneyLocation({ id, title, location, startDate, endDate }) {
  const eventData = useContext(EventDataContext);

  const deleteJourneyPoint = async () => {
    await api.delete(`/event/journey/delete/${id}/`);
    eventData.getJourney();
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <h2>{location}</h2>
        <div className="flex gap-1">
          <p>{startDate ? `${startDate}` : ""}</p>
          <p>{startDate && endDate ? `- ${endDate}` : ""}</p>
        </div>
      </div>

      <button
        className="h-10 w-10 rounded-md bg-green-600 text-white"
        onClick={() => {
          deleteJourneyPoint();
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

//Points that are transportation routes
function JourneyRoute({
  title,
  position,
  startLocation,
  endLocation,
  startDate,
  endDate,
}) {
  return (
    <div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <h2>{`${startLocation} - ${endLocation}`}</h2>
      <p>{`${startDate} - ${endDate}`}</p>
    </div>
  );
}
