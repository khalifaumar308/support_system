import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useGetSchoolsQuery } from "../store/slices/api/apiEndpoints";
import { afiliate, school } from '../store/slices/types';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const Topbar = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery({ id: false });
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: false });
  const loading = isLoading || sLoading
  const navigate = useNavigate()

  const formatResult = (item:afiliate|school) => {
    return ('schoolsReferred' in item) ? (
      <div onClick={() => navigate(`/user/userview/${item._id}`)} className="bg-[#2d3e57] text-white mb-1 cursor-pointer p-2 flex mr-1 rounded-md shadow-sm shadow-black">
        <AccountCircleSharpIcon />
        <h2 className="ml-1 ">{item.name}</h2>
      </div>
    ) : (
        <div onClick={() => navigate(`/user/schoolview/${item._id}`)} className="bg-[#2d3e57] text-white mb-1 cursor-pointer p-2 flex mr-1 rounded-md shadow-sm shadow-black">
          <SchoolIcon />
          <h2 className="ml-1 ">{item.name}</h2>
        </div>
    )
  }

  const items = loading?[]:isError?[]:users && schools?[...users.affiliates, ...schools.schools]: []

  const handleOnSearch = (string:  string , results:(afiliate|school)[]) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result: afiliate | school) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item:afiliate|school) => {
    // the item selected
    // console.log(item)
    if ('schoolsReferred' in item) {
      navigate(`/user/userview/${item._id}`)
    } else {
      navigate(`/user/schoolview/${item._id}`)
    }
    
  }

  const handleOnFocus = () => {
  }
  return (
    isLoading ? (<div className="ml-[270px]">Loading...</div>) : (
      isError ? (<div className="ml-[270px]">Error</div>):
        <div className="w-[100%] sm:w-[320px]">
            <ReactSearchAutocomplete
              items={items}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
              fuseOptions={{ keys: ['name', 'address', 'location'] }}
            />
        </div>
    ))
      
};

export default Topbar;