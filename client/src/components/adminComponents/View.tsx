import { useParams } from "react-router-dom"
import { useGetUsersQuery, useGetSchoolsQuery } from "../../store/slices/api/apiEndpoints";
import { afiliate, school } from "../../store/slices/types";
import { useState } from "react";
import ViewComp from "./SchoolView";
import UserView from "./UserView";

const View = () => {
  const params = useParams();
  console.log(params)
  const { data: users, isLoading } = useGetUsersQuery({ id: params.id })
  const { data: schools, isLoading: sLoading } = useGetSchoolsQuery({ id: params.id })
  const loading = isLoading || sLoading;
  const item: school | afiliate | object = loading ? {} : schools || users;
  const itemType = users ? 'user' : 'school';
  // return itemType === "user" ? <UserView item={item} /> : <ViewComp item={item} itemType={itemType} />
  return <div>Doneeeeeee { JSON.stringify(item)}</div>
}

export default View 