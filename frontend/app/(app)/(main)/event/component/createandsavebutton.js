import api from "@/app/util/api";
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "@/app/context/AuthContext";
import axios from "axios";
import { BASE_URL } from "@/app/util/constants";

export default function CreateAndSaveButton({
  createButton,
  saveButton,
  eventId,
  currentTab,
}) {
  const [eventData, setEventData] = useState([]);
  const currentDate = new Date();
  const eventDate = new Date(eventData.time);

  const yourProfileData = useContext(ProfileContext);
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const axiosURL = `${BASE_URL}/user/profile/update/${yourProfileData.id}/`;
  let formData = new FormData();

  useEffect(() => {
    getEvent();
  }, []);
  // take event id get event and the location and compare it to the current date

  const getEvent = () => {
    api
      .get(`/event/post/get/${eventId}/`)
      .then((res) => res.data)
      .then((data) => {
        setEventData(data);
      });
  };

  const saveEvent = async () => {
    const newData = yourProfileData.user_memories;
    formData.append("user_memories", [172, 170]);
    await axios.put(axiosURL, formData, config);
    console.log("event saved");
  };

  console.log(yourProfileData);

  //Get Profile Information

  //check if event date is past current date
  //if not show create button
  //if so show save button

  const createAndSaveButton = () => {
    if (eventDate > currentDate)
      return (
        <button
          className={`rounded-md bg-green-600 px-2 py-2 text-white disabled:bg-slate-400`}
          onClick={createButton}
          disabled={currentTab == "chat"}
        >
          Create
        </button>
      );
    return (
      <button
        className={`rounded-md bg-green-600 px-4 py-2 text-white disabled:bg-slate-400`}
        onClick={() => saveEvent()}
        disabled={currentTab == "chat"}
      >
        Save
      </button>
    );
  };
  return <div>{createAndSaveButton()}</div>;
}
