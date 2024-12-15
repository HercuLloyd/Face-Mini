export default function MainPanel({ children }) {
  return (
    <div className="flex h-full w-full justify-center px-2 lg:w-3/5 lg:justify-end">
      <div className="mb-12 h-full w-full sm:mb-0 sm:w-96">{children}</div>
    </div>
  );
}
