import React, { useState, useEffect } from "react";
import { expendituresItems } from "../api/Api";
import {baseOptions,equipmentOptions} from "../constant/Options"

const ExpendituresPage = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    base: "",
    equipmentType: "",
    reason: ""
  });

  
  useEffect(() => {
    fetchExpenditures();
  }, []);

  const fetchExpenditures = async (filterParams = {}) => {
    try {
      setLoading(true);
     const response = await expendituresItems(filterParams)
      setExpenditures(response.data);
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
    fetchExpenditures(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = { base: "", equipmentType: "", reason: "" };
    setFilters(resetFilters);
    fetchExpenditures();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-danger" role="status">
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
        <div className="card-header bg-danger text-white">
          <h4 className="mb-0">
            <i className="fas fa-fire me-2"></i>
            Expenditure History
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
                  <label className="form-label">Reason</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="reason"
                    value={filters.reason}
                    onChange={handleFilterChange}
                    placeholder="Search reason..."
                  />
                </div>
                
                <div className="col-md-3 d-flex align-items-end">
                  <div className="d-grid gap-2 d-md-flex">
                    <button className="btn btn-danger flex-fill" onClick={handleApplyFilters}>
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

          {/* Expenditures Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Base</th>
                  <th>Equipment Type</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>Expenditure ID</th>
                </tr>
              </thead>
              <tbody>
                {expenditures.length > 0 ? (
                  expenditures.map((expenditure) => (
                    <tr key={expenditure._id}>
                      <td>{formatDate(expenditure.date)}</td>
                      <td>
                        <span className="badge bg-primary">{expenditure.base}</span>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">{expenditure.equipmentType}</span>
                      </td>
                      <td>
                        <span className="fw-bold text-danger">-{expenditure.quantity}</span>
                      </td>
                      <td>
                        <span className="fst-italic text-muted">"{expenditure.reason}"</span>
                      </td>
                      <td>
                        <small className="text-muted">{expenditure._id}</small>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No expenditure records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          {expenditures.length > 0 && (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="row">
                <div className="col-md-3">
                  <strong>Total Expenditures:</strong> {expenditures.length}
                </div>
                <div className="col-md-3">
                  <strong>Total Items Expended:</strong> {expenditures.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div className="col-md-3">
                  <strong>Unique Reasons:</strong> {new Set(expenditures.map(e => e.reason)).size}
                </div>
                <div className="col-md-3">
                  <strong>Last Expenditure:</strong> {formatDate(expenditures[0]?.date)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpendituresPage;