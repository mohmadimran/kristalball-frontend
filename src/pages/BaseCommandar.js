import React, { useState, useEffect, useCallback } from "react";
import { getTransferItems, getDashbordTransferItem } from "../api/Api";
import { equipmentOptions } from "../constant/Options";

const BaseCommanderDashboard = () => {
  const [transfers, setTransfers] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const [filters, setFilters] = useState({
    equipmentType: "",
    from: "",
    to: "",
  });

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const userBase = localStorage.getItem("userBase") || "Base A";

  // ✅ Fetch Transfers
  const fetchTransfers = useCallback(async (filterParams = {}) => {
    try {
      const response = await getTransferItems(filterParams);
      const data = response.data;

      const baseTransfers = data.filter(
        (transfer) =>
          transfer.fromBase === userBase || transfer.toBase === userBase
      );

      setTransfers(baseTransfers);
    } catch (err) {
      setError(err.message);
    }
  }, [userBase]);

  // ✅ Fetch Dashboard Data
  const fetchDashboardData = useCallback(async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await getDashbordTransferItem(filterParams);
      setDashboardData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ useEffect FIXED
  useEffect(() => {
    if (token) {
      fetchDashboardData();
      fetchTransfers();
    } else {
      setError("No authentication token found");
      setLoading(false);
    }
  }, [token, fetchDashboardData, fetchTransfers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
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
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark">
          <h4>Base Commander Dashboard</h4>
          <small>
            Base: {userBase} | Role: {userRole}
          </small>
        </div>

        <div className="card-body">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "overview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                📊 Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "transfers" ? "active" : ""
                }`}
                onClick={() => setActiveTab("transfers")}
              >
                🔁 Transfers
              </button>
            </li>
          </ul>

          {/* Filters */}
          <div className="card mb-4 p-3">
            <div className="row g-3">
              <div className="col-md-3">
                <select
                  className="form-select"
                  name="equipmentType"
                  value={filters.equipmentType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  {equipmentOptions.map((eq) => (
                    <option key={eq} value={eq}>
                      {eq}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  name="from"
                  value={filters.from}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  name="to"
                  value={filters.to}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="col-md-3">
                <button
                  className="btn btn-warning me-2"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Overview Tab */}
          {activeTab === "overview" && dashboardData && (
            <div className="row text-center mb-4">
              <div className="col-md-3">
                <div className="card border-primary p-3">
                  <h6>Opening</h6>
                  <h4>{dashboardData.openingBalance}</h4>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-success p-3">
                  <h6>Purchases</h6>
                  <h4>+{dashboardData.purchases}</h4>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-info p-3">
                  <h6>Net Movement</h6>
                  <h4>{dashboardData.netMovement}</h4>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-warning p-3">
                  <h6>Closing</h6>
                  <h4>{dashboardData.closingBalance}</h4>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Transfers Tab */}
          {activeTab === "transfers" && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Equipment</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {transfers.length > 0 ? (
                  transfers.map((t) => (
                    <tr key={t._id}>
                      <td>{formatDate(t.date)}</td>
                      <td>{t.equipmentType}</td>
                      <td>{t.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseCommanderDashboard;