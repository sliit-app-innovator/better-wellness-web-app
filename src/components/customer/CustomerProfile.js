import React, { useState, useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import "../../css/customerProfile.css"; 
import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import { useUser } from "../UserContext";

export default function CustomerProfile() {
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

  const [loadingProfile, setLoadingProfile] = useState(false); 
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useUser();
  console.info('USER ID', user.id);
  useEffect(() => {
    const fetchProfile = async () => {
        setLoadingProfile(true);
        try {
          // Replace API URL as needed
        //  const username = auth.user?.profile?.preferred_username || auth.user?.profile?.email;
         // const token = auth.user?.access_token;
         console.error('LOGGED USER ID -------->>> ', user.apiResponse?.id);
          const response = await axios.get(`${apiConfig.USER_SERVICE_API_BASE_URL}/customer/1`);
          setCustomerProfile(response.data);
 //         window.alert(response.data.age);
 //         window.alert(response.data.first_name);
 //         window.alert(response.data.last_name);
        } catch (err) {
          console.error('Failed to load customer profile', err);
          setError('Failed to load profile. Please try again.');
        } finally {
          setLoadingProfile(false);
        }
    };

    fetchProfile();
  }, [auth]);

  if (auth.isLoading || loadingProfile) {
    return <div>Loading...</div>;
  }

  if (auth.error || error) {
    return <div>Error: {auth.error?.message || error}</div>;
  }

    return (
      <div className="parent-container-profile">
        <div className="profile-container">
          <h2 className="profile-title">Your Profile</h2>
          <div className="profile-details-grid">
            
            <div className="form-group-inline">
              <label>First Name:</label>
              <input type="text" value={customerProfile.firstName} readOnly />
            </div>

            <div className="form-group-inline">
              <label>Last Name:</label>
              <input type="text" value={customerProfile.lastName} readOnly />
            </div>

            <div className="form-group-inline">
              <label>Username:</label>
              <input type="text" value={customerProfile.username} readOnly />
            </div>

            <div className="form-group-inline">
              <label>Age:</label>
              <input type="text" value={customerProfile.age} readOnly />
            </div>

            <div className="form-group-inline">
              <label>Created At:</label>
              <input type="text" value={customerProfile.createdAt} readOnly />
            </div>

            <div className="form-group-inline">
              <label>Last Login:</label>
              <input type="text" value={customerProfile.lastLoginAt} readOnly />
            </div>

            <div className="form-group-inline">
              <label>Updated At:</label>
              <input type="text" value={customerProfile.updatedAt} readOnly />
            </div>

          </div>
        </div>
      </div>
    );
}
