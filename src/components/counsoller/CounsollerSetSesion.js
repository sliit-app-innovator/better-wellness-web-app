import React, { useState, useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import '../../css/counsollerSetSesion.css';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';

export default function CounsollerSetSesion() {
  const auth = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        sessionName: formData.title,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        //TODO USER ID
        counsellorId: 1,
        sessionDesc: formData.description
      };

      // Replace with your backend API endpoint
      const response = await axios.post(`${apiConfig.APPOINTMET_SERVICE_API_BASE_URL}/availability`, payload);

      if (response.status === 201 || response.status === 200) {
        setMessage({ type: 'success', text: 'Session created successfully!' });
        setFormData({ title: '', date: '', startTime: '', endTime: '', description: '' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create session. Please try again.' });
      console.error(error);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [message]);
  
  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Encountering error... {auth.error.message}</div>;
  
  
  if (auth.isAuthenticated) {
  }


    return (
      <div className="parent-container">
        <div className="appointment-container">
          <h2 className="appointment-title">Counselor Session Management</h2>

          {message.text && (
            <div className={message.type === 'success' ? 'success-popup' : 'error-popup'}>
              {message.text}
            </div>
          )}

          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Session Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter session title"
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter session details"
              ></textarea>
            </div>

            <div className="submit-button-container">
              <button type="submit" className="submit-button">
                Save Session
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
