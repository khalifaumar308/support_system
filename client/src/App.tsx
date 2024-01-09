import StaffLogin from "./pages/StaffLogin";
import Starter from "./components/Starter"
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ClientLogin from "./pages/ClientLogin";
import PartnerLogin from "./pages/PartnerLogin";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App
