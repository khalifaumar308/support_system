import { FormEvent, useState, useEffect } from "react"
import Modal from "../../components/Modal";
import { useCreateVisitMutation } from "../../store/slices/api/apiEndpoints";
import { visits } from "../../store/slices/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/api/authSlice";

const AddSchool = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user.id;
  const [open, setOpen] = useState<boolean>(true);
  const [createVisit, { isLoading, isError, error }] = useCreateVisitMutation();
  const [errorMsg, setError] = useState<string>('');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isError) {
      if (error && 'status' in error) {
        const status = error.status
        if (status === 400) {
          setError("All fields are required");
        } else if (status === 409) {
          setError("User Exists");
        } else {
          setError("Registeration Failed");
        }
      }
    }
  }, [error, isError])

  const register = async (e: FormEvent) => {
    e.preventDefault()

    const data:visits = {
      schoolName: name,
      address,
      comment,
      userId: userId || '',
    }
    try {
      await createVisit(data)
      setError('School Created success')
      setTimeout(() => (navigate('/affiliate/visits/all')), 2000)
    } catch (err) {
      console.log(err)
    }

  }

  return open ? (
    <Modal onClose={() => setOpen(false)}>
      {isLoading ? (<div>Saving...</div>) :
      <form className="flex flex-col" onSubmit={register}>
        <label className="flex flex-row items-center ">School Name
          <input value={name} onChange={(e)=>setName(e.target.name)} name="name" placeholder="name"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">School Address
            <input value={address} onChange={(e) => setAddress(e.target.name)} name="address" placeholder="Address" type="address"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <label className="flex flex-row items-center align-middle">Comment
          <textarea value={comment} onChange={(e) => setComment(e.target.name)} name="comment" placeholder="Comment"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <div className="bg-green-900 text-white">{errorMsg}</div>
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2" type="submit">Save</button>
      </form>
      }
    </Modal>
  ) : <></>
}

export default AddSchool