import StaffLogin from "./pages/StaffLogin";
import Starter from "./components/Starter"
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes, afroutes, stroutes } from "./routes";
import { SocketContext, socket } from './context/socket';
import { Notifications } from 'react-push-notification';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/slices/api/authSlice";

const App = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <SocketContext.Provider value={socket}>
      <Notifications />
      <Router>
        <Routes>
          <Route path="/" element={<Starter />} />
          <Route path="/login" element={<StaffLogin />} />
          {(user && user.role === 'Admin') &&
            <Route path="/user" element={<MainLayout />} >
              {routes}
            </Route>
          }
          {(user && user.role === 'Affiliate') &&
            <Route path="/affiliate" element={<MainLayout />} >
              {afroutes}
            </Route>
          }
          {(user && user.role === 'Staff') &&
            <Route path="/staff" element={<MainLayout />} >
              {stroutes}
            </Route>
          }
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App
