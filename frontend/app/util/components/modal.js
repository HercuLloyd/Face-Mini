export default function Modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? "visible bg-black/20" : "invisible"} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-white p-7 shadow transition-all sm:ml-48 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"} `}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
