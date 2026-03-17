import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";
import { loginUser } from "../api/Api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData); 
      const data = res.data; 

      if (data.token) {
        console.log("token and role:", data.role);
        saveAuth(data.token, data.role);
        if (data.role === "Admin") navigate("/admin");
        else if (data.role === "Base Commander") navigate("/commander");
        else navigate("/logistics");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="container-fluid vh-100 bg-light d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <div className="text-center mb-3">
                <h4 className="card-title fw-bold text-dark mb-1">Login</h4>
                <p className="text-muted small">Access your account</p>
              </div>

              <form onSubmit={handleSubmit}>
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

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-medium small">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-medium"
                >
                  Sign In
                </button>

                {message && (
                  <div 
                    className={`alert ${
                      message.includes("failed") || message.includes("Error") 
                        ? "alert-danger" 
                        : "alert-info"
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

export default Login;