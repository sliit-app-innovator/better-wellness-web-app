import React from "react";
import { Link } from "react-router-dom";
import "../../css/menuBar.css"; 
import { useAuth } from "react-oidc-context";

const MenuBar = () => {

  const signOutRedirect = () => {
    const clientId = "7ostkmm64r70hmnjhmcnphhtc8";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://<user pool domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <nav className="navbar">
            <pre> Hello: {auth.user?.profile.email} </pre>
            <pre> ID Token: {auth.user?.id_token} </pre>
            <pre> Access Token: {auth.user?.access_token} </pre>
            <pre> Refresh Token: {auth.user?.refresh_token} </pre>
            <div className="nav-links">
              <Link to="/"></Link>
              <Link to="/about"></Link>
              <Link to="/services"></Link>
              <Link to="/products"></Link>
              <Link to="/contact"></Link>
            </div>
            <div className="auth-links">
              <button onClick={() => signOutRedirect()}>Sign out</button>
            </div>
        </nav>
      </div>
    );
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
            <button onClick={() => auth.signinRedirect()}>Sign In</button>
          </div>
        </div>
      </nav>
  );
}
export default MenuBar;
