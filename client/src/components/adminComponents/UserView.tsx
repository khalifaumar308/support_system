// import { afiliate } from "../../store/slices/types";
import { useGetSchoolsQuery, useGetUsersQuery } from "../../store/slices/api/apiEndpoints";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SchoolComp from "./SchoolComp";
// import { useState } from "react";
import { useParams } from "react-router-dom"

// type props = {
//   item: { affiliate:afiliate }
// }

const UserView = () => {
  const params = useParams();
  const { data: users, isLoading } = useGetUsersQuery({ id: false })
  // const [view, setView] = useState(true);
  const user = users?.users.filter(user => user._id === params.id)[0]
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false });
  const loading = isLoading || sLoading

  const filterSchool = (id: string) => {
    return schools?.schools.filter(school=>school._id===id)[0]
  }
  console.log(user, isLoading)
  // const schoolsReferred = 

  return loading ? <div>Fetching data...</div>: (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="pl-[280px] flex items-center content-center fixed top-[-15%] left-0 right-0 bottom-0 bgc-[#3f33]"
    >
      <div className="bg-gray-100 p-5 rounded-lg relative w-[90%] xl:ml-[10%] xl:w-[70%]">
        <div className="flex text-orange-400 p-2 gap-2 text-xl align-middle rounded-lg bg-slate-300 pl-[10%]">
          <AccountCircleOutlinedIcon sx={{ width:27}} />
          <h2>{user&&user.name}</h2>
        </div>
        <div className="flex w-full flex-col bg-slate-200 p-2 mt-2">
          <div className="flex flex-row">
            <h2 className="w-full">Email:</h2>
            <p className="ml-2 border-gray-100 rounded-md w-full">{user&&user.email}</p>
          </div>
          <div className="flex flex-row">
            <h2 className="w-full">Phone Number:</h2>
            <p className="ml-2 border-gray-100 rounded-md w-full">{user&&user.phone}</p>
          </div>
          <div className="mt-3">
            <h2 className="mb-1">Schools Referred</h2>
            {user &&
              user.schoolsReferred?.map(({ schoolId }, id) => {
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
          </div>
        </div>
        <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" >
          X
        </button>
      </div>
    </div>
  )
}

export default UserView