import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { afiliate } from '../../store/slices/types';
import { useNavigate } from 'react-router-dom';

const UserComp = ({ user }: { user: afiliate }) => {
  const navigate = useNavigate()
  console.log(user.name)
  return (
    <div onClick={() => navigate(`/user/userview/${user._id}`)} className="bg-[#00c274] font-bold text-xl text-white mb-1 cursor-pointer p-2 flex mr-1 rounded-md shadow-sm shadow-black">
      <AccountCircleSharpIcon />
      <h2 className="ml-1 ">{user.name}</h2>
    </div>
  )
}

export default UserComp