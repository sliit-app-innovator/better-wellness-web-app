import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import "../../css/sidebar.css"; 
import { useAuth } from "react-oidc-context";
import { useUser } from "../UserContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [counselorOpen, setCounselorOpen] = useState(false);
  const auth = useAuth();
  const { user } = useUser();

  if (auth.isAuthenticated || true) {

    const userRole = user?.["custom:role"] || "Role not found";
    console.log("User type -->> " + userRole);
    return (
      <div className="flex">
        {/* Sidebar */}
        <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
          {/* Menu Toggle Button */}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4">
            <Menu size={24} />
          </button>
  
          <nav>
            {/* Overview */}
            <NavLink to="/" className="block">
              Home
            </NavLink>

            {/* Show Customer Section ONLY if user type is 'Customer' */}
            {userRole === "Customer" && (
              <div className={`dropdown ${customerOpen ? "open" : ""}`}>
                <button onClick={() => setCustomerOpen(!customerOpen)}>
                  <span>Customer</span>
                  {customerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className="dropdown-content">
                  <NavLink to="/customer/profile">Profile</NavLink>
                  <NavLink to="/customer/new-appointment">New Appointment</NavLink>
                  <NavLink to="/customer/my-appointments">My Appointments</NavLink>
                </div>
              </div>
            )}

            {/* Show Counselor Section ONLY if user type is 'Counsellor' */}
            {userRole === "Counsellor" && (
              <div className={`dropdown ${counselorOpen ? "open" : ""}`}>
                <button onClick={() => setCounselorOpen(!counselorOpen)}>
                  <span>Counselor</span>
                  {counselorOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div className="dropdown-content">
                  <NavLink to="/counselor/profile">Profile</NavLink>
                  <NavLink to="/counselor/set-session">Set Session</NavLink>
                  <NavLink to="/counselor/view-appointments">View Appointments</NavLink>
                </div>
              </div>
            )}
          </nav>
        </div>
  
        {/* Main Content */}
        <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        </div>
      </div>
    );
  }

  // limited menu
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
        {/* Menu Toggle Button */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4">
          <Menu size={24} />
        </button>

        <nav>
          {/* Overview */}
          <NavLink to="/" className="block">
            Home
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
      </div>
    </div>
  );
  
};

export default Sidebar;
