import React, { useState } from "react";
import "./createaddmission.css";


const AdmissionEnquiryForm = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    note: "",
    date: "",
    followUpDate: "",
    assigned: "",
    reference: "",
    source: "",
    class: "Class 2",
    numberOfChild: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you can send data to API
  };

  return (
    <div className="admission-container">
      <h2 className="admission-title">Admission Enquiry</h2>
      <form className="admission-form-grid" onSubmit={handleSubmit}>
        <div className="admission-form-group">
          <label className="admission-label">Name <span className="admission-required">*</span></label>
          <input className="admission-input" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Phone <span className="admission-required">*</span></label>
          <input className="admission-input" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Email</label>
          <input className="admission-input" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="admission-form-group">
          <label className="admission-label">Address</label>
          <input className="admission-input" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Description</label>
          <input className="admission-input" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Note</label>
          <input className="admission-input" name="note" value={formData.note} onChange={handleChange} />
        </div>

        <div className="admission-form-group">
          <label className="admission-label">Date <span className="admission-required">*</span></label>
          <input className="admission-input" type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Next Follow Up Date <span className="admission-required">*</span></label>
          <input className="admission-input" type="date" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Assigned</label>
          <select className="admission-select" name="assigned" value={formData.assigned} onChange={handleChange}>
            <option value="">Select</option>
          </select>
        </div>

        <div className="admission-form-group">
          <label className="admission-label">Reference</label>
          <select className="admission-select" name="reference" value={formData.reference} onChange={handleChange}>
            <option value="">Select</option>
          </select>
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Source <span className="admission-required">*</span></label>
          <select className="admission-select" name="source" value={formData.source} onChange={handleChange}>
            <option value="">Select</option>
          </select>
        </div>
        <div className="admission-form-group">
          <label className="admission-label">Class</label>
          <select className="admission-select" name="class" value={formData.class} onChange={handleChange}>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
          </select>
        </div>

        <div className="admission-form-group">
          <label className="admission-label">Number Of Child</label>
          <input className="admission-input" type="number" name="numberOfChild" value={formData.numberOfChild} onChange={handleChange} />
        </div>
      </form>

      <div className="admission-form-actions">
        <button className="admission-save-btn" type="submit" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default AdmissionEnquiryForm;
