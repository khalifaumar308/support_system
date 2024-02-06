import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
import { useGetMessagesQuery } from "../../store/slices/api/apiEndpoints";
// import { useUpdateMessageMutation, useDeleteMessageMutation } from "../../store/slices/api/apiEndpoints";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useState } from "react";

const Messages = () => {
  const user = useSelector(selectCurrentUser);
  const { data: messages, isLoading, isError, } = useGetMessagesQuery(user.id || '')
  // const [deleteMessage, { isLoading: deleteLoading }] = useDeleteMessageMutation();
  // const [updateMessage, { isLoading: updateLoading }] = useUpdateMessageMutation();
  
  const userMessages = isLoading || isError ? [] : messages?.messages;
  const [currentMessageData, setCurrentMessageData] = useState(isLoading ? { title: 'Title', content: "Content" }
    : userMessages ? userMessages[0] : { title: 'Title', content: "Content" })

  const messageDivs = userMessages?.map((message, id) => {
    const dateSent = new Date(message.createdAt)
    return (
      <div id={message._id} onClick={() => setCurrentMessageData(message)} key={id}
        className={`${('_id' in currentMessageData)&&currentMessageData._id === message._id && 'bg-slate-400'} flex bg-white p-2 gap-1 shadow-sm shadow-gray-100 cursor-pointer hover:bg-gray-300 rounded-md mb-2`}>
        <SmartToyIcon />
        <p>{message.title}</p>
        <p>{dateSent.toLocaleTimeString()}</p>
      </div>
    )
  });
  // console.log(JSON.parse(currentMessageData.content)['0'])
  const currentMessage = isLoading ? <div>Loading...</div> : (
    <div className="p-2 mt-8">
      <h2>{currentMessageData.title}</h2>
      <div>{currentMessageData.content}</div>
    </div>
  )
  return (
    <div className="flex flex-row h-full">
      <div className="w-[300px] flex flex-col p-2 items-center content-center h-full bg-slate-300 border-r-2 border-gray-200 shadow-md shadow-black">
        <h2 className="mb-4">Messages</h2>
        {messageDivs}
      </div>
      <div className="flex h-full bg-slate-200 ">
        {currentMessage}
      </div>
    </div>
  )
}

export default Messages