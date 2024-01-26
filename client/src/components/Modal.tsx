import { ReactNode } from "react";

type props = {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: props) {
  return (
    <div  className="pl-[2.5%]  sm:pl-[25%] flex items-center content-center fixed top-0 left-0 right-0 bottom-0 bg-[#2e312e33]"
    >
      <div className="bg-gray-100 p-5 rounded-lg relative w-[95%] xl:w-[60%]">
        {children}
        <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modal: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     position: "relative",
//     width: "80%",
//     maxWidth: "500px",
//   },
//   closeButton: {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "transparent",
//     border: "none",
//     fontSize: "18px",
//     cursor: "pointer",
//   },
// };

export default Modal;
