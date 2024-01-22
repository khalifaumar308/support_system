import { useParams } from "react-router-dom";
import { useGetSingleVisitQuery } from "../../store/slices/api/apiEndpoints";

const VisitView = () => {
  const visitId = useParams().id
  const { data: visit, isLoading, isError, Error } = useGetSingleVisitQuery({ id: visitId });
  const date = isLoading? new Date(): new Date(visit?.visit.createdAt)
  const viewContent = isLoading ? (<div>Loading...</div>) : (
    <div className="flex w-full flex-col bg-slate-200 p-2 mt-2">
      <div className="flex flex-row">
        <h2>School Name:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{visit?.visit.schoolName}</p>
      </div>
      <div className="flex flex-row">
        <h2>School Address:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{visit?.visit.address}</p>
      </div>
      <div className="flex flex-row">
        <h2>Comment:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{visit?.visit.comment}</p>
      </div>
      <div className="flex flex-row">
        <h2>Visit Date:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`}</p>
      </div>
    </div>
  )
  return (
    <div>{viewContent}</div>
  )
}

export default VisitView