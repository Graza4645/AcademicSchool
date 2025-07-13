import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./createvisitor.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const formElements = [
  { id: "Purpose", label: "Purpose", type: "dropdown", options: ["Marketing", "Parent Teacher Meeting", "Student Meeting", "Staff Meeting", "Principal Meeting"], position: "left", require: true },
  { id: "MeetingWith", label: "Meeting With", type: "dropdown", options: ["Staff", "Student", "Parent"], position: "right", require: true },
  { id: "Staff", label: "Staff", type: "dropdown", options: [], position: "left", require: true },
  { id: "class", label: "Class", type: "dropdown", options: ["10th", "9th", "8th"], position: "left", require: true },
  { id: "section", label: "Section", type: "dropdown", options: ["A", "B", "C"], position: "right", require: true },
  { id: "student", label: "Student", type: "dropdown", options: ["Kallua", "Pandra", "Motka", "Chunnu", "kaliya"], position: "right", require: true },
  { id: "VisitorName", label: "Visitor Name", type: "text", position: "right", require: true },
  { id: "Phone", label: "Phone Number", type: "text", position: "right", require: true },
  { id: "idcard", label: "ID Card", type: "text", position: "left", require: true },
  { id: "Numberperson", label: "Number Of Person", type: "text", position: "right", require: true },
  { id: "date", label: "Date", type: "date", position: "left", require: true },
  { id: "inTime", label: "In Time", type: "time", position: "left", require: true },
  { id: "outTime", label: "Out Time", type: "time", position: "right", require: true },
  { id: "fileUpload", label: "Upload Documents", type: "file", position: "right", require: true },
  { id: "comments", label: "Write comments", type: "text", position: "left", require: true },
];

const generateTimeOptions = () => {
  const options = [];
  for (let h = 9; h <= 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      const value24 = `${hour}:${minute}`;
      const h12 = ((h % 12) || 12).toString();
      const ampm = h < 12 ? "AM" : "PM";
      const label = `${h12}:${minute} ${ampm}`;
      options.push({ value: value24, label });
    }
  }
  return options;
};

