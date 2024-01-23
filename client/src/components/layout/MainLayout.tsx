import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
// import Sidebar from "../Sidebar";
// import Topbar from "../Topbar";
import ResponsiveDrawer from "../../pages/ResponsiveDrawer";
// import io from 'socket.io-client';
// import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/socket";

// const socket = io.connect("")
const MainLayout = () => {
  const user = useAppSelector(selectCurrentUser);
  // const [socket, setSocket] = useState(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    // const socketInstance = io('http://localhost:3000');
    // setSocket(socketInstance);

    // listen for events emitted by the server
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket?.emit("newUser", user);

    // socket.on('message', (data) => {
    //   console.log(`Received message: ${data}`);
    // });

    return () => {
      // if (socket) {
      //   socket.disconnect();
      // }
    };
  }, [user, socket]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Topbar />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0
        }}
      >
      <Sidebar />
      </Box> */}
      <ResponsiveDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;