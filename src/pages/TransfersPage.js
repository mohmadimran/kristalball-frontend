import React, { useState, useEffect } from "react";
import { transferItems } from "../api/Api";
import {baseOptions,equipmentOptions} from "../constant/Options"

const TransfersPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    fromBase: "",
    toBase: "",
    equipmentType: ""
  });

  
  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async (filterParams = {}) => {
    try {
      setLoading(true);
     const response = await transferItems(filterParams)
      setTransfers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    fetchTransfers(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = { fromBase: "", toBase: "", equipmentType: "" };
    setFilters(resetFilters);
    fetchTransfers();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-info" role="status">
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
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">
            <i className="fas fa-exchange-alt me-2"></i>
            Transfer History
          </h4>
        </div>
        
        <div className="card-body">
          {/* Filters */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">From Base</label>
                  <select 
                    className="form-select" 
                    name="fromBase"
                    value={filters.fromBase}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Bases</option>
                    {baseOptions.map(base => (
                      <option key={base} value={base}>{base}</option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-3">
                  <label className="form-label">To Base</label>
                  <select 
                    className="form-select" 
                    name="toBase"
                    value={filters.toBase}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Bases</option>
                    {baseOptions.map(base => (
                      <option key={base} value={base}>{base}</option>
                    ))}
                  </select>
                </div>
                
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
                
                <div className="col-md-3 d-flex align-items-end">
                  <div className="d-grid gap-2 d-md-flex">
                    <button className="btn btn-info text-white flex-fill" onClick={handleApplyFilters}>
                      Apply
                    </button>
                    <button className="btn btn-outline-secondary" onClick={handleResetFilters}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transfers Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>From Base</th>
                  <th>To Base</th>
                  <th>Equipment Type</th>
                  <th>Quantity</th>
                  <th>Transfer ID</th>
                </tr>
              </thead>
              <tbody>
                {transfers.length > 0 ? (
                  transfers.map((transfer) => (
                    <tr key={transfer._id}>
                      <td>{formatDate(transfer.date)}</td>
                      <td>
                        <span className="badge bg-danger">{transfer.fromBase}</span>
                      </td>
                      <td>
                        <span className="badge bg-success">{transfer.toBase}</span>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">{transfer.equipmentType}</span>
                      </td>
                      <td>
                        <span className="fw-bold text-warning">{transfer.quantity}</span>
                      </td>
                      <td>
                        <small className="text-muted">{transfer._id}</small>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No transfer records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          {transfers.length > 0 && (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="row">
                <div className="col-md-3">
                  <strong>Total Transfers:</strong> {transfers.length}
                </div>
                <div className="col-md-3">
                  <strong>Total Items Moved:</strong> {transfers.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div className="col-md-3">
                  <strong>Unique Bases:</strong> {new Set([...transfers.map(t => t.fromBase), ...transfers.map(t => t.toBase)]).size}
                </div>
                <div className="col-md-3">
                  <strong>Last Transfer:</strong> {formatDate(transfers[0]?.date)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;