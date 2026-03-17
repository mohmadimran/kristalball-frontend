import React, { useState, useEffect } from "react";
import { commonDashbordApi } from "../api/Api";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    base: "",
    equipmentType: "",
    from: "",
    to: ""
  });

  //  options for dropdowns
  const baseOptions = ["Base A", "Base B", "Base C", "Headquarters"];
  const equipmentOptions = ["Rifle", "Vehicles", "Ammunition"];
const fetchDashboardData = async (filterParams = {}) => {
  try {
    setLoading(true);
    const res = await commonDashbordApi(filterParams);

    setDashboardData(res.data);
    setError("");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch dashboard data");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    fetchDashboardData(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      base: "",
      equipmentType: "",
      from: "",
      to: ""
    };
    setFilters(resetFilters);
    fetchDashboardData();
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-warning">
        <h2 className="mb-2">Unable to fetch live data from server.</h2>
        <p className="mb-0 small text-muted">
          This is a public dashboard. For real-time data, please log in to the system.
        </p>
      </div>
    </div>
  );

  if (!dashboardData) return (
    <div className="container mt-4">
      <div className="alert alert-warning">No data available</div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="fas fa-tachometer-alt me-2"></i>
            Military Asset Management Dashboard
          </h4>
          <small className="opacity-75">Present Data</small>
        </div>

        <div className="card-body">
          {/* Filter Section */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label htmlFor="base" className="form-label">Base</label>
                  <select
                    className="form-select"
                    id="base"
                    name="base"
                    value={filters.base}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Bases</option>
                    {baseOptions.map(base => (
                      <option key={base} value={base}>{base}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="equipmentType" className="form-label">Equipment Type</label>
                  <select
                    className="form-select"
                    id="equipmentType"
                    name="equipmentType"
                    value={filters.equipmentType}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    {equipmentOptions.map(equipment => (
                      <option key={equipment} value={equipment}>{equipment}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2">
                  <label htmlFor="from" className="form-label">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="from"
                    name="from"
                    value={filters.from}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-md-2">
                  <label htmlFor="to" className="form-label">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="to"
                    name="to"
                    value={filters.to}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-md-2 d-flex align-items-end">
                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      className="btn btn-primary flex-fill"
                      onClick={handleApplyFilters}
                    >
                      Apply Filters
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleResetFilters}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Filter Display */}
          {(filters.base || filters.equipmentType || filters.from || filters.to) && (
            <div className="alert alert-info mb-4">
              <strong>Current Filters:</strong>
              {filters.base && ` Base: ${filters.base}`}
              {filters.equipmentType && ` | Equipment: ${filters.equipmentType}`}
              {filters.from && ` | From: ${filters.from}`}
              {filters.to && ` | To: ${filters.to}`}
            </div>
          )}

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card border-primary">
                <div className="card-body text-center">
                  <h6 className="text-muted">Base</h6>
                  <h4 className="text-primary">{dashboardData.base}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-info">
                <div className="card-body text-center">
                  <h6 className="text-muted">Equipment Type</h6>
                  <h4 className="text-info">{dashboardData.equipmentType}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-success">
                <div className="card-body text-center">
                  <h6 className="text-muted">Opening Balance</h6>
                  <h3 className="text-success">{dashboardData.openingBalance}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-warning">
                <div className="card-body text-center">
                  <h6 className="text-muted">Closing Balance</h6>
                  <h3 className="text-warning">{dashboardData.closingBalance}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Main Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th width="30%">Metric</th>
                  <th width="20%">Value</th>
                  <th width="50%">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "openingBalance", label: "Opening Balance", value: dashboardData.openingBalance, desc: "Initial assets at start period", type: "info" },
                  { key: "purchases", label: "Purchases", value: `+${dashboardData.purchases}`, desc: "New assets acquired", type: "success" },
                  { key: "transfersIn", label: "Transfers In", value: `+${dashboardData.transfersIn}`, desc: "Assets received from other bases", type: "success" },
                  { key: "transfersOut", label: "Transfers Out", value: `-${dashboardData.transfersOut}`, desc: "Assets sent to other bases", type: "danger" },
                  { key: "netMovement", label: "Net Movement", value: dashboardData.netMovement, desc: "Overall asset movement", type: "primary" },
                  { key: "assigned", label: "Assigned", value: `-${dashboardData.assigned}`, desc: "Assets assigned to personnel", type: "warning" },
                  { key: "expended", label: "Expended", value: `-${dashboardData.expended}`, desc: "Assets consumed/used", type: "danger" },
                  { key: "closingBalance", label: "Closing Balance", value: dashboardData.closingBalance, desc: "Current assets at end period", type: "success" }
                ].map((item, index) => (
                  <tr key={item.key} className={item.key === "closingBalance" ? "table-success" : ""}>
                    <td><strong>{item.label}</strong></td>
                    <td className={`fw-bold text-${item.type}`}>{item.value}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Date Range Information */}
          <div className="card mt-4 border-secondary">
            <div className="card-body">
              <h6 className="card-title text-muted">Report Summary</h6>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-1"><strong>Date Range:</strong> {dashboardData.dateRange.from} to {dashboardData.dateRange.to}</p>
                  <p className="mb-1"><strong>Total Growth:</strong> {dashboardData.closingBalance - dashboardData.openingBalance} assets</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1"><strong>Growth Percentage:</strong>
                    {(((dashboardData.closingBalance - dashboardData.openingBalance) / dashboardData.openingBalance) * 100).toFixed(1)}%
                  </p>
                  <p className="mb-0"><strong>Net Movement:</strong> {dashboardData.netMovement} assets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;