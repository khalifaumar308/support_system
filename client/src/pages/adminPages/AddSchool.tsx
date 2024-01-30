import { FormEvent, useState, useEffect } from "react"
import Modal from "../../components/Modal"
import { useCreateSchoolMutation } from "../../store/slices/api/apiEndpoints";
import { school } from "../../store/slices/types";
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";

const AddSchool = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [onboarded, SetOnBoarded] = useState<boolean>(false);
  const [trained, SetTrained] = useState<boolean>(false);
  const [createSchool, { isLoading, isError, error, isSuccess }] = useCreateSchoolMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState(0);
  const [onboardDate, setOnboardDate] = useState('');
  const [trainDate, setTrainDate] = useState('');
  const [spackage, setPackage] = useState(0);
  const [errorMsg, setError] = useState<string>('');
  const [term, setTerm] = useState<string>('---Choose---');
  const [fterm, setFterm] = useState<boolean>(false);
  const [sterm, setSterm] = useState<boolean>(false);
  const [lterm, setLterm] = useState<boolean>(false);
  const [affiliatePercentage, setAffiliatePercentage] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      if (error && 'status' in error) {
        const status = error.status
        if (status === 400) {
          setError("All fields are required");
        } else if (status === 409) {
          setError("School Exists");
        } else {
          setError("Login Failed");
        }
      }
    }
    if (isSuccess) {
      addNotification({
        title: 'School Created',
        subtitle: 'New School Created Successfully',
        message: `New School Registered`,
        theme: 'darkblue',
        native: true,// when using native, your OS will handle theming.
      })
    }
  }, [isError, error, isSuccess])

  const paymentDivs = (
    <div className="flex text-xs">
      <h3 className="mr-2">Payment: </h3>
      <label className="flex flex-row">First Term?
        <input name="onboarded" type="checkbox" checked={fterm} onChange={() => setFterm(!fterm)}
          className="active:border-gray-300 mb-2 mt-1 border-2 p-2 border-gray-100 rounded-md w-10" />
      </label>
      {(term === 'Second Term' || term === 'Third Term') && (
        <label className="flex flex-row">Second Term?
          <input name="onboarded" type="checkbox" checked={sterm} onChange={() => setSterm(!sterm)}
            className="active:border-gray-300 mb-2 mt-1 border-2 p-2 border-gray-100 rounded-md w-10" />
        </label>)}
      {(term === 'Third Term') && (
        <label className="flex flex-row">Third Term?
          <input name="onboarded" type="checkbox" checked={lterm} onChange={() => setLterm(!lterm)}
            className="active:border-gray-300 mb-2 mt-1 border-2 p-2 border-gray-100 rounded-md w-10" />
        </label>)}
    </div>
  )

  const register = async (e: FormEvent) => {
    e.preventDefault()

    let payment:boolean[] = []
    if (trained) {
      if (term !== '---Choose---') {
        if (term === 'Second Term') {
          payment = [fterm, sterm]
        } else if (term === 'Third Term') {
          payment = [fterm, sterm, lterm]
        } else {
          payment = [fterm]
        }
      }
    }
    const data: school = {
      name, email, address, students,
      onboarded,
      trained,
      onboardDate:new Date(onboardDate),
      trainDate: new Date(trainDate),
      payment,
      package:spackage,
      currentTerm: term,
      affiliatePercentage
    }
    try {
      await createSchool(data); 
      setTimeout(()=>(navigate('/user/schools/all')),3000)
    } catch (err) {
      console.log(err)
    }
  }

  return open?(
    <Modal onClose={() => setOpen(false)}>
      {isLoading ? (<div>Creating...</div>) :(
      <form className="flex flex-col" onSubmit={register}>
        <label className="flex flex-row items-center ">School Name
          <input value={name} onChange={(e)=>setName(e.target.value)} name="name" placeholder="name"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">School Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="mail@mail.com"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">School Address
          <input value={address} onChange={(e) => setAddress(e.target.value)} name="address" placeholder="Address" type="address"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Number of Students
          <input value={students} onChange={(e) => setStudents(Number(e.target.value))} name="students" type="number" placeholder="0"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Package(Amount per student)
          <input value={spackage} onChange={(e) => setPackage(Number(e.target.value))} name="package" type="number" min={100} placeholder="0"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Affiliate Percentage
          <input name="perc" value={affiliatePercentage} onChange={(e)=>setAffiliatePercentage(Number(e.target.value))} type="number" min={0} placeholder="0"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Current Term
          <select value={term} onChange={(e)=>setTerm(e.target.value)} className=" p-2 mb-2 ml-2 border-2 bg-white">
            <option>---Choose---</option>
            <option>First Term</option>
            <option>Second Term</option>
            <option>Third Term</option>
          </select>
        </label>
        <div className="flex">
          <label className="flex flex-row">Onboarded?
            <input name="onboarded" type="checkbox" checked={onboarded} onChange={()=>SetOnBoarded(!onboarded)}
              className="active:border-gray-300 mb-2 mt-1 ml-2 border-2 p-2 border-gray-100 rounded-md w-10" />
          </label>
          <label className="flex flex-row">Trained?
            <input name="trained" type="checkbox" checked={trained} onChange={() => SetTrained(!trained)}
              className="active:border-gray-300 mb-2 mt-1 ml-2 border-2 p-2 border-gray-100 rounded-md w-10" />
          </label>
        </div>
        {onboarded && (
          <label className="flex flex-col mt-2">Onboarding Date
            <input value={onboardDate} onChange={(e)=>setOnboardDate(e.target.value)} name="onboardingDate" type="date" placeholder="0"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
        )}
        {trained && (
          <div>
            <div className="flex flex-col">
              <label className="flex flex-col mt-2">Training Date
                <input value={trainDate} onChange={(e) => setTrainDate(e.target.value)} name="trainingDate" type="date" placeholder="0"
                  className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
              </label>
              <label className="flex flex-col">Trained By:
                <input name="trainedBy" type="text" placeholder="Name"
                  className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
              </label>
              {term !='---Choose---'&&paymentDivs}
            </div>
          </div>
        )}
        <div className="bg-green-900 text-white">{ errorMsg }</div>
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2" type="submit">Save</button>
      </form>)
      }
    </Modal>
  ): <></>
}

export default AddSchool

// students ?: number;
// onboarded ?: boolean;
// trained ?: boolean;
// onboardDate ?: Date;
// trainDate ?: Date;
// address ?: string;
// package ?: number;
// payment