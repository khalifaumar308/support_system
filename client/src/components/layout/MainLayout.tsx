import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import ResponsiveDrawer from "../../pages/ResponsiveDrawer";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/api/authSlice";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/socket";

// const socket = io.connect("")
const MainLayout = () => {
  const user = useAppSelector(selectCurrentUser);
  // const [socket, setSocket] = useState(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket?.emit("newUser", user);
    return () => {
    };
  }, [user, socket]);

  return (
    <Box sx={{ display: "flex" }}>
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