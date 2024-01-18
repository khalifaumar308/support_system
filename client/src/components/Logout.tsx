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
    <div onClick={handleClick} className="bg-slate-500 cursor-pointer m-8 flex flex-col items-center p-4 text-xl align-middle mt-20 text-red-700 h-24">
      Logout
      <LogoutRoundedIcon />
    </div>
  )
}

export default Logout