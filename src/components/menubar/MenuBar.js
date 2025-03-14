import React from "react";
import { Link } from "react-router-dom";
import "../../css/menuBar.css"; 
import { useAuth } from "react-oidc-context";

const MenuBar = () => {

  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="/products">Products</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="auth-links">
              <button onClick={() => auth.removeUser()}>Sign out</button>
            </div>
          </div>
      </nav>
      </div>
    );
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/customer">Customer</Link>
          <Link to="/counsoller">Counsellor</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="auth-links">
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
      </div>
    </nav>
  );
}
export default MenuBar;
