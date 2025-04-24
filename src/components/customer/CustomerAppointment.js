import React, { useState, useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import "../../css/cusomerAppointments.css"; 
import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FaComments } from 'react-icons/fa';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useUser } from "../UserContext";

let stompClient = null;

export default function CustomerAppointment() {
  const auth = useAuth();
  const { user, isAuthenticated } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const processedTimestamps = new Set();
  
  setInterval(() => {
    if (processedTimestamps.size > 100) {
      processedTimestamps.clear();
    }
  }, 30000)

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
      title: 'Cancel Appointment?',
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

  const openChatWindow = async (counsellorId, counsellorName, customerId) => {
    const chatHistory = await fetchMessages(customerId, counsellorId); // Initial load
  
    Swal.fire({
      title: `Chat with ${counsellorName}`,
      html: `
        <div style="text-align:left; display: flex; flex-direction: column;">
          <div id="chat-box" style="height:200px; overflow-y:auto; border:1px solid #ccc; padding:10px; margin-bottom:10px;">
            ${chatHistory.map(msg => `
              <p><strong>${msg.sender === 'customer' ? 'You' : counsellorName}:</strong> ${msg.message}</p>
            `).join('')}
          </div>
          <div style="display: flex; align-items: center;">
            <input id="chat-input" type="text" placeholder="Type your message..." style="flex:1; padding:10px; border-radius: 20px; border:1px solid #ccc;" />
            <button id="send-btn" style="background:#0088cc; border:none; border-radius:50%; width:40px; height:40px; margin-left:10px; display:flex; align-items:center; justify-content:center;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="20" height="20" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      width: '400px',
  
      didOpen: () => {
        const chatBox = Swal.getPopup().querySelector('#chat-box');
        const input = Swal.getPopup().querySelector('#chat-input');
        const sendBtn = Swal.getPopup().querySelector('#send-btn');
        chatBox.scrollTo({
          top: chatBox.scrollHeight,
          behavior: 'smooth'
        });

        const appendMessage = (sender, message) => {
          const newMsg = `<p><strong>${sender === 'customer' ? 'You' : sender}:</strong> ${message}</p>`;
          chatBox.innerHTML += newMsg;
          chatBox.scrollTop = chatBox.scrollHeight;
        };
  
        // 📡 Connect WebSocket using STOMP
        const socket = new SockJS(`${apiConfig.MESSAGING_SERVICE_WEB_SOCKET_URL}`);
        stompClient = new Client({
          webSocketFactory: () => socket,
          onConnect: () => {
            console.log("WebSocket Connected counsellorId " + counsellorId + "customerId " + customerId) ;

            stompClient.subscribe(`/topic/chat/${customerId}-${counsellorId}`, (message) => {
              const data = JSON.parse(message.body);
              console.log("Incomming message.........")
              // Check if message with same timestamp already processed
              if (!processedTimestamps.has(data.timestamp)) {
                processedTimestamps.add(data.timestamp);
                console.log("Incomming message.........Time check passs ")
                // Only process if not duplicate
                if (data.sender === 'counsellor') {
                  console.log("Incomming message.........sender check passs ")
                  appendMessage(counsellorName, data.message);
                }
              }
            });
  
            // Optionally notify server about JOIN
            stompClient.publish({
              destination: '/app/chat.join',
              body: JSON.stringify({
                sender: 'customer',
                counsellorId: counsellorId,
                customerId: customerId
              })
            });
          },
          onDisconnect: () => {
            console.log('WebSocket Disconnected');
          },
          debug: (str) => {
            console.log(str);
          }
        });
  
        stompClient.activate();
  
        // Send message on button click
        sendBtn.addEventListener('click', () => {
          if (input.value.trim() !== '') {
            const messageContent = input.value;
            appendMessage('customer', messageContent);
  
            stompClient.publish({
              destination: '/app/chat.sendMessage',
              body: JSON.stringify({
                sender: 'customer',
                counsellorId: counsellorId,
                customerId: customerId,
                timestamp: Date.now(),
                message: messageContent
              })
            });
  
            input.value = '';
          }
        });
  
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendBtn.click();
        });
      },
  
      willClose: () => {
        if (stompClient) {
          stompClient.deactivate();
          stompClient = null;
          console.log('WebSocket Connection Closed');
        }
      }
    });
  };

  const fetchMessages = async (customerId, counsellorId) => {
    try {
      const response = await axios.get(`${apiConfig.MESSAGING_SERVICE_CHAT_HISTORY_URL}`, {
        params: { customerId, counsellorId }
      });
      return response.data; // Assuming array of { sender, message }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  };
  

  if (auth.isLoading || loadingAppointments) {
    return <div>Loading...</div>;
  }


return (
<div className="appointment-container-profile">
  <div className="appointment-container">
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
          <th>Counselor Specializations</th>
          <th>Requested Date</th>
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
                className="specialization-link"
                style={{ color: '#3085d6', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => Swal.fire({
                  title: 'Counsellor Specializations',
                  html: `<p style="text-align:left;">${appointment.counsellorSpec}</p>`,
                  icon: 'info',
                  confirmButtonColor: '#3085d6'
                })}
              >
                View Specializations
              </td>
              <td>{appointment.createdDate}</td>
              <td>
                <tr>
                  <td style={{ cursor: 'pointer', textAlign: 'center' }}
                      onClick={() => openChatWindow(appointment.counsellorId, appointment.counsellorName, appointment.customerId)} >
                      <FaComments style={{ color: '#3085d6', fontSize: '18px' }} />
                  </td>
                  <td onClick={() => handleDeleteAppointment(index, appointment.id)}
                  className="delete-icon-cell">
                  <FaTrashAlt className="delete-icon" />
                  </td>
                </tr>
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
