import { useRef, useState, useEffect, useContext } from "react";
import { ExploreDataContext } from "../page";

export default function PostDropDown({
  visible,
  onClose,
  deletePost,
  editPost,
}) {
  const dropDownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (!dropDownRef.current?.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      ref={dropDownRef}
      className={`absolute mt-2 flex w-20 flex-col divide-y divide-gray-400 rounded-md bg-white p-2 text-start shadow-md ${
        visible ? "" : "hidden"
      }`}
    >
      <p
        className="cursor-pointer hover:bg-gray-100"
        onClick={() => {
          editPost();
          onClose();
        }}
      >
        Edit
      </p>
      <p
        className="cursor-pointer hover:bg-gray-100"
        onClick={() => {
          deletePost();
          onClose();
        }}
      >
        Delete
      </p>
    </div>
  );
}
