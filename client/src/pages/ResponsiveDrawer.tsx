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
import Topbar from '../components/Topbar';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { zenkleus } from '../assets';
import { selectCurrentUser } from '../store/slices/api/authSlice';
import Logout from '../components/Logout';
import affiliateRoutes from '../routes/affiliateRoutes';
import adminRoutes from '../routes/adminRoutes';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../context/socket';
import { useContext, useEffect } from 'react';
import { useGetNotificationsQuery } from '../store/slices/api/apiEndpoints';
import addNotification from 'react-push-notification';
import { useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import School from '@mui/icons-material/School';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const user = useSelector(selectCurrentUser);
  const { data:notifications, isLoading, isFetching, refetch } = useGetNotificationsQuery({ id: user.id || '' });
  const notificationLoading = isLoading || isFetching;
  const socket = useContext(SocketContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const width = useRef([window.innerWidth])
  const location = useLocation();
  const { pathname } = location;
  const routes = pathname.includes('affiliate') ? affiliateRoutes : adminRoutes
  const notificationNumber = notificationLoading ? '...' : notifications?.notifications.length
  const userNotifications = notificationLoading ? [] : notifications?.notifications;
  const path = location.pathname;
  const splited = path.split('/');
  const currentFeature = splited[2];

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    socket.on('recieveMessage', (data) => {
      addNotification({
          title: data.title,
          subtitle: data.senderName,
          message: `New School Registered`,
          theme: 'darkblue',
          native: true // when using native, your OS will handle theming.
        })
      refetch()
      return
    })
  }, [socket, refetch]);
  
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
      <List sx={{color:'white', fontSize:'24px'}}>
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
          alignContent: 'center',
          display: 'flex',
          flexDirection:'row'
        }}
      >
        {width.current[0] < 650 && (
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
        </Toolbar>)
        }
        <Toolbar sx={{ backgroundColor: 'white', width: "100%" }} >
          {path.includes('user') &&
            <Topbar />
          }
          <h2 className='text-black sm:ml-2 sm:text-2xl hidden sm:flex'>
            {currentFeature.toUpperCase()}
          </h2>
        </Toolbar>
        <Toolbar sx={{ position: "relative", width: "100%" }}>
          <div className='absolute text-xs text-white bg-red-600 p-1 z-10 right-[9.5rem] top-2 rounded-full'>
            <button onClick={handleClick}>{ notificationNumber }</button>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className='p-2'>{userNotifications?.map(({ senderName, type }, id) => {
              return (
                <div key={id} className='flex gap-1 border-b-2 border-gray-400'>
                  <School />
                  <h2>{senderName}:</h2>
                  <p>{type}</p>
                </div>
              )
            })}
            </div>
          </Popover>
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
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#0047ab', color:'white' }
          }}
        >
          {drawer}
          <Logout />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            backgroundColor: 'black',
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#00c274' },
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