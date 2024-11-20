import UpcomingList from "./upcominglist";

export default function Upcoming({ profileId }) {
  return (
    <div className="mt-2 flex flex-col items-center gap-1 border border-white border-b-slate-400 pb-4">
      <UpcomingList profileId={profileId}></UpcomingList>
    </div>
  );
}
