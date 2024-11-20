export default function MainPanel({ children }) {
  return (
    <div className="flex h-full w-full justify-center px-4 lg:w-3/5 lg:justify-end">
      <div className="mb-12 h-full sm:mb-0">{children}</div>
    </div>
  );
}
