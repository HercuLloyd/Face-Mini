"use client";
import { useRouter } from "next/navigation";

export default function ProfilePost({
  profilePic,
  username,
  location,
  time,
  text,
  image,
}) {
  const router = useRouter();
  return (
    <div className="flex w-96 flex-col gap-1 pt-4">
      <button>
        <div
          className="flex items-center gap-2 bg-gray-100 p-2"
          onClick={() => {}}
        >
          <img
            src={profilePic}
            className="h-12 w-12 rounded-sm bg-slate-400 object-cover"
          ></img>
          <div className="flex flex-col text-start text-sm font-medium leading-tight">
            <h1>{username}</h1>
            <h1>{location}</h1>
            <h1>{time}</h1>
          </div>
        </div>
      </button>

      <h1 className="text-sm">{text}</h1>
      <img
        src={image}
        className={`flex h-96 w-96 flex-col justify-center rounded-md bg-slate-400 object-cover text-center ${
          image ? "" : "hidden"
        }`}
      />
    </div>
  );
}
