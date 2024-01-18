import UserComp from "../../components/adminComponents/UserComp"
import { useGetUsersQuery } from "../../store/slices/api/apiEndpoints"

const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery({ id: false })
  const affiliates = isLoading? []:users.affiliates
  const usersDiv = affiliates.map((user, id)=><UserComp user={user} key={id} />)
  // const users = getUsers()
  return (
    isLoading?<h2>Loading....</h2>:
    <div>{usersDiv}</div>
  )
}

export default Users