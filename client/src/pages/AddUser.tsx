import { useState, FormEvent } from "react"
import Modal from "../components/Modal"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useGetSchoolsQuery } from "../store/slices/api/apiEndpoints"
import SchoolIcon from '@mui/icons-material/School';
import { school } from "../store/slices/types";
import { useCreateUserMutation } from "../store/slices/api/apiEndpoints";
import { useNavigate } from "react-router-dom";


const AddUser = () => {
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false })
  const [createUser, { isLoading, isError }] = useCreateUserMutation();
  const [open, setOpen] = useState(true)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('--Choose--')
  const [referred, setReferred] = useState<string[]>([]);
  const [toShow, setToShow] = useState<school[]>([]);
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const items =sLoading?[]: [...schools.schools]

  const formatResult = (item) => {
    return (
      <div className="bg-red-100 flex mr-1 rounded-md shadow-sm shadow-slate-200">
        <SchoolIcon />
        <h2 className="ml-1 ">{item.name}</h2>
      </div>
    )
  }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    setReferred([...referred, item._id])
    setToShow([...toShow, item])
  }

  const handleOnFocus = () => {
  }

  const referredDivs = toShow.map((item, id) => (
    <div key={id} className="bg-red-100 flex mr-1 rounded-md shadow-sm shadow-slate-200">
      <SchoolIcon />
      <h2 className="ml-1 ">{item.name}</h2>
    </div>
  ))

  const register = async (e:FormEvent) => {
    e.preventDefault()
    // console.log(toShow, referred)
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value,
      phone: e.target.phone.value,
      schoolsReferred: referred
    }
    const returned = await createUser(data)
    if (returned.error) {
      console.log(returned.error)
      setError('School Creation Failed')
    } else {
      setError('School Created success')
      setTimeout(() => (navigate('/user/users/all')), 3000)
    }
  }
  return (
    open&&(<Modal onClose={()=>setOpen(false)}>
      <div>
        <form className="flex flex-col" onSubmit={register}>
          <label className="flex flex-col">Name
            <input name="name" placeholder="name"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
          <label className="flex flex-col">Email
            <input name="email" type="email" placeholder="mail@mail.com"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
          <label className="flex flex-col">
            Role
            <select name="role" value={role} onChange={(e)=>setRole(e.target.value)} className="active:border-gray-300 mb-2 border-2 p-2 bg-white border-gray-100 rounded-md w-[50%]" >
              <option>--Choose---</option>
              <option>Admin</option>
              <option>Staff</option>
              <option>Affiliate</option>
            </select>
          </label>
          {role === 'Affiliate' &&
            (<div>
            <label className="flex flex-col">Phone Number
              <input name="phone" type="phone" placeholder="+234 000 0000"
                className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
            </label>
            <div>
              <h3>Schools Referred</h3>
              {referredDivs}
            </div>
            <ReactSearchAutocomplete
              items={items}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
              fuseOptions={{ keys: ['name', 'address'] }}
            />
            </div>)}
          <div>{error}</div>
          <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2"  type="submit">Save</button>
        </form>
      </div>
    </Modal>)
  )
}

export default AddUser