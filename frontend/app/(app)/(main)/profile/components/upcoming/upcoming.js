import UpcomingList from "./upcominglist";

export default function Upcoming({ profileId }) {
  return (
    <div className="mt-2 flex w-full flex-col items-center gap-1">
      <UpcomingList profileId={profileId}></UpcomingList>
    </div>
  );
}
