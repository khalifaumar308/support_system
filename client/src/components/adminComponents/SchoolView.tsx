import { useEffect, useState } from "react";
import School from "@mui/icons-material/School";
import { useUpdateSchoolMutation } from "../../store/slices/api/apiEndpoints";
import { useGetSchoolsQuery } from "../../store/slices/api/apiEndpoints";
import { useParams } from "react-router-dom";

// type props = {
//   item: school;
//   userType: 'user' | 'school' | object;
// }

function SchoolView() {
  const params = useParams();
  const { data: schools, isLoading: sLoading , error} = useGetSchoolsQuery({ id: false })
  const item = schools?.schools.filter(school=>school._id === params.id)[0]

  const [update, setUpdate] = useState(false)
  const [changeParam, setChangeParam] = useState<string>('---Choose---');
  const [changeValue, setChangeValue] = useState<string>('');
  const [boolVals, setBoolVals] = useState<boolean>(false);
  const [currentTerm, setCurrentTerm] = useState<string>('');
  const [fterm, setFterm] = useState<boolean>(false);
  const [sterm, setSterm] = useState<boolean>(false);
  const [lterm, setLterm] = useState<boolean>(false);
  const [changeObj, setChangeObj] = useState<object>({});
  const [updateSchool, {isLoading, isError}] = useUpdateSchoolMutation()

  useEffect(() => {
    if (item && 'currentTerm' in item) {
      setCurrentTerm(item.currentTerm)
    }
  }, [sLoading, item])
  // const changeObj = {
  //   Address: "address",
  //   Studetns: "students"
  // }
  const paymentL = sLoading?0: item&&item.trained ? item.payment?.length : 0
  const payList = []

  if (!sLoading) {
    if (paymentL) {
      if (paymentL > 0) {
        payList.push(
          (<div className="flex flex-row p-2 bg-[#b8edd9] mb-2 text-orange-400">
            <h2 className="w-[50%]">First Term:</h2>
            <p>{item&&item.payment&&item.payment[0]? "Payed":"Yet To Pay"}</p>
          </div>)
        )
        if (paymentL > 1) {
          payList.push((
            <div className="flex flex-row p-2 bg-[#b8edd9] mb-2 text-orange-400">
              <h2 className="w-[20%]">Second Term:</h2>
              <p>{item && item.payment && item.payment[1] ? "Payed" : "Yet To Pay"}</p>
            </div>
          ))
          if (paymentL > 2) {
            payList.push((
              <div className="flex flex-row p-2 bg-[#b8edd9] mb-2 text-orange-400">
              <h2 className="w-[20%]">Third Term:</h2>
                <p>{item && item.payment && item.payment[2] ? "Payed" : "Yet To Pay"}</p>
            </div>
          ))}
        }
      }
    }
  }
  const viewContent = sLoading? (<div>Loading...</div>):(
    <div className="flex w-full flex-col items-center align-middle p-2 mt-2 sm:text-2xl">
      <div className="flex flex-row p-2 bg-[#b8edd9] w-[70%] mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400">
        <h2 className="w-[50%]">Email:</h2>
        <p>{item&&item.email}</p>
      </div>
      <div className="flex flex-row p-2 bg-[#b8edd9] w-[70%] mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400">
        <h2 className="w-[50%]">Address:</h2>
        <p>{item&&item.address}</p>
      </div>

      <div className="flex flex-row p-2 bg-[#b8edd9] w-[70%] mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400">
        <h2 className="w-[50%]">Students:</h2>
        <p>{item&&item.students}</p>
      </div>
      <div className="flex flex-row p-2 bg-[#b8edd9] w-[70%] mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400">
        <h2 className="w-[50%]">Onboarded:</h2>
        <p>{item&&item.onboarded ? "Yes" : "No"}</p>
      </div>
      {item&&item.onboarded && (
        <>
          <label className="flex flex-row p-2 bg-[#b8edd9] w-[70%] mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400">
            <h2 className="w-[50%]">Onboarded On:</h2>
            <p className="border-gray-100 rounded-md">{item&&`${item.onboardDate}`}</p>
          </label>
          <div className="flex flex-row p-2 bg-[#b8edd9] w-[70%] mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400">
            <h2 className="w-[50%]">Package:</h2>
            <p className="border-gray-100 rounded-md">&#8358;{item&&item.package}</p>
          </div>
          <div className="flex flex-row p-2 bg-[#b8edd9] w-[70%] mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400">
            <h2 className="w-[50%]">Trained:</h2>
            <p className="border-gray-100 rounded-md">{item&&item.trained ? "Yes" : "No"}</p>
          </div>
          {item&&item.trained &&
            (
              <div className="flex flex-col w-[70%]">
                <div className="flex flex-row p-2 bg-[#b8edd9] w-full mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400 items-center align-middle">
                  <h2 className="w-[50%]">Trained On:</h2>
                  <p className="border-gray-100 rounded-md">{item&&`${item.trainDate}`}</p>
                </div>
                <div className="flex flex-row p-2 bg-[#b8edd9] w-full mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400 items-center align-middle">
                  <h2 className="w-[50%]">Current Term:</h2>
                  <p className="border-gray-100 rounded-md">{item&&item.currentTerm}</p>
                </div>
                <h2 className="w-[50%]">Payment</h2>
                {payList}
                <div className="flex flex-row p-2 bg-[#b8edd9] w-full mb-2 rounded-sm shadow-sm shadow-slate-400 text-orange-400 items-center align-middle">
                  <h2 className="w-[50%]">Total Payable:</h2>
                  <p className="border-gray-100 rounded-md">&#8358;{item&&item.totalPayable}</p>
                </div>
              </div>
            )}
        </>
      )}
      <div className="gap-4 flex pl-[40%]">
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2">Close</button>
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2" onClick={()=>setUpdate(true)}>Update</button>
      </div>
    </div>
  )

  const save = () => {
    if ("onboardedtrained".includes(changeParam)) {
      setChangeObj({ ...changeObj, [changeParam]: boolVals })
      setBoolVals(false)
    } else if (changeParam === "payment") {
      if (currentTerm === "First Term") {
        setChangeObj({ ...changeObj, payment: [fterm] })
      } else if (currentTerm === "Second Term") {
        setChangeObj({ ...changeObj, payment: [fterm, sterm] })
      } else if (currentTerm === "Third Term") {
        setChangeObj({ ...changeObj, payment: [fterm, sterm, lterm] })
      } 
    } else {
      setChangeObj({ ...changeObj, [changeParam]: changeValue })
      setChangeParam("---Choose---");
      setChangeValue("");
    }
  }

  const updateRecord =async () => {
    try {
      const data = await updateSchool({ ...changeObj, id: item?item._id?item._id:'':'' });
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const paymentDivs = (
    <div className="flex text-xs">
      {/* <h3 className="mr-2">Payment: </h3> */}
      <label className="flex flex-row">First Term?
        <input name="onboarded" type="checkbox" checked={fterm} onChange={() => setFterm(!fterm)}
          className="active:border-gray-300 mb-2 mt-1 border-2 p-2 border-gray-100 rounded-md w-10" />
      </label>
      {(currentTerm === 'Second Term' || currentTerm === 'Third Term') && (
        <label className="flex flex-row">Second Term?
          <input name="onboarded" type="checkbox" checked={sterm} onChange={() => setSterm(!sterm)}
            className="active:border-gray-300 mb-2 mt-1 border-2 p-2 border-gray-100 rounded-md w-10" />
        </label>)}
      {(currentTerm === 'Third Term') && (
        <label className="flex flex-row">Third Term?
          <input name="onboarded" type="checkbox" checked={lterm} onChange={() => setLterm(!lterm)}
            className="active:border-gray-300 mb-2 mt-1 border-2 p-2 border-gray-100 rounded-md w-10" />
        </label>)}
    </div>
  )

  let changeItem

  if ((changeParam === 'students') || (changeParam === "package") || (changeParam === "affiliatePercentage")) {
    changeItem = (
      <input type="number" value={changeValue} onChange={(e) => setChangeValue(e.target.value)} className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
    )
  } else if (changeParam === "address") {
    changeItem = <input name="address" placeholder="Address" type="address" value={changeValue} onChange={(e) => setChangeValue(e.target.value)}
      className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
  } else if (changeParam.includes("Date")) {
    changeItem = <input name="date" type="date" value={changeValue} onChange={(e) => setChangeValue(e.target.value)}
      className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
  } else if (changeParam === "currentTerm") {
    changeItem = 
      <select onChange={(e) => {
        setChangeValue(e.target.value)
        setCurrentTerm(e.target.value)
      }}>
      <option value="First Term">First Term</option>
      <option value="Second Term">Second Term</option>
      <option value="Third Term">Third Term</option>
    </select>
  } else if ("onboardedtrained".includes(changeParam)) {
    changeItem = (
      <input name="trained" type="checkbox" checked={boolVals} onChange={() => setBoolVals(!boolVals)}
        className="active:border-gray-300 mb-2 mt-1 ml-2 border-2 p-2 border-gray-100 rounded-md w-10" />
    )
  } else if (changeParam === "payment") {
    changeItem = paymentDivs
  }


  const changeView = isLoading ? (<div>Updating...</div>) : isError ? <div>{`${error}`}</div>: (
    <div className="flex flex-col p-2 ">
      <div className="flex flex-row items-center align-middle content-center gap-1">
        <select value={changeParam} onChange={(e) => setChangeParam(e.target.value)}>
          <option value="---Choose---">--Choose---</option>
          <option value="students">Students</option>
          <option value="address">Address</option>
          <option value="affiliatePercentage">Affiliate Perc</option>
          
          {item&&!item.onboarded &&
            <>
              <option value="onboarded">OnBoarded</option>
              <option value="onboardDate">On-Boarded On:</option>
            </>
          }
          {item&&!item.trained &&
            <>
              <option value="trained">Trained</option>
              <option value="trainDate">Trained On:</option>
            </>
          }
          <option value="package">Package</option>
          <option value="currentTerm">currentTerm</option>
          <option value="payment">Payment</option>
        </select>
        {changeItem}
        {changeParam != '---Choose---' &&
          <button onClick={save} className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md">Save</button>
        }
      </div>
      <button onClick={updateRecord} className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md">Update</button>
    </div>
  )
              
  return sLoading? <div>Loading...</div>: (
    <div className="sm:pl-[280px] pl-4 flex items-center content-center fixed top-0 left-0 right-0 bottom-0 bg-white"
    >
      <div className=" p-5 rounded-lg mt-16 sm:mt-0 bg-slate-200 flex flex-col relative w-[90%] xl:ml-[10%] xl:w-[70%]">
        <div className="flex text-orange-400 p-2 gap-2 text-2xl rounded-lg bg-slate-300 pl-[10%]">
          <School />
          <h2>{item&&item.name}</h2>
        </div>
        {update ?changeView:viewContent}
        {/* <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" >
          X
        </button> */}
      </div>
    </div>
  );
}

export default SchoolView

// NAG2636
// Test@1234