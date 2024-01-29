import { RouteType } from "./config";
import { AffiliateDashboard, Visits, MySchools } from "../pages";
import { UsersLayout } from "../pages";
import AddSchool from "../pages/affiliatePages/AddSchool";
import AddVisit from "../pages/affiliatePages/AddVisit";
// import VisitView from "../components/affiliate/VisitView";
import SchoolView from "../components/affiliate/SchoolView";

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
    path: "/affiliate/schools",
    element: <UsersLayout />,
    state: "schools",
    sidebarProps: {
      displayText: "Schools",
      icon: <SchoolOutlinedIcon />
    },
    child: [
      {
        path: "/affiliate/schools/all",
        element: <MySchools />,
        state: "myschools",
        sidebarProps: {
          displayText: "My Schools",
        }
      },
      {
        path: "/affiliate/schools/addschool",
        element: <AddSchool />,
        state: "all",
        sidebarProps: {
          displayText: "Add School",
        }
      }
    ]
  },
  {
    path: "/affiliate/visits",
    element: <UsersLayout />,
    state: "visits",
    sidebarProps: {
      displayText: "Visits",
      icon: <DirectionsWalkRoundedIcon />
    },
    child: [
      {
        path: "/affiliate/visits/all",
        element: <Visits />,
        state: "myvisits",
        sidebarProps: {
          displayText: "My Visits",
        }
      },
      {
        path: "/affiliate/visits/addvisit",
        element: <AddVisit />,
        state: "addvisit",
        sidebarProps: {
          displayText: "New Visit",
        }
      }
    ]
  },
  {
    path: "/affiliate/schoolview/:id/:percentage",
    element: <SchoolView />,
    state: "schoolview",
    sidebarProps: {
      displayText: ""
    }
  },

]

export default affiliateRoutes