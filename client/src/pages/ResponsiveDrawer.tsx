import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Avatar, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useRef } from 'react';
import SidebarItem from '../components/SidebarItem';
import SidebarItemCollapse from '../components/SidebarItemCollapse';
import colorConfigs from '../configs/colorConfigs';
import Topbar from '../components/Topbar';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { zenkleus } from '../assets';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/slices/api/authSlice';
import Logout from '../components/Logout';
import affiliateRoutes from '../routes/affiliateRoutes';
import adminRoutes from '../routes/adminRoutes';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const width = useRef([window.innerWidth])
  const location = useLocation();
  const { pathname } = location;
  const routes = pathname.includes('affiliate') ? affiliateRoutes : adminRoutes

  const user = useAppSelector(selectCurrentUser)
  
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  // UmarDKD8499
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar >
        <Stack
          sx={{ width: "100%", backgroundColor: "white" }}
          direction="row"
          justifyContent="center">
          <Avatar sx={{ width: "100%" }} src={zenkleus} />
        </Stack>
      </Toolbar>
      <Divider />
      <List>
        {
          routes.map((route, index) => {
            return route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          })
        }
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          // alignContent: 'center',
          display: 'flex',
          flexDirection:'row'
        }}
      >
        {width.current[0] < 650 && (
          <Toolbar>
            <IconButton
              color="black"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
        </Toolbar>)
        }
        <Toolbar sx={{backgroundColor:'white',width:"100%"}} >
          <Topbar />
        </Toolbar>
        <Toolbar sx={{position:"relative", width:"100%"}}>
          <div className='text-orange-500 absolute right-8 flex gap-2 align-middle '>
            <NotificationsNoneRoundedIcon />
            <AccountCircleIcon />
            {user.name}
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
          <Logout />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
          <Logout />
        </Drawer>
      </Box>
    </Box>
  );
}