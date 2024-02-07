import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
import { useGetMessagesQuery, useDeleteMessageMutation, useUpdateMessageMutation } from "../../store/slices/api/apiEndpoints";
// import { useUpdateMessageMutation, useDeleteMessageMutation } from "../../store/slices/api/apiEndpoints";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useState } from "react";
import DeleteForever from "@mui/icons-material/DeleteForever";
// import { message } from "../../store/slices/types";

export type message = {
  recieverId: string;
  senderId: string;
  senderName: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  title: string;
  read: boolean;
  _id?: string
}

const Messages = () => {
  const user = useSelector(selectCurrentUser);
  const { data: messages, isLoading, isError, refetch } = useGetMessagesQuery(user.id || '')
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  // const [updateMessage, { isLoading: updateLoading }] = useUpdateMessageMutation();
  
  const userMessages = isLoading || isError ? [] : messages?.messages;
  const dMessage = {
    recieverId: '',
    senderId: '',
    senderName: '',
    createdAt: '',
    updatedAt: '',
    content: '',
    title: '',
    read: false,
    _id: ''
  };
  const [currentMessageData, setCurrentMessageData] = useState(isLoading ? dMessage: userMessages?userMessages[0]:dMessage);
  const deleteSingleMessage = async () => {
    try {
      await deleteMessage(currentMessageData._id || '');
      setCurrentMessageData(dMessage)
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  const messageDivs = userMessages?.map((message, id) => {
    const dateSent = new Date(message.createdAt)
    return (
      <div className="flex bg-white rounded-md p-1">
        <div id={message._id} onClick={ async() => {
          setCurrentMessageData(message)
          try {
            await updateMessage(message._id || '')
          } catch (error) {
            console.log(error)
          }
        }} key={id}
          className={`${('_id' in currentMessageData)&&currentMessageData._id === message._id && 'bg-slate-400'} flex bg-white sm:p-2 gap-1 shadow-sm shadow-gray-100 cursor-pointer hover:bg-gray-300 rounded-md mb-2`}>
          <SmartToyIcon />
          <p>{message.title}</p>
          <p>{dateSent.toLocaleTimeString()}</p>
        </div>
        <button id={message._id} onClick={()=>deleteSingleMessage()} className="text-red-600 ">
          <DeleteForever />
        </button>
      </div>
    )
  });
  // console.log(JSON.parse(currentMessageData.content)['0'])
  const currentMessage = isLoading ? <div>Loading...</div> : (
    <div className="p-2 mt-8">
      <h2>{currentMessageData?.title}</h2>
      <div>{currentMessageData.content}</div>
    </div>
  )
  return (
    <div className="flex flex-row h-full">
      <div className="w-[300px] flex flex-col p-2 items-center content-center h-full bg-slate-300 border-r-2 border-gray-200 shadow-md shadow-black">
        <h2 className="mb-4">Messages</h2>
        {messageDivs}
      </div>
      <div className="flex h-full w-full bg-slate-200 ">
        {currentMessage}
      </div>
    </div>
  )
}

export default Messages