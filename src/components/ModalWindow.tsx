import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const ModalWindow = ({ clockTime }: { clockTime: string }) => {
  return (
    <>
      <Modal
        open={true}
        onClose={() => {}}
        center
        closeOnOverlayClick={false}
        showCloseIcon={false}
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-semibold">💥 Game Over!</h2>
          <p>
            You survived for{" "}
            <span className="text-red-600 font-black">{clockTime}</span>
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="border block w-full bg-orange-500 p-4 rounded-lg text-white uppercase font-black"
          >
            Try Again?
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalWindow;
