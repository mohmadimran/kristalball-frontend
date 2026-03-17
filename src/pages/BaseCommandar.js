import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTransferItems,getDashbordTransferItem } from "../api/Api";
import {equipmentOptions} from "../constant/Options"

const BaseCommanderDashboard = () => {
  const [transfers, setTransfers] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filter states
  const [filters, setFilters] = useState({
    equipmentType: "",
    from: "",
    to: ""
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const userBase = localStorage.getItem("userBase") || "Base A"; 


  // Fetch transfers for the commander's base
  const fetchTransfers = async (filterParams = {}) => {
    try {
     const response = await getTransferItems(filterParams) 
      const data = response.data;
      // Filter transfers to show only those related to commander's base
      const baseTransfers = data.filter(transfer => 
        transfer.fromBase === userBase || transfer.toBase === userBase
      );
      setTransfers(baseTransfers);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch dashboard data for the commander's base
  const fetchDashboardData = async (filterParams = {}) => {
    try {
     const response = await getDashbordTransferItem(filterParams);
      setDashboardData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
      fetchTransfers();
    } else {
      setError("No authentication token found");
      setLoading(false);
    }
  }, [token]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    if (activeTab === "overview") {
      fetchDashboardData(filters);
    } else {
      fetchTransfers(filters);
    }
  };

  const handleResetFilters = () => {
    const resetFilters = { equipmentType: "", from: "", to: "" };
    setFilters(resetFilters);
    if (activeTab === "overview") {
      fetchDashboardData();
    } else {
      fetchTransfers();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
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
      <div className="alert alert-danger">Error: {error}</div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="mb-0">
                <i className="fas fa-user-shield me-2"></i>
                Base Commander Dashboard
              </h4>
              <small className="text-muted">Base: {userBase} | Role: {userRole}</small>
            </div>
            <div className="col-auto">
              <span className="badge bg-dark fs-6">Command View</span>
            </div>
          </div>
        </div>

        <div className="card-body">
          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                📊 Base Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "transfers" ? "active" : ""}`}
                onClick={() => setActiveTab("transfers")}
              >
                🔁 Transfer History
              </button>
            </li>
          </ul>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Equipment Type</label>
                  <select 
                    className="form-select" 
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
                  <label className="form-label">From Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="from"
                    value={filters.from}
                    onChange={handleFilterChange}
                  />
                </div>
                
                <div className="col-md-2">
                  <label className="form-label">To Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="to"
                    value={filters.to}
                    onChange={handleFilterChange}
                  />
                </div>
                
                <div className="col-md-2 d-flex align-items-end">
                  <div className="d-grid gap-2 d-md-flex w-100">
                    <button 
                      className="btn btn-warning flex-fill"
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

                <div className="col-md-3 d-flex align-items-end">
                  <div className="bg-light p-2 rounded text-center w-100">
                    <small className="text-muted">Viewing Data For</small>
                    <div className="fw-bold text-primary">{userBase}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Filter Display */}
          {(filters.equipmentType || filters.from || filters.to) && (
            <div className="alert alert-info mb-4">
              <strong>Current Filters:</strong> 
              {filters.equipmentType && ` Equipment: ${filters.equipmentType}`}
              {filters.from && ` | From: ${filters.from}`}
              {filters.to && ` | To: ${filters.to}`}
            </div>
          )}

          {/* Base Overview Tab */}
          {activeTab === "overview" && dashboardData && (
            <>
              {/* Summary Cards */}
              <div className="row mb-4">
                <div className="col-md-3 mb-3">
                  <div className="card border-primary">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Opening Balance</h6>
                      <h3 className="text-primary">{dashboardData.openingBalance}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card border-success">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Purchases</h6>
                      <h3 className="text-success">+{dashboardData.purchases}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card border-info">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Net Movement</h6>
                      <h3 className="text-info">{dashboardData.netMovement}</h3>
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

              {/* Detailed Metrics */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: "openingBalance", label: "Opening Balance", value: dashboardData.openingBalance, desc: "Initial assets at start period", type: "primary" },
                      { key: "purchases", label: "Purchases", value: `+${dashboardData.purchases}`, desc: "New assets acquired", type: "success" },
                      { key: "transfersIn", label: "Transfers In", value: `+${dashboardData.transfersIn}`, desc: "Assets received from other bases", type: "success" },
                      { key: "transfersOut", label: "Transfers Out", value: `-${dashboardData.transfersOut}`, desc: "Assets sent to other bases", type: "danger" },
                      { key: "assigned", label: "Assigned", value: `-${dashboardData.assigned}`, desc: "Assets assigned to personnel", type: "warning" },
                      { key: "expended", label: "Expended", value: `-${dashboardData.expended}`, desc: "Assets consumed/used", type: "danger" },
                      { key: "closingBalance", label: "Closing Balance", value: dashboardData.closingBalance, desc: "Current assets at end period", type: "warning" }
                    ].map((item, index) => (
                      <tr key={item.key} className={item.key === "closingBalance" ? "table-warning" : ""}>
                        <td><strong>{item.label}</strong></td>
                        <td className={`fw-bold text-${item.type}`}>{item.value}</td>
                        <td>{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Transfers Tab */}
          {activeTab === "transfers" && (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>From Base</th>
                    <th>To Base</th>
                    <th>Equipment Type</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.length > 0 ? (
                    transfers.map((transfer) => (
                      <tr key={transfer._id}>
                        <td>{formatDate(transfer.date)}</td>
                        <td>
                          {transfer.fromBase === userBase ? (
                            <span className="badge bg-danger">Outgoing</span>
                          ) : (
                            <span className="badge bg-success">Incoming</span>
                          )}
                        </td>
                        <td>
                          <span className={transfer.fromBase === userBase ? "fw-bold text-danger" : ""}>
                            {transfer.fromBase}
                          </span>
                        </td>
                        <td>
                          <span className={transfer.toBase === userBase ? "fw-bold text-success" : ""}>
                            {transfer.toBase}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info text-dark">{transfer.equipmentType}</span>
                        </td>
                        <td>
                          <span className="fw-bold">
                            {transfer.fromBase === userBase ? "-" : "+"}{transfer.quantity}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-secondary">Completed</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        No transfer records found for {userBase}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary Section */}
          <div className="card mt-4 border-secondary">
            <div className="card-body">
              <h6 className="card-title text-muted">Base Command Summary</h6>
              <div className="row">
                <div className="col-md-4">
                  <strong>Base:</strong> {userBase}
                </div>
                <div className="col-md-4">
                  <strong>Total Transfers:</strong> {transfers.length}
                </div>
                <div className="col-md-4">
                  <strong>Net Assets:</strong> {dashboardData ? dashboardData.closingBalance : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseCommanderDashboard;