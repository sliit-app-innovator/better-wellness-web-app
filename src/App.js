import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Layout from "./components/Layout";
import CustomerProfile from './components/customer/CustomerProfile';
import CustomerAppointment from './components/customer/CustomerAppointment';
import CustomerNewAppinement from './components/customer/CustomerNewAppinement';
import CounsollerProfile from './components/counsoller/CounsollerProfile';
import CounsollerViewAppointments from './components/counsoller/CounsollerViewAppointments';
import CounsollerSetSesion from './components/counsoller/CounsollerSetSesion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/new-appointment" element={<CustomerNewAppinement />} />
          <Route path="/customer/my-appointments" element={<CustomerAppointment />} />
          <Route path="/counselor/profile" element={<CounsollerProfile />} />
          <Route path="/counselor/set-session" element={<CounsollerSetSesion />} />
          <Route path="/counselor/view-appointments" element={<CounsollerViewAppointments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
