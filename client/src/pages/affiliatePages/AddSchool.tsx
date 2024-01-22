import { FormEvent, useState } from "react"
import Modal from "../../components/Modal"
import { useCreateAffiliateSchoolMutation } from "../../store/slices/api/apiEndpoints";
import { school } from "../../store/slices/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/api/authSlice";

const AddSchool = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user.id
  const [open, setOpen] = useState<boolean>(true);
  const [createAffiliateSchool, { isLoading, isError, Error }] = useCreateAffiliateSchoolMutation();
  const [error, setError] = useState<string>('');
  const [term, setTerm] = useState<string>('---Choose---');
  const navigate = useNavigate()


  const register = async (e: FormEvent) => {
    e.preventDefault()

    const data: school = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: e.target.address.value,
      students: e.target.students.value,
      currentTerm: term,
    }
    const returned = await createAffiliateSchool({id:userId, schoolData:data})
    if (returned.error) {
      console.log(returned.error)
      setError('School Creation Failed')
    } else {
      setError('School Created success')
      setTimeout(() => (navigate('/affiliate/schools/all')), 3000)
    }
  }

  return open ? (
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
          <input name="students" type="number" min={0} placeholder="0"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Current Term
          <select value={term} onChange={(e) => setTerm(e.target.value)} className=" p-2 mb-2 ml-2 border-2 bg-white">
            <option>---Choose---</option>
            <option>First Term</option>
            <option>Second Term</option>
            <option>Third Term</option>
          </select>
        </label>
        
        <div className="bg-green-900 text-white">{error}</div>
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2" type="submit">Save</button>
      </form>
    </Modal>
  ) : <></>
}

export default AddSchool