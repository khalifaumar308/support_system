import { useGetVisitsQuery } from "../../store/slices/api/apiEndpoints";
import { DirectionsWalk } from "@mui/icons-material";
import { useState } from "react";
import Visit from "../../components/adminComponents/Visit";
import { visits } from "../../store/slices/types";

const AffiliateVisits = () => {
  const { data: visits, isLoading } = useGetVisitsQuery({ id: '' }, { refetchOnMountOrArgChange: true });
  // const { data: users, isLoading: loading } = useGetUsersQuery({});
  const [open, setOpen] = useState(false);
  const [currentVisit, setCurrentVisit] = useState<visits>({
    userId: '',
    schoolName: '',
    address: '',
    comment: '',
    _id: '',
    createdAt: new Date(''),
    userName: '',
  });
  const onClose = () => {
    setOpen(false);
  };
  
  const allVisits = visits ? visits.visits : [];
  const visitsDiv = allVisits.map((visit, id) => {
    const date = visit.createdAt ? new Date(visit.createdAt) : new Date('');
    return (
      <div onClick={() => {
        setCurrentVisit(allVisits[id]);
        setOpen(true);
      }} key={id} className="bg-[#00c274] font-bold text-xl text-white mb-1 cursor-pointer p-2 flex mr-1 rounded-md shadow-sm shadow-black">
        <DirectionsWalk />
        <h2 className="ml-1 mr-2 w-[80%]">{visit.schoolName}</h2>
        <h2 className="mr-1 text-sm text-black">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</h2>
      </div>
    )
  });

  return (isLoading) ? (<div>Loading...</div>) : (
    <div>
      <div>{visitsDiv}</div>
      {open &&
        <Visit  visit={currentVisit} onClose={onClose}/>
      }
    </div>
  )
}
export default AffiliateVisits