import Login from "../components/Login"
import {partner} from "../assets"
import {back_arrow} from "../assets"

const PartnerLogin = () => {
  return (
    <div className="flex w-full">
    <div className="relative">
        <img src={back_arrow} className="absolute top-4 left-4 w-[65px] h-[65px] "/>
        <img src={partner} className="w-full"/>
    </div>
    <div className="ml-10">
        <Login/>
    </div>
    </div>
  )
}

export default PartnerLogin