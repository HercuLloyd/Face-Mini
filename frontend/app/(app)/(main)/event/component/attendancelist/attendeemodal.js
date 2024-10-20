import Modal from "@/app/util/components/modal";
import AttendeeForm from "./attendeeform";
import { useContext, useState } from "react";
import { ProfileContext } from "@/app/context/AuthContext";
export default function AttendeeModal({
  open,
  onClose,
  id,
  userProfile,
  profilePicture,
  username,
  extraInfo,
  setInfo,
}) {
  const profileId = useContext(ProfileContext);
  const [editSelected, setEditSelected] = useState(false);
  const isUser = () => {
    if (userProfile === profileId.id) return true;
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className="flex w-80 flex-col gap-2">
          <div className="flex items-center gap-2 border-b pb-3">
            <img
              className="h-14 w-14 rounded-full object-cover"
              src={profilePicture}
            ></img>

            <p className="font-medium">{username}</p>
          </div>

          <p className={`${isUser() && editSelected ? "hidden" : "pt-1"}`}>
            {extraInfo}
          </p>

          {isUser() && editSelected && (
            <AttendeeForm
              id={id}
              extraInfo={extraInfo}
              onClose={() => onClose()}
              setInfo={(data) => setInfo(data)}
              editSelected={(clicked) => setEditSelected(clicked)}
            ></AttendeeForm>
          )}
          <div className="flex w-full justify-end">
            <button
              className={`${editSelected || !isUser() ? "hidden" : "w-fit rounded-md bg-green-600 px-4 py-2 text-white"}`}
              onClick={() => setEditSelected(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
