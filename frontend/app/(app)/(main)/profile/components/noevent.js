export default function NoEvents({ empty }) {
  return (
    <div
      className={`${empty ? "flex h-full w-full justify-center border-t border-stone-400 pt-2" : "hidden"}`}
    >
      No Event Posts
    </div>
  );
}
