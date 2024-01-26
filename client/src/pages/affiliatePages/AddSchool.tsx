import { FormEvent, useState, useCallback, useContext } from "react"
import Modal from "../../components/Modal"
import { useCreateAffiliateSchoolMutation } from "../../store/slices/api/apiEndpoints";
import { school } from "../../store/slices/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
import { SocketContext } from "../../context/socket";
import addNotification from "react-push-notification";

const AddSchool = () => {
  const socket = useContext(SocketContext);
  const user = useAppSelector(selectCurrentUser);
  const userId = user.id
  const [open, setOpen] = useState<boolean>(true);
  const [createAffiliateSchool, { isLoading, isError, Error }] = useCreateAffiliateSchoolMutation();
  const [error, setError] = useState<string>('');
  const [term, setTerm] = useState<string>('---Choose---');
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false
  });
  const [comment, setComment] = useState('');
  
  const sendMessage = useCallback((content:string) => {
    socket.emit('sendMessage', {
      sendId: user.id,
      recieverId: "65a94085d9225e23a40f683b",
      title: "School Registered",
      senderName: user.name,
      content: content
    })
  },[socket, user])

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
      addNotification({
        title: 'Success',
        subtitle: 'School Creation',
        message: `${data.name} Created successfully`,
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
      });
      setError('School Created success')
      const dataSent = Object.values(schoolData).find(val => val === false);
      const content = JSON.stringify([
        <div>
          <h2>School Name: {e.target.name.value}</h2>
          <p>Required data sent: {(dataSent === false) ? 'NO' : 'Yes'}</p>
          <p>Affiliate Comments: {comment}</p>
        </div>
      ])
      sendMessage(content)
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
        <div className="flex flex-col align-middle">
          <p className="text-red-400">Please confirm that the following data has been captured, verified and sent:</p>
          <label className="ml-2 flex mr-1 text-xs text-blue-700">
            School Name, Address and Admin Phone Number, Email: 
            <input className="ml-2" type="checkbox" checked={schoolData[0]} onChange={()=>setSchoolData({...schoolData, 0:!schoolData[0]})}/>
          </label>
          <label className="ml-2 flex mr-1 text-xs text-blue-700">
            Lists of Students per class:
            <input className="ml-2" type="checkbox" checked={schoolData[1]} onChange={()=>setSchoolData({...schoolData, 1:!schoolData[1]})} />
          </label>
          <label className="ml-2 flex mr-1 text-xs text-blue-700">
            Lists of Students per class:
            <input className="ml-2" type="checkbox" checked={schoolData[2]} onChange={()=>setSchoolData({...schoolData, 2:!schoolData[2]})} />
          </label>
          <label className="ml-2 flex mr-1 text-xs text-blue-700">
            Lists of Instructors(Teachers):
            <input className="ml-2" type="checkbox" checked={schoolData[3]} onChange={() => setSchoolData({ ...schoolData, 3: !schoolData[3] })} />
          </label>
          <label className="ml-2 flex mr-1 text-xs text-blue-700">
            Lists of Subjects per class:
            <input className="ml-2" type="checkbox" checked={schoolData[4]} onChange={() => setSchoolData({ ...schoolData, 4: !schoolData[4] })} />
          </label>
        </div>
        <label className="flex flex-col items-start mt-2 align-middle">Comments
          <textarea value={comment} onChange={(e)=>setComment(e.target.value)} name="comment" placeholder="Comments"
            className="active:border-gray-300 mb-2 ml-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
        </label>
        <div className="bg-green-900 text-white">{error}</div>
        <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2" type="submit">Save</button>
      </form>
    </Modal>
  ) : <></>
}

export default AddSchool