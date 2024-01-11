import { useAppDispatch } from "../store/hooks"
import { useGetUsersQuery } from "../store/slices/api/apiEndpoints"

const Users = () => {
  const {data:users, isLoading } = useGetUsersQuery({id:false})
  // const users = getUsers()
  return (
    isLoading?<h2>Loading....</h2>:
    <div>{`${JSON.stringify(users)}`}</div>
  )
}

export default Users