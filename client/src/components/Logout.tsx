import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logOut } from '../store/slices/api/authSlice';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logOut())
    localStorage.removeItem("userData")
    navigate("/login")
  }
  return (
    <div onClick={handleClick} className="bg-blue-600 cursor-pointer rounded-lg m-8 flex flex-col items-center p-4 text-xl align-middle mt-20 text-white h-24">
      Logout
      <LogoutRoundedIcon />
    </div>
  )
}

export default Logout