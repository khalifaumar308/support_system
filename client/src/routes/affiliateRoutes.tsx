import { RouteType } from "./config";
import { AffiliateDashboard, Visits, MySchools } from "../pages";

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';


const affiliateRoutes: RouteType[] = [
  {
    path: "dashboard",
    element: <AffiliateDashboard />,
    state: "affiliatedashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    }
  },
  {
    path: "myschools",
    element: <MySchools />,
    state: "myschools",
    sidebarProps: {
      displayText: "My Schools",
      icon: <SchoolOutlinedIcon />
    }
  },
  {
    path: "visits",
    element: <Visits />,
    state: "visits",
    sidebarProps: {
      displayText: "Visits",
      icon: <DirectionsWalkRoundedIcon />
    }
  }
]

export default affiliateRoutes