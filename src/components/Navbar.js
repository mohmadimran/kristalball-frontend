import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-5" to="/">
        Indian Military 
        </Link>

        {/* Navigation Links - Always Horizontal */}
        <div className="d-flex flex-row gap-2 align-items-center">  
          {role === "Admin" && <> <Link to="/admin">
                <button className="btn btn-success btn-sm">
                  Admin Pannel
                </button>
              </Link></> }    
          {role === "Logistics Officer" && <> <Link to="/logistics">
                <button className="btn btn-success btn-sm">
                  Logistics Pannel
                </button>
              </Link></> }    
          {role === "Base Commander" && <> <Link to="/commander">
                <button className="btn btn-success btn-sm">
Base Commander
                </button>
              </Link></> }    
          {/* Auth Buttons */}
          {role ? (
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/register">
                <button className="btn btn-success btn-sm">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline-light btn-sm">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;