import { useAppSelector } from "../../store/hooks";
import { useGetVisitsQuery, useDeleteVisitMutation } from "../../store/slices/api/apiEndpoints";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
// import VisitComp from "../../components/affiliate/VisitComp";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DirectionsWalk } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Visits = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user.id
  const { data: visits, isLoading, refetch } = useGetVisitsQuery({ id: userId || '' }, { refetchOnMountOrArgChange: true })
  const navigate = useNavigate();
  const [deleteVisit] = useDeleteVisitMutation();

  const handleDelete = async(id:string) => {
    // const id = visit._id
    await deleteVisit(id);
    refetch()
  }

  const allVisits = isLoading ? [] : visits?.visits
  const visitsDivs = allVisits?.map(vst => {
    const date = new Date(vst.createdAt || '')
    return (
      <div onClick={() => navigate(`/affiliate/visitsview/${vst._id}`)} className="bg-[#2d3e57] relative text-white mb-1 cursor-pointer p-2 flex gap-4 flex-row mr-1 rounded-md shadow-sm shadow-black">
        <DirectionsWalk />
        <h2 className="ml-1 mr-2">{vst.schoolName}</h2>
        <h2 className="text-green-500">{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</h2>
        <div onClick={() => handleDelete(vst._id|| '')} className="text-red-600 absolute right-2">
          <DeleteForeverIcon />
        </div>
      </div>
    )
  })  
  return isLoading ? (<div>Loading...</div>) : (<div>
    {visitsDivs} 
  </div>
  )
}

export default Visits