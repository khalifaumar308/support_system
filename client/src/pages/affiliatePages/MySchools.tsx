import { useAppSelector } from "../../store/hooks"
import { useGetAffiliateSchoolsQuery } from "../../store/slices/api/apiEndpoints";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';


const MySchools = () => {
  const user = useAppSelector(selectCurrentUser);
  const id = user.id
  const navigate = useNavigate();
  const { data: schools, isLoading, isError, Error } = useGetAffiliateSchoolsQuery({ id }, { refetchOnMountOrArgChange: true })

  return (isLoading? (<div>Loading...</div>):
    <div>{schools.schools.map((school, id) => (
      <div onClick={() => navigate(`/affiliate/schoolview/${school._id}/${school.percentage}`)} className="bg-[#2d3e57] sm:w-[50%] sm:ml-[5%] text-white mb-1 cursor-pointer p-2 flex mr-1 rounded-md shadow-sm shadow-black">
        <SchoolIcon />
        <h2 className="ml-1 ">{school.name}</h2>
      </div>
    ))}
    </div>
  )
}

export default MySchools