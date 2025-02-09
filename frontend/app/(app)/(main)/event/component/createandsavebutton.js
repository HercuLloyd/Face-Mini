import api from "@/app/util/api";
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "@/app/context/AuthContext";
import axios from "axios";
import { BASE_URL } from "@/app/util/constants";

export default function CreateAndSaveButton({
  createButton,
  eventId,
  currentTab,
}) {
  const [eventData, setEventData] = useState([]);
  const [saveButton, setSaveButton] = useState(false);
  const currentDate = new Date();

  const yourProfileData = useContext(ProfileContext);
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const axiosURL = `${BASE_URL}/user/profile/update/${yourProfileData.id}/`;
  let formData = new FormData();

  useEffect(() => {
    getEvent();
  }, []);

  //return date or null if empty
  const eventDate = () => {
    if (eventData !== null) return new Date(eventData.time);
    else return null;
  };

  const getEvent = () => {
    api
      .get(`/event/post/get/${eventId}/`)
      .then((res) => res.data)
      .then((data) => {
        setEventData(data);
      });
  };

  const saveEvent = async () => {
    await api.put(
      `/user/profile-memories/add/${yourProfileData.id}/${eventId}/`,
    );
  };

  //check if you event already saved
  const checkIfSaved = async () => {
    if (yourProfileData.id != undefined && saveButton == false) {
      let list;
      await api
        .get(`/user/profile-memories/list/${yourProfileData.id}/`)
        .then((res) => res.data)
        .then((data) => {
          list = data;
        });
      for (const item of list) {
        if (item.event == eventId) {
          setSaveButton(true);
          break;
        }
      }
    }
  };

  const ONE_DAY = 24 * 60 * 60 * 1000;
  function CreateMemoriesButton() {
    if (
      eventDate().getTime() + ONE_DAY > currentDate.getTime() ||
      eventDate().getTime() === 0
    )
      return (
        <button
          className={`rounded-md bg-green-600 px-2 py-2 text-white disabled:bg-slate-400`}
          onClick={createButton}
          disabled={currentTab == "chat"}
        >
          Create
        </button>
      );
  }
  function SaveButton() {
    checkIfSaved();
    console.log(eventDate().getTime());
    if (
      eventDate().getTime() < currentDate.getTime() &&
      eventDate().getTime() !== 0
    )
      return (
        <button
          className={`rounded-md bg-green-600 px-4 py-2 text-white disabled:bg-slate-400`}
          onClick={() => {
            saveEvent();
            setSaveButton(true);
          }}
          disabled={currentTab == "chat" || saveButton}
        >
          {saveButton ? "Saved" : "Save"}
        </button>
      );
  }
  return (
    <div className="flex gap-2">
      <CreateMemoriesButton />
      <SaveButton />
    </div>
  );
}
