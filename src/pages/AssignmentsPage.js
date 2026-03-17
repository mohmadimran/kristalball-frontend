import React, { useState, useEffect } from "react";
import { assignedItems } from "../api/Api";
import {baseOptions,equipmentOptions} from "../constant/Options"

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    base: "",
    equipmentType: "",
    assignedTo: ""
  });

  
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await assignedItems(filterParams)
      setAssignments(response.data);
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
    fetchAssignments(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = { base: "", equipmentType: "", assignedTo: "" };
    setFilters(resetFilters);
    fetchAssignments();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-warning" role="status">
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
          <h4 className="mb-0">
            <i className="fas fa-user-check me-2"></i>
            Assignment History
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
                  <label className="form-label">Base</label>
                  <select 
                    className="form-select" 
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
                
                <div className="col-md-3">
                  <label className="form-label">Assigned To</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="assignedTo"
                    value={filters.assignedTo}
                    onChange={handleFilterChange}
                    placeholder="Search personnel..."
                  />
                </div>
                
                <div className="col-md-3 d-flex align-items-end">
                  <div className="d-grid gap-2 d-md-flex">
                    <button className="btn btn-warning flex-fill" onClick={handleApplyFilters}>
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

          {/* Assignments Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Base</th>
                  <th>Equipment Type</th>
                  <th>Quantity</th>
                  <th>Assigned To</th>
                  <th>Assignment ID</th>
                </tr>
              </thead>
              <tbody>
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <tr key={assignment._id}>
                      <td>{formatDate(assignment.date)}</td>
                      <td>
                        <span className="badge bg-primary">{assignment.base}</span>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">{assignment.equipmentType}</span>
                      </td>
                      <td>
                        <span className="fw-bold text-danger">-{assignment.quantity}</span>
                      </td>
                      <td>
                        <span className="fw-bold text-dark">{assignment.assignedTo}</span>
                      </td>
                      <td>
                        <small className="text-muted">{assignment._id}</small>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No assignment records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          {assignments.length > 0 && (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="row">
                <div className="col-md-3">
                  <strong>Total Assignments:</strong> {assignments.length}
                </div>
                <div className="col-md-3">
                  <strong>Total Items Assigned:</strong> {assignments.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div className="col-md-3">
                  <strong>Unique Personnel:</strong> {new Set(assignments.map(a => a.assignedTo)).size}
                </div>
                <div className="col-md-3">
                  <strong>Last Assignment:</strong> {formatDate(assignments[0]?.date)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;