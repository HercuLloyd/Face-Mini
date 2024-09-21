import { useRef, useState, useEffect, useContext } from "react";

export default function ProfilePostDropDown({ visible, onClose, deletePost }) {
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
      className={`absolute top-0 mt-2 flex w-20 flex-col divide-y divide-gray-400 rounded-md bg-white p-2 text-start shadow-md ${
        visible ? "" : "hidden"
      }`}
    >
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
