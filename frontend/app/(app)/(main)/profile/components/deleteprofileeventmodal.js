import Modal from "@/app/util/components/modal";

export default function DeleteProfileEventModal({ open, onClose, deletePost }) {
  return (
    <div>
      <Modal open={open} onClose={() => onClose()}>
        <div>
          <p className="pb-6 pt-4 text-lg font-medium">
            Are you sure you want to delete event?
          </p>
          <div className="flex w-full items-center justify-center gap-8">
            <p
              className="rounded-md px-6 py-2 text-lg hover:bg-gray-100"
              onClick={() => {
                onClose();
                deletePost();
              }}
            >
              Yes
            </p>
            <p
              className="rounded-md px-6 py-2 text-lg hover:bg-gray-100"
              onClick={() => onClose()}
            >
              No
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
