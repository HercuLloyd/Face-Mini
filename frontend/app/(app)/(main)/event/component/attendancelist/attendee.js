import { useState, createContext } from "react";
import AttendeeModal from "./attendeemodal";
import Modal from "@/app/util/components/modal";
import { useRouter } from "next/navigation";
import api from "@/app/util/api";

export const AttendeeContext = createContext();

export default function Attendee({
  id,
  userProfile,
  profilePicture,
  username,
  extraInfo,
}) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [info, setInfo] = useState(extraInfo);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center gap-2">
        <img
          src={profilePicture}
          className="h-14 w-14 shrink-0 rounded-full bg-slate-400 object-cover"
          onClick={() => router.push(`/profile/${userProfile}`)}
        ></img>
        <div
          className="flex w-full flex-col text-sm font-medium leading-tight"
          onClick={() => {
            setModal(true);
          }}
        >
          <h1 className="font-semibold">{username}</h1>
          <h1 className="w-[300px] truncate font-medium text-gray-800">
            {info}
          </h1>
        </div>
      </div>
      <AttendeeModal
        open={modal}
        onClose={() => setModal(false)}
        id={id}
        userProfile={userProfile}
        profilePicture={profilePicture}
        username={username}
        extraInfo={extraInfo}
        setInfo={(data) => setInfo(data)}
      />
    </div>
  );
}