export default function CreateVisitorBook() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [staffOptions, setStaffOptions] = useState([]);

  const leftItems = useMemo(() => formElements.filter(item => item.position === "left"), []);
  const rightItems = useMemo(() => formElements.filter(item => item.position === "right"), []);
  const timeOptions = useMemo(() => generateTimeOptions(), []);

  const meetingWith = formData.MeetingWith || "";

  useEffect(() => {
    if (meetingWith === "Staff") {
      fetch("http://localhost:3000/getStaffDetails")
        .then(res => res.json())
        .then(json => {
          const staffList = Array.isArray(json) ? json : json.data;
          Array.isArray(staffList) ? setStaffOptions(staffList) : console.error("Invalid staff data:", json);
        })
        .catch(err => console.error("Error fetching staff list", err));
    }
  }, [meetingWith]);

  const validateField = useCallback((id, value) => {
    const newErrors = { ...errors };
    
    switch (id) {
      case "Phone":
        newErrors.Phone = value.length !== 10 ? "Mobile number should be exactly 10 digits" : parseInt(value[0], 10) < 6 ? "Indian mobile number should start with 6 and above" : "";
        break;
      case "VisitorName":
        newErrors.VisitorName = !/^[A-Za-z\s]+$/.test(value) ? "allows letters and spaces" : "";
        break;
      case "Numberperson":
        const number = parseInt(value, 10);
        newErrors.Numberperson = isNaN(number) || number < 0 || number >= 200 ? "Enter a number between 0 and 199" : "";
        break;
      case "inTime":
        if (formData.outTime && value >= formData.outTime) newErrors.inTime = "In Time must be earlier than Out Time.";
        else newErrors.inTime = "";
        break;
      case "outTime":
        if (formData.inTime && value <= formData.inTime) newErrors.outTime = "Out Time must be later than In Time.";
        else newErrors.outTime = "";
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  }, [errors, formData.inTime, formData.outTime]);

  const handleChange = useCallback((id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    validateField(id, value);
  }, [validateField]);

  const isFormValid = useMemo(() => {
    const requiredFields = formElements.filter(f => f.require);
    const visibleRequiredFields = requiredFields.filter(field => 
      ["class", "section", "student"].includes(field.id) ? meetingWith === "Student" : 
      field.id === "Staff" ? meetingWith === "Staff" : true
    );
    
    const allFilled = visibleRequiredFields.every(f => {
      const value = formData[f.id];
      return value && value.toString().trim() !== "";
    });
    
    const hasErrors = Object.values(errors).some(error => error);
    return allFilled && !hasErrors;
  }, [formData, meetingWith, errors]);

  const handleSubmit = useCallback(async () => {
    try {
      const commonPayload = { purpose: formData.Purpose, meeting_with: formData.MeetingWith, id_card: formData.idcard, date: formData.date, visitor_name: formData.VisitorName, out_time: formData.outTime, phone_number: formData.Phone, comments: formData.comments, number_of_person: formData.Numberperson, in_time: formData.inTime, upload_documents: formData.fileUpload || "" };
      
      const [payload, apiUrl] = formData.MeetingWith === "Staff" 
        ? [{ ...commonPayload, staff: formData.Staff }, "http://localhost:3000/visitorstaff"]
        : formData.MeetingWith === "Student" 
        ? [{ ...commonPayload, class: formData.class, section: formData.section, student: formData.student }, "http://localhost:3000/visitorstudent"]
        : [null, null];

      if (!payload) {
        alert("Unsupported Meeting With type.");
        return;
      }

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Visitor added successfully!");
        setFormData({});
        setErrors({});
      } else {
        alert("Error: " + (data.error || "Failed to add visitor"));
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed.");
    }
  }, [formData]);

  const renderField = useCallback((item) => {
    if ((["class", "section", "student"].includes(item.id) && meetingWith !== "Student") || (item.id === "Staff" && meetingWith !== "Staff")) return null;

    const value = formData[item.id] || "";
    const error = errors[item.id];

    const commonProps = {
      key: item.id,
      id: item.id,
      name: item.id,
      value: item.id === "MeetingWith" ? meetingWith : value,
      onChange: (e) => {
        const val = e.target.value;
        if (item.id === "MeetingWith") handleChange("MeetingWith", val);
        if (item.id === "Staff") {
          const selected = staffOptions.find(s => s.staff_name === val);
          if (selected?.mobile_number) {
            handleChange("Phone", selected.mobile_number);
          }
        }
        if (item.id === "Phone") {
          const cleanVal = val.replace(/\D/g, "");
          handleChange(item.id, cleanVal);
        } else {
          handleChange(item.id, val);
        }
      }
    };

    const renderLabel = () => (
      <label htmlFor={item.id}>
        {item.label}
        {item.require && <span className="required">*</span>}
      </label>
    );

    if (item.type === "dropdown") {
      const options = item.id === "Staff" ? staffOptions : item.options || [];
      return (
        <div key={item.id} className="form-group">
          {renderLabel()}
          <select {...commonProps} className="dropdown">
            <option value="">--Select--</option>
            {options.map((opt, index) => {
              const optValue = item.id === "Staff" ? opt.staff_name : opt;
              return <option key={index} value={optValue}>{optValue}</option>;
            })}
          </select>
          {error && <p className="error">{error}</p>}
        </div>
      );
    }

    if (item.type === "text") {
      return (
        <div key={item.id} className={item.id === "comments" ? "comments-group" : "form-group"}>
          {renderLabel()}
          {item.id === "comments" ? <br /> : null}
          {item.id === "comments" ? (
            <textarea {...commonProps} className="comments" />
          ) : (
            <input {...commonProps} type="text" className="text-input" maxLength={item.id === "Phone" ? 10 : undefined} />
          )}
          {error && <p className="error">{error}</p>}
        </div>
      );
    }

    if (item.type === "date") {
      const today = new Date();
      const oneYearBack = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      const oneYearAhead = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

      return (
        <div key={item.id} className="form-group">
          {renderLabel()}
          <DatePicker
            id={item.id}
            selected={value ? new Date(value) : null}
            onChange={(date) => handleChange(item.id, date)}
            minDate={oneYearBack}
            maxDate={oneYearAhead}
            placeholderText="Pick a date"
            dateFormat="dd-MMM-YYYY"
            className="text-input"
          />
        </div>
      );
    }

    if (item.type === "time") {
      return (
        <div key={item.id} className="form-group">
          {renderLabel()}
          <select {...commonProps} className="dropdown">
            <option value="">-- Select Time --</option>
            {timeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          {error && <p className="error">{error}</p>}
        </div>
      );
    }

    if (item.type === "file") {
      return (
        <div key={item.id} className="form-group">
          {renderLabel()}
          <input
            type="file"
            id={item.id}
            name={item.id}
            className="file"
            onChange={(e) => handleChange(item.id, e.target.files[0]?.name || "")}
          />
        </div>
      );
    }

    return null;
  }, [formData, errors, meetingWith, staffOptions, timeOptions, handleChange]);

  return (
    <>
      <div className="header">Front Office → Visitor Book → Create New Visitor</div>
      <div className="container">
        <div className="left">
          <span className="headline">Create New VisitorBook</span>
          <br /><br />
          {leftItems.map(renderField)}
        </div>
        <div className="right">
          <span className="headlines">Create New VisitorBook</span>
          <br /><br />
          {rightItems.map(renderField)}
          <div>
            <button className="submit" disabled={!isFormValid} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}