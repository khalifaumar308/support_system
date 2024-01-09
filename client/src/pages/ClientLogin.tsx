import Login from "../components/Login"
import { client } from "../assets"
import { back_arrow } from "../assets"

const ClientLogin = () => {
  return (
    <div className="flex w-full">
    <div className="relative">
        <img src={back_arrow} className="absolute top-4 left-4 w-[65px] h-[65px] "/>
        <img src={client} className="w-full"/>
    </div>
    <div className="ml-10">
        <Login/>
    </div>
    </div>
  )
}

export default ClientLogin