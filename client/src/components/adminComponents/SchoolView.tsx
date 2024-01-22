import { useEffect, useState } from "react";
import { afiliate, school } from "../../store/slices/types";
import School from "@mui/icons-material/School";
import { useUpdateSchoolMutation } from "../../store/slices/api/apiEndpoints";
import { useGetSchoolsQuery } from "../../store/slices/api/apiEndpoints";
import { useParams } from "react-router-dom";

type props = {
  item: school;
  userType: 'user' | 'school' | object;
}

function SchoolView() {
  const params = useParams();
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false })
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
  const [updateSchool, {isLoading, isError, Error}] = useUpdateSchoolMutation()

  useEffect(() => {
    setCurrentTerm(item.currentTerm)
  }, [sLoading])
  // const changeObj = {
  //   Address: "address",
  //   Studetns: "students"
  // }
  const paymentL = sLoading?0: item.trained ? item.payment.length : 0
  const payList = []

  if (!sLoading) {

    if (paymentL > 0) {
      payList.push(
        (<div className="flex flex-row items-center align-middle">
          <h2>First Term:</h2>
          <p className="ml-2 border-gray-100 rounded-md w-full">{item.payment[0]? "Payed":"Yet To Pay"}</p>
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
        ))}
      }
    }
  }
  const viewContent = sLoading? (<div>Loading...</div>):(
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
            <p className="ml-2 border-gray-100 rounded-md w-full">{item.onboardDate}</p>
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
                  <p className="ml-2 border-gray-100 rounded-md w-full">{item.trainDate}</p>
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
      const data = await updateSchool({ ...changeObj, id: item._id });
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


  const changeView = isLoading ? (<div>Updating...</div>) : isError ? <div>{Error}</div>: (
    <div className="flex flex-col p-2 ">
      <div className="flex flex-row items-center align-middle content-center gap-1">
        <select value={changeParam} onChange={(e) => setChangeParam(e.target.value)}>
          <option value="---Choose---">--Choose---</option>
          <option value="students">Students</option>
          <option value="address">Address</option>
          <option value="affiliatePercentage">Affiliate Perc</option>
          {!item.onboarded &&
            <>
              <option value="onboarded">OnBoarded</option>
              <option value="onboardDate">On-Boarded On:</option>
            </>
          }
          {!item.trained &&
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
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className="pl-[280px] flex items-center content-center fixed top-0 left-0 right-0 bottom-0 bgc-[#3f33]"
    >
      <div className="bg-gray-100 p-5 rounded-lg relative w-[90%] xl:ml-[10%] xl:w-[60%]">
        <div className="flex text-orange-400 p-2 gap-2 rounded-lg bg-slate-300 pl-[10%]">
          <School />
          <h2>{item.name}</h2>
        </div>
        {update ?changeView:viewContent}
        <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" >
          X
        </button>
      </div>
    </div>
  );
}

export default SchoolView