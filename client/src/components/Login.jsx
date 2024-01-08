import { useState } from "react"
// import { zenkleus } from "../assets"

const Login = () => {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('') 

    const userIdChangeHandler = () => {
        setUserId(userId)
    }

    const passwordChangeHandler = () => {
        setPassword(password)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
    }
  return (
    <div className="flex flex-col mt-20">
        <div className="flex justify-center items-center mb-10">
        <h1 className="text-blue-800 text-[40px] font-medium">Login To Your Portal</h1>
        </div>
        <div className="flex justify-center items-center"> 
            <form onSubmit={onSubmitHandler}>
                <div className="flex flex-col">
                <label className="text-black text-opacity-70 text-xl mb-3 ml-3 font-medium">User ID</label>
                <input type="text" placeholder="Enter email address" onChange={userIdChangeHandler} className=" py-[21px] w-[740px] pr-[490px] text-xl mb-20 rounded-[15px] shadow border-2 border-green-600 inline-flex text-center text-stone-900 text-opacity-30 font-medium"/>
                <label className="text-black text-opacity-70 text-xl mb-3 ml-3 font-medium">Password</label>
                <input type="password" placeholder="Enter Password" onChange={passwordChangeHandler} className="py-[21px] w-[740px] pl-[23px] pr-[490px] text-xl mb-20 rounded-[15px] shadow border-2 border-green-600 inline-flex text-center text-stone-900 text-opacity-30 font-medium"/>
                </div>
                <div className="flex justify-between mb-10">
                    <div className="flex">
                    <input type="checkbox" className="w-[20px]  border-green-600 backdrop-blur-sm"/>
                    <p className="text-zinc-600 text-xl font-semibold ml-2">Remember me</p>
                    </div>
                    <div>
                        <p className="text-zinc-600 text-xl font-semibold">Forgot Password?</p>
                    </div>
                </div>
                <button className="text-center  text-white text-xl font-medium w-[740px] h-[71px] py-4 bg-green-600 rounded-[30px] shadow justify-center items-center inline-flex">LOGIN</button>
            </form>
        </div>
        {/* <div className="flex items-end">
            <img src={zenkleus} className="w-[250px] h-[160px]"/>
        </div> */}
    </div>
  )
}

export default Login