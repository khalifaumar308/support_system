import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useGetSchoolsQuery } from "../store/slices/api/apiEndpoints";


const Topbar = () => {
  const { data: users, isLoading , isError} = useGetUsersQuery({id:false})
  const { data: schools, isLoading: sLoading, isError:sError } = useGetSchoolsQuery({id:false})
  const loading = isLoading || sLoading
  const navigate = useNavigate()

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }
  const items = loading?[]:isError?[]:[...users.affiliates, ...schools.schools]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    // console.log(item)
    if (item.schoolsReferred) {
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