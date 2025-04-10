import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { awsExports } from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
//import { Provider } from "react-redux";
//import { Store } from "./store";

//import AppHeader from "./components/AppHeader";
//import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { CFormTextarea } from "@coreui/react";
//import { SocketProvider } from "./components/SocketContext";

// Components (Routes)
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import CustomerProfile from "./components/customer/CustomerProfile";
import CustomerAppointment from "./components/customer/CustomerAppointment";
import CustomerNewAppinement from "./components/customer/CustomerNewAppinement";
import CounsollerProfile from "./components/counsoller/CounsollerProfile";
import CounsollerViewAppointments from "./components/counsoller/CounsollerViewAppointments";
import CounsollerSetSesion from "./components/counsoller/CounsollerSetSesion";

import './css/login.css';
import "bootstrap/dist/css/bootstrap.min.css";

Amplify.configure({ ...awsExports });

function App() {
 // const axios = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState("");

  const fetchSpecialization = async () => {
    try {
      setLoading(true);
     /* const apiUrl = new URL("counsellor/getAllSpecialization", config.baseUrl).href;
      const response = await axios.get(apiUrl);
      const options = response.data.map(item => ({
        value: item._id,
        label: item.Area,
      }));*/
      
      const mockData = [
        { _id: '1', Area: 'Mental Health' },
        { _id: '2', Area: 'Career Counseling' },
        { _id: '3', Area: 'Relationship Counseling' },
        { _id: '4', Area: 'Addiction Recovery' }
      ];
      
      const options = mockData.map(item => ({
        value: item._id,
        label: item.Area,
      }));

      setSpecializations([{ value: "", label: "Please select specialization" }, ...options]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching specialization:", error);
    }
  };

  useEffect(() => {
    fetchSpecialization();
  }, []);

  return (
      <Authenticator.Provider>
        <Authenticator
          initialState="signIn"
          components={{
            SignUp: {
              FormFields() {
                const [role, setRole] = useState("Customer");
                return (
                  <>
                    <Authenticator.SignUp.FormFields />
                    <div><label>Role</label></div>
                    <select name="custom:role" className="form-control-custom" value={role} required onChange={e => setRole(e.target.value)}>
                      <option value="Customer">Customer</option>
                      <option value="Counsellor">Counsellor</option>
                    </select>
                    <div><label>First name</label></div>
                    <input type="text" name="given_name" className="form-control-custom" placeholder="Enter first name" />

                    <div><label>Last name</label></div>
                    <input type="text" name="family_name" className="form-control-custom" placeholder="Enter last name" />

                    <div><label>Email</label></div>
                    <input type="email" name="email" className="form-control-custom" placeholder="Enter valid email" />
                  </>
                );
              },
            },
          }}
          services={{
            async validateCustomSignUp(formData) {
              const errors = {};
              if (!formData.given_name) errors.given_name = "First Name is required";
              if (!formData.family_name) errors.family_name = "Last Name is required";
              if (!formData.email) errors.email = "Email is required";
              return errors;
            },
          }}
        >
          {({ signOut, user }) => (
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
          )}
        </Authenticator>
      </Authenticator.Provider>
  );
}

export default App;
