import Login from "../components/Login"
import {staff}  from "../assets"
import {back_arrow} from "../assets"

const StaffLogin = () => {
  return (
    <div className="flex w-full">
    <div className="relative">
        <img src={back_arrow} className="absolute top-4 left-4 w-[65px] h-[65px] "/>
        <img src={staff} className="w-full"/>
    </div>
    <div className="ml-10">
        <Login/>
    </div>
    </div>
  )
}

export default StaffLogin