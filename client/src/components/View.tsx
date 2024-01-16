import { useParams } from "react-router-dom"
import { useGetUsersQuery, useGetSchoolsQuery } from "../store/slices/api/apiEndpoints";
import { afiliate, school } from "../store/slices/types";
import { useState } from "react";
import ViewComp from "./ViewComp";

const View = () => {
  const [open, setOpen] = useState(true)
  const params = useParams();
  const { data: users, isLoading } = useGetUsersQuery({ id: params.id })
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: params.id })
  const loading = isLoading || sLoading;
  const item: school | afiliate | object = loading ? {} : users||schools
  const itemType = users ? 'user' : 'school';

  return  <ViewComp item={item} itemType={itemType} />
}

export default View