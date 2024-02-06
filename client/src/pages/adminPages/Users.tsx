// import UserComp from "../../components/adminComponents/UserComp"
import { useGetUsersQuery, useGetSchoolsQuery } from "../../store/slices/api/apiEndpoints";
import { useState } from "react";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { appUser } from "../../store/slices/types";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SchoolComp from "../../components/adminComponents/SchoolComp";

const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery({ id: false }, { refetchOnMountOrArgChange: true });
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false });
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<appUser>({name:'', email:'', role:''});
  const affiliates = isLoading ? [] : users ? users.users : [];
  console.log(currentUser)
  const usersDiv = affiliates.map((user, id) =>(
    <div onClick={() => {
      setCurrentUser(user)
      setOpen(true)
     }} key={id} className="bg-[#00c274] font-bold text-xl text-white mb-1 cursor-pointer p-2 flex mr-1 rounded-md shadow-sm shadow-black">
    <AccountCircleSharpIcon />
    <h2 className="ml-1 ">{user.name}</h2>
  </div>))
  // const users = getUsers()
  const filterSchool = (id: string) => {
    return schools?.schools.filter(school => school._id === id)[0]
  }
  return (
    (isLoading||sLoading) ? <h2>Loading....</h2> : (
    <>
        <div>{usersDiv}</div>
        {open &&
          <div className="pl-[2.5%]  sm:pl-[25%] flex items-center content-center fixed -top-[40%] left-0 right-0 bottom-0 bg-[#02020233]"
          >
            <div className="bg-gray-100 p-5 rounded-lg relative w-[95%] xl:w-[60%]">
              <div className="flex text-orange-400 p-2 gap-2 text-xl align-middle rounded-lg bg-slate-300 pl-[10%]">
                <AccountCircle sx={{ width: 27 }} />
                <h2>{currentUser.name}</h2>
              </div>
              <div>
                <div className="flex flex-row">
                  <h2 className="w-full">Email:</h2>
                  <p className="ml-2 border-gray-100 rounded-md w-full">{currentUser.email}</p>
                </div>
                {currentUser.role === 'Staff' && (
                  <div>
                    <div className="flex flex-row">
                      <h2 className="w-full">Department:</h2>
                      <p className="ml-2 border-gray-100 rounded-md w-full">{currentUser.department}</p>
                    </div>
                    <div className="flex flex-row">
                      <h2 className="w-full">Rank:</h2>
                      <p className="ml-2 border-gray-100 rounded-md w-full">{currentUser.rank}</p>
                    </div>
                    <div className="flex flex-row">
                      <h2 className="w-full">Address:</h2>
                      <p className="ml-2 border-gray-100 rounded-md w-full">{currentUser.address}</p>
                    </div>
                  </div>
                )}
                {currentUser.role==='Affiliate'&&
                  <>
                  <div className="flex flex-row">
                      <h2 className="w-full">Phone Number:</h2>
                      <p className="ml-2 border-gray-100 rounded-md w-full">{currentUser.phone}</p>
                  </div>
                  <div className="flex flex-row">
                    <h2 className="w-full">Location:</h2>
                    <p className="ml-2 border-gray-100 rounded-md w-full">{currentUser.location}</p>
                  </div>
                    <div className="mt-3">
                      <h2 className="mb-1">Schools Referred</h2>
                      {currentUser.schoolsReferred?.map(({ schoolId }, id) => {
                          return (
                            <SchoolComp key={id} school={filterSchool(schoolId) || {
                              email: '',
                              name: '',
                              students: 0,
                              currentTerm: 'First Term',
                              address: ''
                            }} />)
                        })
                      }
                    </div></>
                }
              </div>
              <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" onClick={()=>setOpen(false)}>
                X
              </button>
            </div>
          </div>
        }
    </>
  ))
}

export default Users