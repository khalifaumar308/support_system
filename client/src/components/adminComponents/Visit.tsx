import { visits } from "../../store/slices/types";

type props = {
  visit: visits;
  onClose: () => void;
}

function Visit({ visit, onClose }: props) {
  return (
    <div className="pl-[2.5%]  sm:pl-[25%] flex items-center content-center fixed top-0 left-0 right-0 bottom-0 bg-[#2e312e33]"
    >
      <div className="bg-gray-100 p-5 rounded-lg relative w-[95%] xl:w-[60%]">
        <div>
          {JSON.stringify(visit)}
        </div>
        <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
export default Visit
