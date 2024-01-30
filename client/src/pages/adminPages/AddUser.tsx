import { useState, FormEvent, useEffect } from "react"
import Modal from "../../components/Modal"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useGetSchoolsQuery } from "../../store/slices/api/apiEndpoints"
import SchoolIcon from '@mui/icons-material/School';
import { school } from "../../store/slices/types";
import { useCreateUserMutation } from "../../store/slices/api/apiEndpoints";
import { useNavigate } from "react-router-dom";

// import { Password } from "@mui/icons-material";


const AddUser = () => {
  type schoolReferred = {
    schoolId: string,
    percentage: number
  };
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false })
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const [open, setOpen] = useState(true)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('--Choose--');
  const [referred, setReferred] = useState<schoolReferred[]>([]);
  const [toShow, setToShow] = useState<school[]>([]);
  const [errorMsg, setError] = useState('');
  const [percentages, setPercentages] = useState<{ [key: number]: number; }>({})
  const navigate = useNavigate()
  
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

  const items = sLoading ? [] : schools ? [...schools.schools] : [];

  const formatResult = (item:school) => {
    return (
      <div className="bg-red-100 flex mr-1 rounded-md shadow-sm shadow-slate-200">
        <SchoolIcon />
        <h2 className="ml-1 ">{item.name}</h2>
      </div>
    )
  }

  const handleOnSearch = (string: string, results: school[]) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result:school) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item:school) => {
    // the item selected
    setReferred([...referred, { schoolId:item._id||'123', percentage:10 }])
    setToShow([...toShow, item])
  }

  const handleOnFocus = () => {
  }

  const referredDivs = toShow.map((item, id) => (
    <div key={id} className="flex flex-row align-middle w-full mb-1">
      <div className="bg-red-100 flex mr-1 rounded-md shadow-sm shadow-slate-200">
        <SchoolIcon />
        <h2 className="ml-1 ">{item.name}</h2>
      </div>
      <input className="ml-2 border-black border-2 p-1 " placeholder="percentage" onChange={(e)=>setPercentages({...percentages, [id]:Number(e.target.value)})}/>
    </div>
  ))

  const register = async (e:FormEvent) => {
    e.preventDefault()
    // console.log(toShow, referred)
    const rfr: schoolReferred[] = [];
    referred.forEach(({ schoolId }, id) => {
      // const id_str = id.toString()
      rfr.push({schoolId, percentage:percentages[id]})
    })
    const data = {
      name,
      email,
      role,
      phone,
      password,
      address,
      location,
      schoolsReferred: rfr
    }
    // console.log(rfr)
    try {
      await createUser(data)
    } catch (error) {
      setError('School Created success')
      setTimeout(() => (navigate('/user/users/all')), 3000)
    }
  }
  return (
    open &&
    (<Modal onClose={() => setOpen(false)}>
      
      <div>
        {isLoading ? <div>Saving....</div> :
        <form className="flex flex-col" onSubmit={register}>
          <label className="flex flex-col">Name
            <input value={name} onChange={(e)=>setName(e.target.value)} name="name" placeholder="name"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
          <label className="flex flex-col">Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="mail@mail.com"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
          <label className="flex flex-col">Address
            <input value={address} onChange={(e) => setAddress(e.target.value)} name="address" type="address" placeholder="Address"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
          <label className="flex flex-col">Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="********"
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
                <input value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" type="phone" placeholder="+234 000 0000"
                  className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
              </label>
              <label className="flex flex-col">Location
                <input value={location} onChange={(e) => setLocation(e.target.value)} name="location" placeholder="Location"
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
          <div>{errorMsg}</div>
          <button className="bg-[#1e253a] text-white shadow-md shadow-gray-100 hover:bg-slate-600 p-2 rounded-md mt-2"  type="submit">Save</button>
        </form>
        }
      </div>
    </Modal>)
  )
}

export default AddUser