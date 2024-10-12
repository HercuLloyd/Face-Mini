"use client";
import { createContext, useEffect, useState } from "react";
import EventHeader from "../component/eventheader";
import EventPostList from "../component/eventpostlist";
import MemoriesList from "../component/memorieslist";
import MemoriesForm from "../component/memoriesform";
import MessageInput from "../component/messageinput";
import Modal from "@/app/util/components/modal";
import api from "@/app/util/api";
import Attendance from "../component/attendancelist/attendance";
import MainPanel from "@/app/util/components/containers/mainpanel";
import SecondaryPanel from "@/app/util/components/containers/secondarypanel";

//context that has list of all event post and memories
export const EventDataContext = createContext();

export default function Event({ params }) {
  const [filter, setFilter] = useState("chat");
  const [memoriesList, setMemoriesList] = useState([]);
  const [eventPostList, setEventPostList] = useState([]);

  const [memoriesModal, setMemoriesModal] = useState(false);
  const [updateEventPostModal, setUpdateEventPostModal] = useState(false);
  const [targetEvent, setTargetEvent] = useState(false);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = () => {
    api
      .get(`/event/event-posts/${params.id}/`)
      .then((res) => res.data)
      .then((data) => {
        setEventPostList(data);
      });
    api
      .get(`/event/memories-list/${params.id}/`)
      .then((res) => res.data)
      .then((data) => {
        setMemoriesList(data);
      });
  };

  const showList = () => {
    if (filter == "chat") return <EventPostList id={params.id} />;
    else if (filter == "memories") return <MemoriesList eventId={params.id} />;
  };

  return (
    <EventDataContext.Provider
      value={{
        memoriesList,
        setMemoriesList,
        eventPostList,
        setEventPostList,
        getLists,
        setMemoriesModal,
        updateEventPostModal,
        setUpdateEventPostModal,
        targetEvent,
        setTargetEvent,
      }}
    >
      <div className="flex w-full">
        <MainPanel>
          <EventHeader
            currentTab={filter}
            setTab={(tab) => setFilter(tab)}
            createButton={() => setMemoriesModal(true)}
            eventId={params.id}
          />
          {showList()}
          <MessageInput tab={filter} event={params.id} />
        </MainPanel>
        <SecondaryPanel>
          <Attendance />
        </SecondaryPanel>
        <Modal open={memoriesModal} onClose={() => setMemoriesModal(false)}>
          <MemoriesForm eventId={params.id} />
        </Modal>
      </div>
    </EventDataContext.Provider>
  );
}
