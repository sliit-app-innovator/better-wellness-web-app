import React, { useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import Carousel from 'react-bootstrap/Carousel';
import { awsUserPoolData } from '../../aws-exports.js';
import axios from "axios";
import apiConfig from '../../config/apiConfig';
import { useUser } from "../UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '../../images/carol1.webp';  // Adjust path relative to src/components/home/Home.js
import image2 from '../../images/carol2.webp';
import image3 from '../../images/carol3.webp';
import image4 from '../../images/carol4.webp';
import image5 from '../../images/carol5.webp';
import {
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js';

export default function Home() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "7u1icmkn6vv97apgrr1du5sbs9";
    const logoutUri = "http://www.google.com";
    const cognitoDomain = "https://ap-south-1of6yas36s.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const userPool = new CognitoUserPool(awsUserPoolData);
  const { saveUser } = useUser();
  useEffect(() => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
      if (err) {
        console.error('Error retrieving session:', err);
        return;
      }
  
      if (session.isValid()) {
        cognitoUser.getUserAttributes(async function(err, attributes) {
          if (err) {
            console.error('Error retrieving user attributes:', err);
            return;
          }
  
          // Convert attributes to key-value object
          console.log("User Name ->>> " + cognitoUser.username + " IS AUTH >>>>>>>> " + auth.isAuthenticated);
          const userData = {};
          attributes.forEach(attr => {
            userData[attr.getName()] = attr.getValue();
            console.log(`${attr.getName()} = ${attr.getValue()}`);
          });
  
          console.log("User role:", userData["custom:role"]);
  
          try {
            let apiUrl = "";
            let payload = {};
            if (userData["custom:role"] === "Customer") {
              apiUrl = apiConfig.USER_SERVICE_API_BASE_URL + "/customer";
              payload = {
                username: cognitoUser.username,
                email: userData.email,
                age:userData["custom:age"],
                firstName: userData.given_name,
                lastName: userData.family_name,
                role: "Customer"
              };
            } else if (userData["custom:role"] === "Counsellor") {
              apiUrl = apiConfig.USER_SERVICE_API_BASE_URL + "/counsellor";
              payload = {
                username: cognitoUser.username,
                email: userData.email,
                firstName: userData.given_name,
                lastName: userData.family_name,
                role: "Counsellor",
                specializations: userData["custom:specialization"] || null,
                description: userData["custom:description"] || null
              };
            } else {
              console.warn("Unknown role, no API called.");
              return;
            }
  
            try {
              const response = await axios.post(apiUrl, payload);
              console.log("Backend API response: >>>>>>>>>>>>>>>>>>>>>. ", response.data);
              saveUser({ ...userData, apiResponse: response.data });
            } catch (error) {
              console.error("Sync failed:", error);
            }
  
          } catch (apiErr) {
            console.error("Failed to sync user with backend:", apiErr);
          }
        });
      } else {
        console.log("Session is invalid.");
      }
    });
  } else {
    console.log("No user is currently logged in.");
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountered an error... {auth.error.message}</div>;
  }
  }, []);
  const { user, isAuthenticated } = useUser();

  return (
    <div className="container mt-4">
      <br/>
      <br/>
      <div style={{
          background: 'linear-gradient(135deg,rgb(203, 85, 17) 0%,rgb(134, 252, 37) 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '15px 15px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            Welcome to Better Wellness
          </h1>
          <p style={{
            fontSize: '1.2rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Book your counseling sessions effortlessly. Our platform connects you with
            experienced professionals in General Psychiatry, Clinical Psychology, and more.
          </p>
        </div>

    <Carousel className="my-4" interval={3000} pause={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="Counselling Image 1"
          />
          <Carousel.Caption>
            <h3>Expert Counsellors</h3>
            <p>Our professionals are here to support your mental well-being.</p>
          </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}
            alt="Counselling Image 2"
          />
          <Carousel.Caption>
            <h3>Flexible Appointments</h3>
            <p>Choose a session time that works best for you.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image5}
            alt="Counselling Image 5"
          />
          <Carousel.Caption>
            <h3>Flexible Appointments</h3>
            <p>Choose a session time that works best for you.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image3}
            alt="Counselling Image 3"
          />
          <Carousel.Caption>
            <h3>Confidential & Secure</h3>
            <p>Your privacy and security are our top priorities.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image4}
            alt="Counselling Image 4"
          />
          <Carousel.Caption>
            <h3>Confidential & Secure</h3>
            <p>Your privacy and security are our top priorities.</p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.given_name}!</p>
          <button className="btn btn-primary me-2" onClick={() => auth.removeUser()}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-success me-2" onClick={() => auth.signinRedirect()}>
            Sign in
          </button>
          <button className="btn btn-danger" onClick={() => signOutRedirect()}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
