import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/Api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    base: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);
      setMessage(res.data.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      setMessage("Error during registration");
    }
  };

  return (
    <div className="container-fluid vh-100 bg-light d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <div className="text-center mb-3">
                <h3 className="card-title fw-bold text-dark mb-1">
                  Create Account
                </h3>
                <p className="text-muted small">
                  Register for Military Asset System
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="name" className="form-label fw-medium small">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="email" className="form-label fw-medium small">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="form-label fw-medium small"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="role" className="form-label fw-medium small">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="Admin">Admin</option>
                    <option value="Base Commander">Base Commander</option>
                    <option value="Logistics Officer">Logistics Officer</option>
                  </select>
                </div>

                {formData.role &&
                  (formData.role === "Base Commander" ||
                    formData.role === "Logistics Officer") && (
                    <div className="mb-3">
                      <label
                        htmlFor="base"
                        className="form-label fw-medium small"
                      >
                        Base Assignment
                      </label>
                      <select
                        id="base"
                        name="base"
                        className="form-select"
                        value={formData.base}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select your base</option>
                        <option value="Base A">Base A</option>
                        <option value="Base B">Base B</option>
                        <option value="Base C">Base C</option>
                        <option value="Headquarters">Headquarters</option>
                      </select>
                    </div>
                  )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-medium mt-2"
                >
                  Create Account
                </button>

                {message && (
                  <div
                    className={`alert ${
                      message.includes("Error")
                        ? "alert-danger"
                        : "alert-success"
                    } text-center mt-3 mb-0 small`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
