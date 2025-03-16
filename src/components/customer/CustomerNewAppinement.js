import React, {useState} from 'react'
import { useAuth } from "react-oidc-context";
import "../../css/makeAppointment.css"; 


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

      const [selectedCounsellor, setSelectedCounsellor] = useState(null);
      const [availableTimes, setAvailableTimes] = useState([]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      
        if (name === "counsellor") {
          const selected = counsellors.find((c) => c.name === value);
          setSelectedCounsellor(selected || null);
      
          if (selected) {
            const times = counsellorTimeSlots.find((slot) => slot.counsellorId === selected.id);
            setAvailableTimes(times ? times.slots : []);
          } else {
            setAvailableTimes([]);
          }
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Appointment Data:', formData);
        alert('Appointment Submitted!');
      };


      const counsellors = [
        { id: 1, name: "Dr. John Doe", specialization: "Mental Health, Anxiety" },
        { id: 2, name: "Dr. Jane Smith", specialization: "Relationship Counselling" },
        { id: 3, name: "Dr. Emily White", specialization: "Career Guidance, Stress Management" },
      ];

      const counsellorTimeSlots = [
        { counsellorId: 1, slots: ["2 PM", "3 PM", "4 PM"] },
        { counsellorId: 2, slots: ["1 PM", "3 PM"] },
        { counsellorId: 3, slots: ["11 AM", "2 PM", "5 PM"] },
      ];
      
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
        <dev className="parent-container">
            <div className="appointment-container">
              <h2 className="appointment-title">Make Appointment</h2>

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
                    {counsellors.map((counsellor, index) => (
                      <option key={index} value={counsellor.name}>
                        {counsellor.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Session Time Dropdown */}
                <div className="form-group">
                  <label>Session Time</label>
                  <select
                    name="sessionTime"
                    value={formData.sessionTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose Time --</option>
                    {availableTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name Input */}
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Note Input (Optional) */}
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
          </div>
      </dev>
      <div className="appointment-container">
        <h2 className="appointment-title">Counsellor Profile</h2>
        
        {selectedCounsellor ? (
          <div>
            <p><strong>Name:</strong> {selectedCounsellor.name}</p>
            <p><strong>Specializations:</strong> {selectedCounsellor.specialization}</p>
          </div>
        ) : (
          <p>Please select a counsellor to view profile.</p>
        )}
      </div>
  </div>
  );
}
