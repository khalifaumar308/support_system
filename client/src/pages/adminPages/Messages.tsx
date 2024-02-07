import { useSelector } from "react-redux";
import { useState, useContext, useCallback } from "react";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
import { useGetMessagesQuery, useDeleteMessageMutation, useUpdateMessageMutation, useGetUsersQuery } from "../../store/slices/api/apiEndpoints";
import { SocketContext } from "../../context/socket";
// import { useUpdateMessageMutation, useDeleteMessageMutation } from "../../store/slices/api/apiEndpoints";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DeleteForever from "@mui/icons-material/DeleteForever";
import AddCommentIcon from '@mui/icons-material/AddComment';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { appUser } from "../../store/slices/types";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import addNotification from "react-push-notification";

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
  const { data: messages, isLoading, isError, refetch } = useGetMessagesQuery(user.id || '');
  const { data: users, isLoading: uLoading } = useGetUsersQuery({id:false});
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [reciever, setReciever] = useState({id:'', name:''});
  const socket = useContext(SocketContext);
  // const [updateMessage, { isLoading: updateLoading }] = useUpdateMessageMutation();
  const sendMessage = useCallback((content: string) => {
    socket.emit('sendMessage', {
      sendId: user.id,
      recieverId: reciever.id,
      title: user.name,
      senderName: user.name,
      content: content
    })
  }, [socket, user, reciever]);

  const sendUserMessage = () => {
    sendMessage(message);
    addNotification({
      title: 'Message Sent',
      message: `Message sent to ${reciever.name}`,
      theme: 'darkblue',
      native: true,// when using native, your OS will handle theming.
    })
    setOpen(false)
  }
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

  const formatResult = (item: appUser) => {
    return (
      <div className="bg-red-100 flex mr-1 rounded-md shadow-sm shadow-slate-200">
        <AccountCircle />
        <h2 className="ml-1 ">{item.name}</h2>
      </div>
    )
  }

  const handleOnSearch = (string: string, results: appUser[]) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result: appUser) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item: appUser) => {
    // the item selected
    setReciever({id:item._id||'', name:item.name})
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
          {['School Registered', 'New School Visited'].includes(message.title) ?
            <SmartToyIcon />: <AccountCircle />
          }
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
  return (isLoading||uLoading)?<div>Loading...</div>:(
    <>
      <div className="flex flex-row h-full">
        <div className="w-[300px] flex flex-col p-2 items-center content-center h-full bg-slate-300 border-r-2 border-gray-200 shadow-md shadow-black">
          <div className="flex gap-2 align-middle items-center mb-4">
            <h2 className="">Messages</h2>
            <button onClick={()=>setOpen(true)}><AddCommentIcon /></button>
          </div>
          {messageDivs}
        </div>
        <div className="flex h-full w-full bg-slate-200 ">
          {currentMessage}
        </div>
      </div>
      {open &&
        <div className="pl-[2.5%]  sm:pl-[25%] flex items-center content-center fixed top-0 left-0 right-0 bottom-24 bg-[#2e312e33]"
        >
          <div className="bg-gray-100 p-5 rounded-lg relative w-[95%] xl:w-[60%] flex flex-col">
            <h2>Message</h2>
            <div  className='mt-3 flex flex-col sm:felx-row gap-1'>
              <label className=''>TO: {reciever.name}</label>
              <ReactSearchAutocomplete
                items={users?.users||[]}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                fuseOptions={{ keys: ['name'] }}
              />
            </div>
            <textarea className="mt-2 bg-gray-200 ml-4 w-[90%] p-2 " rows={4} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type your message here..." />
            <button onClick={sendUserMessage} className="bg-[#00c274] rounded-lg p-2 text-white shadow-sm shadow-current mt-4">Send</button>
            <button className="absolute top-2 right-2 bg-transparent border-0  text-lg cursor-pointer" onClick={() => setOpen(false)}>
            X
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default Messages