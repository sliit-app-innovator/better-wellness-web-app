import React, { useState, useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import "../../css/makeAppointment.css"; 
import axios from 'axios';
import apiConfig from '../../config/apiConfig';

export default function CustomerNewAppinement() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "6iacmbs34ua4srv863jguc43vg";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://<user pool domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const [formData, setFormData] = useState({
    counsellor: '',
    sessionTime: '',
    name: '',
    note: ''
  });

  const [counsellors, setCounsellors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [loadingCounsellors, setLoadingCounsellors] = useState(true);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch Counsellors
  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const response = await axios.get(`${apiConfig.USER_SERVICE_API_BASE_URL}/counsellor`); 
        setCounsellors(response.data.counsellors);
      } catch (err) {
        setError('Unexpected error occurred while fetching counsellors. Please try again later.');
      } finally {
        setLoadingCounsellors(false);
      }
    };
    fetchCounsellors();
  }, []);

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

  // Fetch Time Slots when counsellor selected
  useEffect(() => {
    const fetchAvailability = async () => {
      if (formData.counsellor) {
        const selected = counsellors.find((c) => c.username === formData.counsellor);
        setSelectedCounsellor(selected || null);
        setAvailableTimes([]);
        setLoadingTimes(true);
        try {
          const response = await axios.get(`${apiConfig.APPOINTMET_SERVICE_API_BASE_URL}/availability?counsellorId=${selected.id}`);
          setAvailableTimes(response.data.slots || []);
        } catch (err) {
          setError('Failed to load availability. Please try again later.');
        } finally {
          setLoadingTimes(false);
        }
      } else {
        setAvailableTimes([]);
        setSelectedCounsellor(null);
      }
    };
    fetchAvailability();
  }, [formData.counsellor, counsellors]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'counsellor' ? { sessionTime: '' } : {}) // Reset session time if counsellor changes
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedCounsellor || !formData.sessionTime) {
    setError('Please select counsellor and session time.');
    return;
  }

    const payload = {
      alias: formData.name,
      counsellorId: selectedCounsellor.id,
      customerId: 1, // Hardcoded for now
      availabilityId: formData.sessionTime,
      notes: formData.note
    };

    try {
      const response = await axios.post(`${apiConfig.APPOINTMET_SERVICE_API_BASE_URL  }/appointment`, payload); // ADD await ✅
      setSuccess('Appointment booked successfully!');
      // Reset form
      setFormData({
        counsellor: '',
        sessionTime: '',
        name: '',
        note: ''
      });
      setAvailableTimes([]);
      setSelectedCounsellor(null);
    } catch (err) {
      console.error(err);
      setError('Failed to submit appointment. Please try again later.');
    }
};

if (auth.isLoading) {
  return <div>Loading...</div>;
}

if (auth.error) {
  return <div>Encountering error... {auth.error.message}</div>;
}

if (auth.isAuthenticated) {
  return (
    <div>
      <pre> Hello: {auth.user?.profile.email} </pre>
      <pre> ID Token: {auth.user?.id_token} </pre>
      <pre> Access Token: {auth.user?.access_token} </pre>
      <pre> Refresh Token: {auth.user?.refresh_token} </pre>

    </div>
  );
}

  return (
    <div className="page-wrapper">
      <div className="parent-container">
        <div className="appointment-container">
            {success && (
              <div className="success-popup">
                {success}
              </div>
            )}

            {/* Error Popup */}
            {error && (
              <div className="error-popup">
                {error}
              </div>
            )}
          <h2 className="appointment-title">Make Appointment</h2>

          {loadingCounsellors ? (
            <div>Loading counsellors...</div>
          ) : (
            <form onSubmit={handleSubmit} className="appointment-form">
              
              {/* Counsellor Dropdown */}
              <div className="form-group">
                <label>Select Counsellor</label>
                <select
                  name="counsellor"
                  value={formData.counsellor}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose Counsellor --</option>
                  {counsellors.map((counsellor) => (
                    <option key={counsellor.id} value={counsellor.username}>
                      {counsellor.firstName} {counsellor.lastName} 
                    </option>
                  ))}
                </select>
              </div>

              {/* Session Time Dropdown */}
              <div className="form-group">
                <label>Session Time</label>
                {loadingTimes ? (
                  <div>Loading availability...</div>
                ) : (
                  <select
                      name="sessionTime"
                      value={formData.sessionTime}
                      onChange={handleChange}
                      required
                      disabled={availableTimes.length === 0}
                    >
                      {availableTimes.length === 0 ? (
                        <option value="">No available sessions</option>
                      ) : (
                        <>
                          <option value="">-- Choose Time --</option>
                          {availableTimes.map((slot, index) => (
                            <option key={index} value={slot.id}>
                              Date {slot.date} : From {slot.startTime} → To {slot.endTime}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                )}
              </div>

              {/* Name Input */}
              <div className="form-group">
                <label>Your Name/Alias</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Note Input */}
              <div className="form-group">
                <label>Note (Optional)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any specific concerns?"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-group text-center">
                <button type="submit" className="submit-button">
                  Book Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="appointment-counsoller-data">
        <h2 className="appointment-title">Counsellor Profile</h2>
        {selectedCounsellor ? (
          <div>
            <p><strong>Name:</strong> {selectedCounsellor.firstName} {selectedCounsellor.lastName} </p>
            <p><strong>Specializations:</strong> {selectedCounsellor.specializations}</p>
          </div>
        ) : (
          <p>Please select a counsellor to view profile.</p>
        )}
      </div>
    </div>
  );
}
