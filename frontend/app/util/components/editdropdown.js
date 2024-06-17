import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { EventDataContext } from "@/app/(app)/(main)/event/[id]/page";

export default function EditDropDown({
  visible,
  closeDropDown,
  deletePost,
  editPost,
}) {
  const eventData = useContext(EventDataContext);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const dropDownRef = useRef(null);
  const router = useRouter();

  const handleClickOutside = (e) => {
    if (!dropDownRef.current?.contains(e.target)) {
      closeDropDown();
    }
  };

  return (
    <div
      ref={dropDownRef}
      className={`absolute mt-2 flex flex-col divide-y divide-gray-400 bg-white shadow-md rounded-md w-20 p-2 ${
        visible ? "" : "hidden"
      }`}
    >
      <p
        className="hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          closeDropDown();
          editPost();
          eventData.getLists();
        }}
      >
        Edit
      </p>
      <p
        className="hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          deletePost();
          closeDropDown();
        }}
      >
        Delete
      </p>
    </div>
  );
}
