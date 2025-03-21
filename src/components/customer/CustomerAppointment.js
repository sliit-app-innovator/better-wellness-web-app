import React, { useState, useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import "../../css/cusomerAppointments.css"; 
import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
  
export default function CustomerAppointment() {
  const auth = useAuth();

  
  const [customerProfile, setCustomerProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    age: '',
    created_at: '',
    last_login_at: '',
    updated_at: ''
  });

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const customerId = 1;
      setLoadingAppointments(true);
      try {
        const response = await axios.get(`${apiConfig.APPOINTMET_SERVICE_API_BASE_URL}/appointment/customer?customerId=${customerId}`);

        setAppointments(response.data); // Assuming API returns array of appointments
      } catch (error) {
        console.error('Failed to load appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [auth.isAuthenticated, auth.user]);
  

  // Auto-clear error popup
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleDeleteAppointment = async (index, appointmentId) => {
    const result = await Swal.fire({
      title: 'Delete Appointment?',
      text: "Are you sure you want to delete this appointment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
    if (result.isConfirmed) {
      try {
        // Call DELETE API
        await axios.delete(`${apiConfig.APPOINTMET_SERVICE_API_BASE_URL}/appointment/${appointmentId}`);
        setSuccess('Appointment Cancelled successfully!');
        // Update UI after delete
        const updatedAppointments = [...appointments];
        updatedAppointments.splice(index, 1);
        setAppointments(updatedAppointments);
      } catch (error) {
        setSuccess('Failed to delete appointment');
      }
    }
  };


  if (auth.isLoading || loadingAppointments) {
    return <div>Loading...</div>;
  }


    return (
<div className="parent-container-profile">
  <div className="profile-container">
    <h2 className="profile-title">Your Recent Appointments</h2>
    {loadingAppointments ? (
      <p>Loading appointments...</p>
    ) : (
      <table className="appointment-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Alias</th>
          <th>Counselor Name</th>
          <th>Action</th> {/* New Column */}
        </tr>
      </thead>
      <tbody>
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.alias}</td>
              <td>{appointment.counsellorName}</td>
              <td 
                onClick={() => handleDeleteAppointment(index, appointment.id)}
                className="delete-icon-cell"
              >
                <FaTrashAlt className="delete-icon" />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No recent appointments found.</td>
          </tr>
        )}
      </tbody>
    </table>
    )}
  </div>
</div>


    );
}
