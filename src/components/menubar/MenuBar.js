import React from "react";
import { Link } from "react-router-dom";
import "../../css/menuBar.css"; 
import { useAuth } from "react-oidc-context";

const MenuBar = () => {

  const auth = useAuth();
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <nav className="navbar">
            <div className="nav-links">
              <Link to="/"></Link>
              <Link to="/about"></Link>
              <Link to="/services"></Link>
              <Link to="/products"></Link>
              <Link to="/contact"></Link>
            </div>
            <div className="auth-links">
              <button onClick={() => auth.removeUser()}>Sign out</button>
            </div>
        </nav>
      </div>
    );
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-links">
          <Link to="/"></Link>
          <Link to="/customer"></Link>
          <Link to="/counsoller"></Link>
          <Link to="/about"></Link>
        </div>
        <div className="auth-links">
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
      </div>
    </nav>
  );
}
export default MenuBar;
