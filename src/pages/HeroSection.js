import React from "react";
import { Link} from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section bg-dark text-white">
      <div className="container-fluid">
        <div className="row min-vh-100 align-items-center justify-content-center">
          <div className="col-12 text-center">
            {/* Main Heading */}
            <h1 className="display-3 fw-bold mb-4 px-5">
              Welcome to Military Assets Management System
            </h1>
            
            {/* Subheading */}
            <p className="lead mb-5">
              Efficiently manage, track, and maintain military assets with our comprehensive management system
            </p>
            
            {/* Call to Action Buttons */}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
             <Link to="/login"> <button className="btn btn-primary btn-lg px-4 py-2">
                Get Started
              </button></Link>
             <Link to="/dashboard">
              <button className="btn btn-outline-light btn-lg px-4 py-2">
               Common Dashboard
              </button>
             </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;