"use client";

import Header from "./components/header";
import PostList from "./components/postlist";
import { createContext, use, useEffect, useState } from "react";
import EventForm from "./components/eventform";
import Modal from "@/app/util/components/modal";
import api from "@/app/util/api";
import UpdateEventForm from "./components/updateeventform";

export const ExploreDataContext = createContext();

export default function Home() {
  const [eventModal, setEventModal] = useState(false);
  const [updateEventModal, setUpdateEventModal] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [targetEvent, setTargetEvent] = useState();

  useEffect(() => {
    getEventList();
  }, []);

  const getEventList = async () => {
    try {
      await api
        .get("/event/event-list/")
        .then((res) => res.data)
        .then((data) => {
          setEventList(data);
        })
        .catch((err) => alert(err));
    } catch (error) {
      alert(error);
    }
  };

  const modals = () => {
    if (updateEventModal) {
      return (
        <Modal
          open={updateEventModal}
          onClose={() => setUpdateEventModal(false)}
        >
          <UpdateEventForm eventId={targetEvent} />
        </Modal>
      );
    }
    if (eventModal) {
      return (
        <Modal open={eventModal} onClose={() => setEventModal(false)}>
          <EventForm onClose={() => setEventModal(false)} />
        </Modal>
      );
    }
  };

  return (
    <ExploreDataContext.Provider
      value={{
        eventList,
        setEventList,
        getEventList,
        eventModal,
        setEventModal,
        updateEventModal,
        setUpdateEventModal,
        targetEvent,
        setTargetEvent,
      }}
    >
      <div className="w-full">
        <Header createButton={() => setEventModal(true)} />
        <PostList />
      </div>
      {modals()}
    </ExploreDataContext.Provider>
  );
}
