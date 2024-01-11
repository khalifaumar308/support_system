import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import { useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import colorConfigs from "../configs/colorConfigs";
import sizeConfigs from "../configs/sizeConfigs";
import { useGetUsersQuery, useGetSchoolsQuery } from "../store/slices/api/apiEndpoints";


const Topbar = () => {
  const { data: users, isLoading } = useGetUsersQuery({id:false})
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({id:false})
  const loading = isLoading || sLoading

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }
  const items = loading?[]:[...users.affiliates, ...schools.schools]

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

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        mt: 1,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
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
    </AppBar>
  );
};

export default Topbar;