import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useGetSchoolsQuery } from "../store/slices/api/apiEndpoints";
import { afiliate, school } from '../store/slices/types';


const Topbar = () => {
  const { data: users, isLoading , isError} = useGetUsersQuery({id:false})
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({id:false})
  const loading = isLoading || sLoading
  const navigate = useNavigate()

  const formatResult = (item:afiliate|school) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item._id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
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
    // <AppBar
    //   sx={{
    //       width: {xs:`calc(100% - ${sizeConfigs.sidebar.width})`},
    //       ml: sizeConfigs.sidebar.width,
    //       mt: 1,
    //       mr: 1,
    //       boxShadow: "unset",
    //       backgroundColor: colorConfigs.topbar.bg,
    //       color: colorConfigs.topbar.color
    //   }}
    // >
    //     <ReactSearchAutocomplete
    //       items={items}
    //       onSearch={handleOnSearch}
    //       onHover={handleOnHover}
    //       onSelect={handleOnSelect}
    //       onFocus={handleOnFocus}
    //       autoFocus
    //       formatResult={formatResult}
    //       fuseOptions={{ keys: ['name', 'address'] }}
    //     />
        // </AppBar>)
        <div className="w-[100%] sm:w-[320px]">
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
        </div>
    ))
      
};

export default Topbar;