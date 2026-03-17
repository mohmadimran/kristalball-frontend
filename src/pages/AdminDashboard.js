import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminModules = [
    {
      title: "🛒 Purchases",
      description: "View purchase history and records",
      path: "/purchases",
      buttonText: "View Purchases",
      variant: "primary"
    },
    {
      title: "🔁 Transfers",
      description: "Monitor asset transfers between bases",
      path: "/transfers",
      buttonText: "View Transfers",
      variant: "info"
    },
    {
      title: "🎯 Assignments",
      description: "Track personnel asset assignments",
      path: "/assignments",
      buttonText: "View Assignments",
      variant: "warning"
    },
    {
      title: "💣 Expenditures",
      description: "Review asset consumption logs",
      path: "/expenditures",
      buttonText: "View Expenditures",
      variant: "danger"
    }
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-dark text-white text-center">
          <h3 className="mb-0">Admin Control Panel</h3>
          <small>Full System Access</small>
        </div>
        
        <div className="card-body">
          <div className="text-center mb-4">
            <p className="lead text-muted">
              Welcome to the Admin Dashboard. Manage all aspects of the Military Asset Management System.
            </p>
          </div>

          <div className="row">
            {adminModules.map((module, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">{module.title}</h5>
                    <p className="card-text text-muted small">{module.description}</p>
                    <button
                      className={`btn btn-${module.variant} btn-sm`}
                      onClick={() => navigate(module.path)}
                    >
                      {module.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <div className="bg-light p-3 rounded">
              <small className="text-muted">
                <i className="fas fa-info-circle me-1"></i>
                You have administrative privileges to access all system modules.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;