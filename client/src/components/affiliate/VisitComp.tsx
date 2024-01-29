import { visits } from "../../store/slices/types";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DirectionsWalk } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import { useDeleteVisitMutation } from "../../store/slices/api/apiEndpoints";


const VisitComp = ({ visit }:{visit:visits}) => {
  // const navigate = useNavigate();
  const [deleteVisit, { isLoading }] = useDeleteVisitMutation();

  const handleDelete = () => {
    const id = visit._id;
    deleteVisit(id || '')
    console.log(isLoading)
  }
  return (
    <div className="bg-[#2d3e57] relative text-white mb-1 cursor-pointer p-2 flex flex-row mr-1 rounded-md shadow-sm shadow-black">
      <DirectionsWalk />
      <h2 className="ml-1 w-full
      ">{visit.schoolName}</h2>
      <div onClick={handleDelete} className="text-red-600 absolute right-2 hover:text-red-400">
        <DeleteForeverIcon />
      </div>
    </div>
  )
}

export default VisitComp;