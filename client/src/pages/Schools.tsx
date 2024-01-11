import { useGetSchoolsQuery } from "../store/slices/api/apiEndpoints"


const Schools = () => {
  const {data:schools, isLoading, isError} = useGetSchoolsQuery({id:false})
  console.log(isLoading, isError)
  return isLoading ? (<h1>Loading....</h1>) :
    (<div>`${JSON.stringify(schools)}`</div>)
}

export default Schools