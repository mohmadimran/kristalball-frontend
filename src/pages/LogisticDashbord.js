import React, { useState } from "react";
import {
  createAssignment,
  createPurchase,
  createTransfer,
  createExpendature,
} from "../api/Api";
import {baseOptions,equipmentOptions} from "../constant/Options"
const LogisticsOfficer = () => {
  const [activeTab, setActiveTab] = useState("purchase");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Form states for different operations
  const [purchaseForm, setPurchaseForm] = useState({
    base: "",
    equipmentType: "",
    quantity: "",
  });

  const [transferForm, setTransferForm] = useState({
    fromBase: "",
    toBase: "",
    equipmentType: "",
    quantity: "",
  });

  const [assignmentForm, setAssignmentForm] = useState({
    base: "",
    equipmentType: "",
    quantity: "",
    assignedTo: "",
  });

  const [expenditureForm, setExpenditureForm] = useState({
    base: "",
    equipmentType: "",
    quantity: "",
    reason: "",
  });

  // Purchase Functions
  const handlePurchaseChange = (e) => {
    const { name, value } = e.target;
    setPurchaseForm((prev) => ({ ...prev, [name]: value }));
  };

  // create purchase
  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createPurchase(purchaseForm);
      setMessage(response.data.message || "purchase created!");
      setPurchaseForm({ base: "", equipmentType: "", quantity: "" });
    } catch (error) {
      setMessage("Error creating purchase", "danger");
    } finally {
      setLoading(false);
    }
  };

  // Transfer Functions
  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await createTransfer(transferForm);
      setMessage(response.data.message || "transfer sucessfull");
      setTransferForm({
        fromBase: "",
        toBase: "",
        equipmentType: "",
        quantity: "",
      });
    } catch (error) {
      setMessage("Error creating transfer", "danger");
    } finally {
      setLoading(false);
    }
  };

  // Assignment Functions
  const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setAssignmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createAssignment(assignmentForm);
      setMessage(response.data.message || "assigment is created sucessfully");
      setAssignmentForm({
        base: "",
        equipmentType: "",
        quantity: "",
        assignedTo: "",
      });
    } catch (error) {
      setMessage("Error creating assignment", "danger");
    } finally {
      setLoading(false);
    }
  };

  // Expenditure Functions
  const handleExpenditureChange = (e) => {
    const { name, value } = e.target;
    setExpenditureForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpenditureSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await createExpendature(expenditureForm);
      setMessage(response.data.message || "expendature created");
      setExpenditureForm({
        base: "",
        equipmentType: "",
        quantity: "",
        reason: "",
      });
    } catch (error) {
      setMessage("Error recording expenditure", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">
            <i className="fas fa-truck me-2"></i>
            Logistics Officer Panel
          </h4>
        </div>

        <div className="card-body">
          {/* Message Alert */}
          {message && (
            <div
              className="alert  alert-dismissible fade show border"
            >
              {message}
              <button
                type="button"
                className="btn-close"
                onClick={() => setMessage("")}
              ></button>
            </div>
          )}

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "purchase" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("purchase")}
              >
                🛒 Create Purchase
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "transfer" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("transfer")}
              >
                🔁 Create Transfer
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "assignment" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("assignment")}
              >
                🎯 Create Assignment
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "expenditure" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("expenditure")}
              >
                💣 Record Expenditure
              </button>
            </li>
          </ul>

          {/* Purchase Form */}
          {activeTab === "purchase" && (
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Create New Purchase</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handlePurchaseSubmit}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="purchaseBase" className="form-label">
                        Base
                      </label>
                      <select
                        className="form-select"
                        id="purchaseBase"
                        name="base"
                        value={purchaseForm.base}
                        onChange={handlePurchaseChange}
                        required
                      >
                        <option value="">Select Base</option>
                        {baseOptions.map((base) => (
                          <option key={base} value={base}>
                            {base}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="purchaseEquipment" className="form-label">
                        Equipment Type
                      </label>
                      <select
                        className="form-select"
                        id="purchaseEquipment"
                        name="equipmentType"
                        value={purchaseForm.equipmentType}
                        onChange={handlePurchaseChange}
                        required
                      >
                        <option value="">Select Equipment</option>
                        {equipmentOptions.map((equipment) => (
                          <option key={equipment} value={equipment}>
                            {equipment}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="purchaseQuantity" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="purchaseQuantity"
                        name="quantity"
                        value={purchaseForm.quantity}
                        onChange={handlePurchaseChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Purchase"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Transfer Form */}
          {activeTab === "transfer" && (
            <div className="card">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Create Asset Transfer</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleTransferSubmit}>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="fromBase" className="form-label">
                        From Base
                      </label>
                      <select
                        className="form-select"
                        id="fromBase"
                        name="fromBase"
                        value={transferForm.fromBase}
                        onChange={handleTransferChange}
                        required
                      >
                        <option value="">Select Source Base</option>
                        {baseOptions.map((base) => (
                          <option key={base} value={base}>
                            {base}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="toBase" className="form-label">
                        To Base
                      </label>
                      <select
                        className="form-select"
                        id="toBase"
                        name="toBase"
                        value={transferForm.toBase}
                        onChange={handleTransferChange}
                        required
                      >
                        <option value="">Select Destination Base</option>
                        {baseOptions.map((base) => (
                          <option key={base} value={base}>
                            {base}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="transferEquipment" className="form-label">
                        Equipment Type
                      </label>
                      <select
                        className="form-select"
                        id="transferEquipment"
                        name="equipmentType"
                        value={transferForm.equipmentType}
                        onChange={handleTransferChange}
                        required
                      >
                        <option value="">Select Equipment</option>
                        {equipmentOptions.map((equipment) => (
                          <option key={equipment} value={equipment}>
                            {equipment}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="transferQuantity" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="transferQuantity"
                        name="quantity"
                        value={transferForm.quantity}
                        onChange={handleTransferChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-info text-white"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Create Transfer"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Assignment Form */}
          {activeTab === "assignment" && (
            <div className="card">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">Create Asset Assignment</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAssignmentSubmit}>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="assignmentBase" className="form-label">
                        Base
                      </label>
                      <select
                        className="form-select"
                        id="assignmentBase"
                        name="base"
                        value={assignmentForm.base}
                        onChange={handleAssignmentChange}
                        required
                      >
                        <option value="">Select Base</option>
                        {baseOptions.map((base) => (
                          <option key={base} value={base}>
                            {base}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label
                        htmlFor="assignmentEquipment"
                        className="form-label"
                      >
                        Equipment Type
                      </label>
                      <select
                        className="form-select"
                        id="assignmentEquipment"
                        name="equipmentType"
                        value={assignmentForm.equipmentType}
                        onChange={handleAssignmentChange}
                        required
                      >
                        <option value="">Select Equipment</option>
                        {equipmentOptions.map((equipment) => (
                          <option key={equipment} value={equipment}>
                            {equipment}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label
                        htmlFor="assignmentQuantity"
                        className="form-label"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="assignmentQuantity"
                        name="quantity"
                        value={assignmentForm.quantity}
                        onChange={handleAssignmentChange}
                        min="1"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="assignedTo" className="form-label">
                        Assigned To
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="assignedTo"
                        name="assignedTo"
                        value={assignmentForm.assignedTo}
                        onChange={handleAssignmentChange}
                        placeholder="e.g., Captain Khan"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-warning"
                      disabled={loading}
                    >
                      {loading ? "Assigning..." : "Create Assignment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Expenditure Form */}
          {activeTab === "expenditure" && (
            <div className="card">
              <div className="card-header bg-danger text-white">
                <h5 className="mb-0">Record Asset Expenditure</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleExpenditureSubmit}>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="expenditureBase" className="form-label">
                        Base
                      </label>
                      <select
                        className="form-select"
                        id="expenditureBase"
                        name="base"
                        value={expenditureForm.base}
                        onChange={handleExpenditureChange}
                        required
                      >
                        <option value="">Select Base</option>
                        {baseOptions.map((base) => (
                          <option key={base} value={base}>
                            {base}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label
                        htmlFor="expenditureEquipment"
                        className="form-label"
                      >
                        Equipment Type
                      </label>
                      <select
                        className="form-select"
                        id="expenditureEquipment"
                        name="equipmentType"
                        value={expenditureForm.equipmentType}
                        onChange={handleExpenditureChange}
                        required
                      >
                        <option value="">Select Equipment</option>
                        {equipmentOptions.map((equipment) => (
                          <option key={equipment} value={equipment}>
                            {equipment}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label
                        htmlFor="expenditureQuantity"
                        className="form-label"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="expenditureQuantity"
                        name="quantity"
                        value={expenditureForm.quantity}
                        onChange={handleExpenditureChange}
                        min="1"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="reason" className="form-label">
                        Reason
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reason"
                        name="reason"
                        value={expenditureForm.reason}
                        onChange={handleExpenditureChange}
                        placeholder="e.g., Training Damage"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-danger"
                      disabled={loading}
                    >
                      {loading ? "Recording..." : "Record Expenditure"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogisticsOfficer;
