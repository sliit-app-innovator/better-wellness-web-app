import React from "react";
import { Link } from "react-router-dom";
import "../../css/menuBar.css"; 
import { useAuth } from "react-oidc-context";
import { useUser } from "../UserContext";
import apiConfig from '../../config/apiConfig';

const MenuBar = () => {
  const { user, isAuthenticated, logoutUser } = useUser();
  const signOutRedirect = () => {
    // Update these values with your actual Cognito app info
    const clientId = apiConfig.AWS_CLIENT_ID;
    const logoutUri = apiConfig.LOGOUT_URL; // Or your post-logout redirect URI
    const cognitoDomain = apiConfig.AWS_COGNITO_DOMAIN;
    // Clear local user state
    logoutUser();
    // Redirect to Cognito logout
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="auth-links">
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: "10px" }}>
                Welcome, {user?.given_name || user?.email}
              </span>
              <button onClick={signOutRedirect}>Sign Out</button>
            </>
          ) : (
            <button onClick={() => auth.signinRedirect()}>Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
}
export default MenuBar;
