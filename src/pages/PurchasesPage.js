import React, { useState, useEffect } from "react";
import { purchaseItem } from "../api/Api";
import {baseOptions,equipmentOptions} from "../constant/Options"

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    base: "",
    equipmentType: "",
    dateFrom: "",
    dateTo: "",
  });

  
  
  const fetchPurchases = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await purchaseItem(filterParams);
      setPurchases(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    fetchPurchases(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      base: "",
      equipmentType: "",
      dateFrom: "",
      dateTo: "",
    };
    setFilters(resetFilters);
    fetchPurchases();
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
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="fas fa-shopping-cart me-2"></i>
            Purchase History
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
                    {baseOptions.map((base) => (
                      <option key={base} value={base}>
                        {base}
                      </option>
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
                    {equipmentOptions.map((equipment) => (
                      <option key={equipment} value={equipment}>
                        {equipment}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-md-2 d-flex align-items-end">
                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      className="btn btn-primary flex-fill"
                      onClick={handleApplyFilters}
                    >
                      Apply
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

          {/* Purchases Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Base</th>
                  <th>Equipment Type</th>
                  <th>Quantity</th>
                  <th>Purchase ID</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length > 0 ? (
                  purchases.map((purchase) => (
                    <tr key={purchase._id}>
                      <td>{formatDate(purchase.date)}</td>
                      <td>
                        <span className="badge bg-primary">
                          {purchase.base}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {purchase.equipmentType}
                        </span>
                      </td>
                      <td>
                        <span className="fw-bold text-success">
                          +{purchase.quantity}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">{purchase._id}</small>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No purchase records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          {purchases.length > 0 && (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="row">
                <div className="col-md-4">
                  <strong>Total Records:</strong> {purchases.length}
                </div>
                <div className="col-md-4">
                  <strong>Total Quantity:</strong>{" "}
                  {purchases.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div className="col-md-4">
                  <strong>Last Updated:</strong>{" "}
                  {formatDate(purchases[0]?.date)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasesPage;
