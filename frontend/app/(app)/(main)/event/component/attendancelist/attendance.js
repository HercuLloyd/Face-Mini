import AttendanceList from "./attendancelist";

export default function Attendance() {
  return (
    //header
    //list
    <div className="mt-20 flex h-fit w-96 flex-col justify-center gap-2">
      <h2 className="text-2xl font-medium">Attendance</h2>
      <AttendanceList />
    </div>
  );
}
