import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UpcomingEvent({
  username,
  eventTitle,
  profilePicture,
  location,
  time,
  eventId,
}) {
  useEffect(() => {}, []);

  const router = useRouter();

  function date(value) {
    if (value === null) return "";
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const time = new Date(value);
    return f.format(time);
  }

  return (
    <div
      className="flex w-96 cursor-pointer gap-2 rounded-md bg-[#EEFDEE] p-2 text-sm leading-tight"
      onClick={() => router.push(`/event/${eventId}/`)}
    >
      <img className="h-12 w-12 rounded-sm object-cover" src={profilePicture} />
      <div className="flex flex-col justify-center">
        <p className="font-semibold">{eventTitle}</p>
        <p className="font-medium">{location}</p>
        <p className="font-medium">{date(time)}</p>
      </div>
    </div>
  );
}
