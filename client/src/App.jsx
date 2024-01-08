import StaffLogin from "./pages/StaffLogin";
import Starter from "./components/Starter"
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ClientLogin from "./pages/ClientLogin";
import PartnerLogin from "./pages/PartnerLogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/client/login" element={<ClientLogin/>}/>
        <Route path="/partner/login" element={<PartnerLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App
