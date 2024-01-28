import { useState, useEffect } from "react";
import { useLoginMutation } from "../store/slices/api/apiEndpoints";
import { setCredentials } from "../store/slices/api/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";

const Login = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [saveUser, setSaveUser] = useState<boolean>(false)

  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    setErrMsg("");
  }, [userId, password]);

  useEffect(() => {
    if (isError) {
      if (error && 'status' in error) {
        const status = error.status
        if (status === 400) {
          setErrMsg("Missing Email or Password");
        } else if (status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
      }
    }
  }, [isError, error])

  const onSubmitHandler = async () => {
    const userData = await loginUser({ email: userId, password }).unwrap();
    console.log(userData, isLoading)
      dispatch(setCredentials({ ...userData }));
      if (saveUser) {
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      if (userData.role === "Affiliate") {
        navigate("/affiliate/dashboard")
      } else {
        navigate('/user/dashboard')
      }
  }

  return (
    <div className="flex flex-col mt-20">
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-blue-800 text-[40px] font-medium">
          Login To Your Portal
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <div>
          <p className={errMsg ? "flex text-red-700" : "hidden"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="flex flex-col">
            <label className="text-black text-opacity-70 text-xl mb-3 ml-3 font-medium">
              User ID
            </label>
            <input
              type="text"
              placeholder="Enter email address"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
              className=" py-[21px] w-[740px] pr-[490px] text-xl mb-20 rounded-[15px] shadow border-2 border-green-600 inline-flex text-center text-stone-900 text-opacity-30 font-medium"
            />
            <label className="text-black text-opacity-70 text-xl mb-3 ml-3 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-[21px] w-[740px] pl-[23px] pr-[490px] text-xl mb-20 rounded-[15px] shadow border-2 border-green-600 inline-flex text-center text-stone-900 text-opacity-30 font-medium"
            />
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex">
              <input
                type="checkbox"
                checked={saveUser}
                onChange={() => setSaveUser(!saveUser)}
                className="w-[20px]  border-green-600 backdrop-blur-sm"
              />
              <p className="text-zinc-600 text-xl font-semibold ml-2">
                Remember me
              </p>
            </div>
            <div>
              <p className="text-zinc-600 text-xl font-semibold">
                Forgot Password?
              </p>
            </div>
          </div>
          <button
            onClick={onSubmitHandler}
            className="text-center  text-white text-xl font-medium w-[740px] h-[71px] py-4 bg-green-600 rounded-[30px] shadow justify-center items-center inline-flex"
          >
            LOGIN
          </button>
          {isLoading &&
            <div>Loging in....</div>
          }
        </div>
      </div>
      {/* <div className="flex items-end">
            <img src={zenkleus} className="w-[250px] h-[160px]"/>
        </div> */}
    </div>
  );
}

export default Login