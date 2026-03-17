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

  const fetchDashboardData = useCallback(async (filterParams = {}) => {
    try {
      const response = await getDashbordTransferItem(filterParams);
      setDashboardData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

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

  if (loading)
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
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
              <small className="text-muted">
                Base: {userBase} | Role: {userRole}
              </small>
            </div>
            <div className="col-auto">
              <span className="badge bg-dark fs-6">Command View</span>
            </div>
          </div>
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
                📊 Base Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "transfers" ? "active" : ""
                }`}
                onClick={() => setActiveTab("transfers")}
              >
                🔁 Transfer History
              </button>
            </li>
          </ul>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body">
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
          </div>

          {/* Transfers Table */}
          {activeTab === "transfers" && (
            <table className="table">
              <tbody>
                {transfers.map((t) => (
                  <tr key={t._id}>
                    <td>{formatDate(t.date)}</td>
                    <td>{t.equipmentType}</td>
                    <td>{t.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseCommanderDashboard;