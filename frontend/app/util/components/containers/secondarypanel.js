export default function SecondaryPanel({ children }) {
  return (
    <div className="hidden h-full w-2/5 justify-start lg:flex">
      <div className="flex w-full pr-4">{children}</div>
    </div>
  );
}
