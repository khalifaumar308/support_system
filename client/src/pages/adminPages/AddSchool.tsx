import { FormEvent, useState } from "react"
import Modal from "../../components/Modal"
import { useCreateSchoolMutation } from "../../store/slices/api/apiEndpoints";
import { school } from "../../store/slices/types";
import { useNavigate } from "react-router-dom";

const AddSchool = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [onboarded, SetOnBoarded] = useState<boolean>(false);
  const [trained, SetTrained] = useState<boolean>(false);
  const [createSchool, { isLoading, isError, Error }] = useCreateSchoolMutation()
  const [error, setError] = useState<string>('');
  const [term, setTerm] = useState<string>('---Choose---');
  const [fterm, setFterm] = useState<boolean>(false);
  const [sterm, setSterm] = useState<boolean>(false);
  const [lterm, setLterm] = useState<boolean>(false);
  const [affiliatePercentage, setAffiliatePercentage] = useState<number>(0);
  const navigate = useNavigate()

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
      name: e.target.name.value,
      email: e.target.email.value,
      address: e.target.address.value,
      students: e.target.students.value,
      onboarded,
      trained,
      onboardDate: onboarded ? e.target.onboardingDate.value : '',
      trainDate: trained ? e.target.trainingDate.value : '',
      payment,
      package: e.target.package.value,
      currentTerm: term,
      affiliatePercentage
    }
    const returned = await createSchool(data)
    
    if (returned.error) {
      console.log( returned.error)
      setError('School Creation Failed')
    } else {
      setError('School Created success')
      setTimeout(()=>(navigate('/user/schools/all')),3000)
    }
  }

  return open?(
    <Modal onClose={() => setOpen(false)}>
      <form className="flex flex-col" onSubmit={register}>
        <label className="flex flex-row items-center ">School Name
          <input name="name" placeholder="name"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">School Email
          <input name="email" type="email" placeholder="mail@mail.com"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">School Address
          <input name="address" placeholder="Address" type="address"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Number of Students
          <input name="students" type="number" placeholder="0"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Package(Amount per student)
          <input name="package" type="number" min={100} placeholder="0"
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
            <input name="onboardingDate" type="date" placeholder="0"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
        )}
        {trained && (
          <div>
            <div className="flex flex-col">
              <label className="flex flex-col mt-2">Training Date
                <input name="trainingDate" type="date" placeholder="0"
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
        <div className="bg-green-900 text-white">{ error }</div>
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2" type="submit">Save</button>
      </form>
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