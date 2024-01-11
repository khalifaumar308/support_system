import { useState, FormEvent } from "react"
import Modal from "../components/Modal"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const AddUser = () => {
  const [open, setOpen] = useState(true)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('--Choose--')

  const items = [
    {
      id: 0,
      name: 'Cobol ',
      address: 'kano'
    },
    {
      id: 1,
      name: 'JavaScript',
      address: 'jigawa'
    },
    {
      id: 2,
      name: 'Basic',
      address: 'jigawa'

    },
    {
      id: 3,
      name: 'PHP',
      address: 'jigawa'

    },
    {
      id: 4,
      name: 'Java',
      address: 'jigawa'

    }
  ]

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const register = (e:FormEvent) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    open&&(<Modal onClose={()=>setOpen(false)}>
      <div>
        <form className="flex flex-col" onSubmit={register}>
          <label className="flex flex-col">Name
            <input placeholder="name"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
          <label className="flex flex-col">Email
            <input type="email" placeholder="mail@mail.com"
              className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
          </label>
          <label className="flex flex-col">
            Role
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="active:border-gray-300 mb-2 border-2 p-2 bg-white border-gray-100 rounded-md w-[50%]" >
              <option>--Choose---</option>
              <option>Admin</option>
              <option>Staff</option>
              <option>Affiliate</option>
            </select>
          </label>
          {role === 'Affiliate' &&
            (<div>
            <label className="flex flex-col">Phone Number
              <input type="phone" placeholder="+234 000 0000"
                className="active:border-gray-300 mb-2 border-2 p-2 border-gray-100 rounded-md w-[80%]" />
            </label>
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
          <button type="submit">Save</button>
        </form>
      </div>
    </Modal>)
  )
}

export default AddUser