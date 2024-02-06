import { RouteType } from "./config";
import MessageIcon from '@mui/icons-material/Message';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";

import Tasks from "../pages/staffPages/Tasks";
import Message from "../pages/staffPages/Message";
import Dashboard from "../pages/staffPages/Dashboard";



const staffRoutes: RouteType[] = [
  {
    path: "dashboard",
    element: <Dashboard />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlined />
    }
  },
  {
    path: "tasks",
    element: <Tasks />,
    state: "tasks",
    sidebarProps: {
      displayText: "Tasks",
      icon: <AssignmentTurnedInOutlinedIcon />
    }
  },
  {
    path: "messages",
    element: <Message />,
    state: "message",
    sidebarProps: {
      displayText: "Message",
      icon: <MessageIcon />
    }
  },
]

export default staffRoutes