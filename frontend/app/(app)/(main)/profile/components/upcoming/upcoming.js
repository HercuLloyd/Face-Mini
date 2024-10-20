import UpcomingList from "./upcominglist";

export default function Upcoming({ profileId }) {
  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <h1 className="flex w-96 text-lg font-medium">Upcoming</h1>
      <UpcomingList profileId={profileId}></UpcomingList>
    </div>
  );
}
