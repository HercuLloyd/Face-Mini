"use client";

import Header from "./components/header";
import PostList from "./components/postlist";
import { createContext, use, useContext, useEffect, useState } from "react";
import EventForm from "./components/eventform";
import Modal from "@/app/util/components/modal";
import api from "@/app/util/api";
import UpdateEventForm from "./components/updateeventform";
import { ProfileContext } from "@/app/context/AuthContext";
import MainPanel from "@/app/util/components/containers/mainpanel";
import SecondaryPanel from "@/app/util/components/containers/secondarypanel";

export const ExploreDataContext = createContext();

export default function Home() {
  const profileData = useContext(ProfileContext);

  const [eventModal, setEventModal] = useState(false);
  const [updateEventModal, setUpdateEventModal] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [targetEvent, setTargetEvent] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    getEventList();
  }, []);

  useEffect(() => {
    getUpcomingEvents();
  }, [profileData]);

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
  const getUpcomingEvents = async () => {
    if (profileData.id)
      await api
        .get(`/user/profile-upcoming/list/${profileData.id}/`)
        .then((res) => res.data)
        .then((data) => {
          setUpcomingEvents(data);
          console.log(data);
        });
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
        upcomingEvents,
        getUpcomingEvents,
      }}
    >
      <div className="flex w-full">
        <MainPanel>
          <Header createButton={() => setEventModal(true)} />
          <PostList />
          {modals()}
        </MainPanel>
        <SecondaryPanel></SecondaryPanel>
      </div>
    </ExploreDataContext.Provider>
  );
}
