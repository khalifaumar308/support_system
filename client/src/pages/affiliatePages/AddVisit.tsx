import { FormEvent, useState } from "react"
import Modal from "../../components/Modal";
import { useCreateVisitMutation } from "../../store/slices/api/apiEndpoints";
import { visits } from "../../store/slices/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/api/authSlice";

const AddSchool = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user.id
  const [open, setOpen] = useState<boolean>(true);
  const [createVisit, { isLoading, isError, Error }] = useCreateVisitMutation();
  const [error, setError] = useState<string>('');
  const [term, setTerm] = useState<string>('---Choose---');
  const navigate = useNavigate()


  const register = async (e: FormEvent) => {
    e.preventDefault()

    const data:visits = {
      schoolName: e.target.name.value,
      address: e.target.address.value,
      comment: e.target.comment.value,
      userId
    }
    const returned = await createVisit(data)
    if (returned.error) {
      console.log(returned.error)
      setError('School Creation Failed')
    } else {
      setError('School Created success')
      setTimeout(() => (navigate('/affiliate/visits/all')), 2000)
    }
  }

  return open ? (
    <Modal onClose={() => setOpen(false)}>
      {isLoading ? (<div>Saving...</div>) :
      <form className="flex flex-col" onSubmit={register}>
        <label className="flex flex-row items-center ">School Name
          <input name="name" placeholder="name"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">School Address
          <input name="address" placeholder="Address" type="address"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Comment
          <textarea name="comment" placeholder="Comment"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <div className="bg-green-900 text-white">{error}</div>
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2" type="submit">Save</button>
      </form>
      }
    </Modal>
  ) : <></>
}

export default AddSchool