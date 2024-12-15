export default function NoEvents({ empty }) {
  return (
    <div
      className={`${empty ? "flex h-full w-full justify-center pt-4" : "hidden"}`}
    >
      No Event Posts
    </div>
  );
}
