import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { awsExports } from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { UserProvider } from "./components/UserContext"; 
// Pages & Components
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
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  const fetchSpecialization = async () => {
    try {
      setLoading(true);

      // MOCKED DATA
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
    <UserProvider>
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

                  <div className="amplify-field">
                    <label className="amplify-label">Role</label>
                    <select
                      name="custom:role"
                      className="amplify-input"
                      value={role}
                      required
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Counsellor">Counsellor</option>
                    </select>
                  </div>

                  <div className="amplify-field">
                    <label className="amplify-label">First name</label>
                    <input
                      type="text"
                      name="given_name"
                      className="amplify-input"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div className="amplify-field">
                    <label className="amplify-label">Last name</label>
                    <input
                      type="text"
                      name="family_name"
                      className="amplify-input"
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div className="amplify-field">
                    <label className="amplify-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="amplify-input"
                      placeholder="Enter valid email"
                      required
                    />
                  </div>

                  {role === "Customer" ? (
                    <div className="amplify-field">
                      <label className="amplify-label">Age</label>
                      <input
                        type="number"
                        name="custom:age"
                        className="amplify-input"
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <div className="amplify-field">
                        <label className="amplify-label">Specialization</label>
                        <select
                          name="custom:specialization"
                          className="amplify-input"
                          required
                        >
                          {specializations.map((spec) => (
                            <option key={spec.value} value={spec.label}>
                              {spec.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="amplify-field">
                        <label className="amplify-label">Description</label>
                        <textarea
                          name="custom:description"
                          className="amplify-input"
                          placeholder="Tell us about yourself"
                          rows={4}
                          required
                        />
                      </div>
                    </>
                  )}
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
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px" }}>
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
            </div>
          </Router>
        )}
      </Authenticator>
    </Authenticator.Provider>
    </UserProvider>
  );
}

export default App;
