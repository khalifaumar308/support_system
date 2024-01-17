import { useGetSchoolsQuery } from "../store/slices/api/apiEndpoints";
import SchoolComp from "../components/adminComponents/SchoolComp";


const Schools = () => {
  const {data:schools, isLoading, isError} = useGetSchoolsQuery({id:false})
  console.log(isLoading, isError)
  const allSchools = isLoading ? [] : schools.schools;
  const schoolDivs = allSchools.map((school, id)=><SchoolComp school={school} key={id} />)
  return isLoading ? (<h1>Loading....</h1>) :
    (<div>{schoolDivs}</div>)
}

export default Schools