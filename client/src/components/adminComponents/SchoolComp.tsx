import SchoolIcon from '@mui/icons-material/School';
import { school } from '../../store/slices/types';
import { useNavigate } from 'react-router-dom';

const SchoolComp = ({ school }: { school: school }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/user/schoolview/${school._id}`)} className="bg-[#2d3e57] text-white mb-1 cursor-pointer p-2 flex mr-1 rounded-md shadow-sm shadow-black">
      <SchoolIcon />
      <h2 className="ml-1 ">{school.name}</h2>
    </div>
  )
}

export default SchoolComp