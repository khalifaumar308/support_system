import { useGetSchoolsQuery } from "../../store/slices/api/apiEndpoints";
import { useParams } from "react-router-dom";
import School from "@mui/icons-material/School";


const SchoolView = () => {
  const params = useParams();
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false })
  const item = schools?.schools.filter(school => school._id === params.id)[0]
  console.log(params.percentage)

  const paymentL = sLoading ? 0 : item?.trained ? item?.payment?.length : 0
  const payList = []

  if (!sLoading) {

    if (paymentL && paymentL > 0 && item && item.payment) {
      payList.push(
        (<div className="flex flex-row items-center align-middle">
          <h2>First Term:</h2>
          <p className="ml-2 border-gray-100 rounded-md w-full">{item.payment[0] ? "Payed" : "Yet To Pay"}</p>
        </div>)
      )
      if (paymentL > 1) {
        payList.push((
          <div className="flex flex-row items-center align-middle">
            <h2>Second Term:</h2>
            <p className="ml-2 border-gray-100 rounded-md w-full">{item.payment[1] ? "Payed" : "Yet To Pay"}</p>
          </div>
        ))
        if (paymentL > 2) {
          payList.push((
            <div className="flex flex-row items-center align-middle">
              <h2>Third Term:</h2>
              <p className="ml-2 border-gray-100 rounded-md w-full">{item.payment[2] ? "Payed" : "Yet To Pay"}</p>
            </div>
          ))
        }
      }
    }
  }

  const viewContent = sLoading ? (<div>Loading...</div>) : item ? (
    <div className="flex w-full flex-col bg-slate-200 p-2 mt-2">
      <div className="flex flex-row">
        <h2>Email:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{item.email}</p>
      </div>
      <div className="flex flex-row">
        <h2>Address:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{item.address}</p>
      </div>

      <div className="flex flex-row">
        <h2>Students:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{item.students}</p>
      </div>
      <div className="flex flex-row">
        <h2>Onboarded:</h2>
        <p className="ml-2 border-gray-100 rounded-md w-full">{item.onboarded ? "Yes" : "No"}</p>
      </div>
      {item.onboarded && (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h2>Onboarded On::</h2>
            <p className="ml-2 border-gray-100 rounded-md w-full">{item&&`${item.onboardDate}`}</p>
          </div>
          <div className="flex flex-row">
            <h2>Package:</h2>
            <p className="ml-2 border-gray-100 rounded-md w-full">&#8358;{item.package}</p>
          </div>
          <div className="flex flex-row">
            <h2>Trained:</h2>
            <p className="ml-2 border-gray-100 rounded-md w-full">{item.trained ? "Yes" : "No"}</p>
          </div>
          {item.trained &&
            (
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-middle">
                  <h2>Trained On:</h2>
                  <p className="ml-2 border-gray-100 rounded-md w-full">{`${item.trainDate}`}</p>
                </div>
                <div className="flex flex-row items-center align-middle">
                  <h2>Current Term:</h2>
                  <p className="ml-2 border-gray-100 rounded-md w-full">{item.currentTerm}</p>
                </div>
                <h2>Payment</h2>
                {payList}
                <div className="flex flex-row items-center align-middle">
                  <h2>Total Payable:</h2>
                  <p className="ml-2 border-gray-100 rounded-md w-full">&#8358;{item.totalPayable}</p>
                </div>
              </div>
            )}
        </div>
      )}
      <div className="gap-4 flex pl-[40%]">
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2">Close</button>
      </div>
    </div>
  ) : <div>Loading....</div>;
  return sLoading ? <div>Loading...</div> : (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="pl-[280px] flex items-center content-center fixed top-0 left-0 right-0 bottom-0 bgc-[#3f33]"
    >
      <div className="bg-gray-100 p-5 rounded-lg relative w-[90%] xl:ml-[10%] xl:w-[60%]">
        <div className="flex text-orange-400 p-2 gap-2 rounded-lg bg-slate-300 pl-[10%]">
          <School />
          <h2>{item&&item.name}</h2>
        </div>
        { viewContent}
        <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" >
          X
        </button>
      </div>
    </div>
  );
}

export default SchoolView