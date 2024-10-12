export default function SecondaryPanel({ children }) {
  return (
    <div className="hidden h-full w-2/5 justify-start lg:flex lg:bg-blue-500">
      <div>{children}</div>
    </div>
  );
}
