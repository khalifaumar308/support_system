import StaffLogin from "./pages/StaffLogin";
import Starter from "./components/Starter"
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ClientLogin from "./pages/ClientLogin";
import PartnerLogin from "./pages/PartnerLogin";
import MainLayout from "./components/layout/MainLayout";
import View from "./components/adminComponents/View";
import ResponsiveDrawer from "./pages/ResponsiveDrawer";
import { routes, afroutes } from "./routes";
import { SocketContext, socket } from './context/socket';
import { Notifications } from 'react-push-notification';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Notifications />
      <Router>
        <Routes>
          <Route path="/" element={<Starter />} />
          <Route path="/login" element={<StaffLogin />} />
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/user" element={<MainLayout />} >
            {routes}
          </Route>
          {/* <Route path="/view/*" element={<View />} ></Route> */}
            <Route path="/affiliate" element={<MainLayout />} >
              {afroutes}
            </Route>
            <Route path="/drawer" element={<ResponsiveDrawer />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App
