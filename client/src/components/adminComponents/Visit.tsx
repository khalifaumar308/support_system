import { visits } from "../../store/slices/types";

type props = {
  visit: visits;
  onClose: () => void;
}

function Visit({ visit, onClose }: props) {
  const date = (visit && visit.createdAt)? new Date(visit.createdAt): new Date()
  return (
    <div className="pl-[2.5%]  sm:pl-[25%] flex items-center content-center fixed -top-[40%] left-0 right-0 bottom-0 bg-[#0c0c0c33]"
    >
      <div className="bg-gray-100 p-5 rounded-lg relative w-[95%] xl:w-[60%]">
        <div>
          <div>
            <h2 className="font-bold text-3xl mb-4">{visit.schoolName}</h2>
            <h2>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</h2>
          </div>
          <div className="flex items-center gap-x-8 my-4">
            <h2>By:</h2>
            <h2>{visit.userName || visit.userId }</h2>
          </div>
          <div>
            <h3 className="text-[#00c274] text-xl">Comments:</h3>
            <h3>{visit.comment}</h3>
          </div>
        </div>
        <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
export default Visit
