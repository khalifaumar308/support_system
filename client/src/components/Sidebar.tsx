import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import colorConfigs from "../configs/colorConfigs";
import sizeConfigs from "../configs/sizeConfigs";
import appRoutes from "../routes/adminRoutes";
import affiliateRoutes from "../routes/affiliateRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { zenkleus } from "../assets";
import { useLocation } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from "./Logout";


const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const routes = pathname.includes('affiliate')? affiliateRoutes: appRoutes
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width, 
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" , backgroundColor:"white" }}
            direction="row"
            justifyContent="center"
          >
            <Avatar sx={{width:"100%"}} src={zenkleus} />
          </Stack>
        </Toolbar>
        {routes.map((route, index) => {
          return route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        })}
        <Logout />
      </List>
    </Drawer>
  );
};

export default Sidebar;