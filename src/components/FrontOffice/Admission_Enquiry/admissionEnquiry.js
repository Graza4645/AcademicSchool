

// import React, { useState } from "react";
// import {
//   Card,
//   Grid,
//   Select,
//   TextInput,
//   Button,
//   Table,
//   Text,
//   Group,
//   Image,
//   Container,
//   Title,
// } from "@mantine/core";
// import { DateInput } from "@mantine/dates";
// import { IconSearch, IconPlus } from "@tabler/icons-react";
// import dayjs from "dayjs";
// import "./AdmissionEnquiry.css"; // ✅ Import CSS file

// function AdmissionEnquiry() {
//   const [classValue, setClassValue] = useState("Class 1");
//   const [sourceValue, setSourceValue] = useState("Advertisement");
//   const [statusValue, setStatusValue] = useState(null);
//   const [fromDate, setFromDate] = useState(new Date("2025-07-07"));
//   const [toDate, setToDate] = useState(new Date("2025-07-07"));
//   const [searchText, setSearchText] = useState("");

//   return (
//     <Container size="lg" mt="md" className="admission-enquiry-container" id="admission-enquiry">
//       {/* Select Criteria */}
//       <Card shadow="sm" radius="md" p="md" withBorder className="criteria-card" id="criteria-section">
//         <Title order={5} mb="md" className="criteria-title">
//           Select Criteria
//         </Title>
//         <Grid className="criteria-grid">
//           <Grid.Col span={2} className="field-group">
//             <Select
//               label="Class"
//               value={classValue}
//               onChange={setClassValue}
//               data={["Class 1", "Class 2"]}
//               className="dropdown-select"
//               id="class-select"
//             />
//           </Grid.Col>
//           <Grid.Col span={2} className="field-group">
//             <Select
//               label="Source"
//               value={sourceValue}
//               onChange={setSourceValue}
//               data={["Advertisement", "Referral"]}
//               className="dropdown-select"
//               id="source-select"
//             />
//           </Grid.Col>
//           <Grid.Col span={3} className="field-group">
//             <DateInput
//               label={
//                 <>
//                   Enquiry From Date <Text span c="red">*</Text>
//                 </>
//               }
//               value={fromDate}
//               onChange={setFromDate}
//               valueFormat="DD-MM-YYYY"
//               className="date-input"
//               id="from-date"
//             />
//           </Grid.Col>
//           <Grid.Col span={3} className="field-group">
//             <DateInput
//               label={
//                 <>
//                   Enquiry To Date <Text span c="red">*</Text>
//                 </>
//               }
//               value={toDate}
//               onChange={setToDate}
//               valueFormat="DD-MM-YYYY"
//               className="date-input"
//               id="to-date"
//             />
//           </Grid.Col>
//           <Grid.Col span={2} className="field-group">
//             <Select
//               label="Status"
//               placeholder="Select"
//               value={statusValue}
//               onChange={setStatusValue}
//               data={["Open", "Closed", "Pending"]}
//               className="dropdown-select"
//               id="status-select"
//             />
//           </Grid.Col>
//         </Grid>
//         <Group justify="flex-end" mt="md" className="action-buttons">
//           <Button leftSection={<IconSearch size={16} />} color="blue" className="search-button" id="search-button">
//             Search
//           </Button>
//         </Group>
//       </Card>

//       {/* Admission Enquiry Table */}
//       <Card shadow="sm" radius="md" p="md" withBorder mt="md" className="table-card" id="enquiry-table-section">
//         <Group position="apart" mb="md" className="table-header">
//           <Title order={5} id="table-title">Admission Enquiry</Title>
//           <Button
//             leftSection={<IconPlus size={14} />}
//             color="green"
//             size="xs"
//             className="add-button"
//             id="add-button"
//           >
//             Add
//           </Button>
//         </Group>

//         <TextInput
//           placeholder="Search..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.currentTarget.value)}
//           mb="md"
//           className="table-search"
//           id="table-search"
//         />

//         {/* Empty Table */}
//         <Table
//           striped
//           highlightOnHover
//           withBorder
//           withColumnBorders
//           className="enquiry-table"
//           id="enquiry-table"
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
//               <th>NAME ⬆</th>
//               <th>PHONE</th>
//               <th>SOURCE</th>
//               <th>ENQUIRY DATE</th>
//               <th>LAST FOLLOW UP DATE</th>
//               <th>NEXT FOLLOW UP DATE</th>
//               <th>STATUS</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td colSpan={8}>
//                 <Group position="center" mt="sm" mb="sm" className="no-data-group">
//                   <Image
//                     // src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
//                     width={80}
//                     opacity={0.5}
//                     alt="No data"
//                     className="no-data-image"
//                     id="no-data-image"
//                   />
//                   <Text fw={500} id="no-data-text">No data available in table</Text>
//                   <Text fz="sm" c="gray">
//                     <Text component="a" href="#" c="green" td="underline" id="add-link">
//                       ← Add new record or search with different criteria.
//                     </Text>
//                   </Text>
//                 </Group>
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </Card>
//     </Container>
//   );
// }

// export default AdmissionEnquiry;




// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./AdmissionEnquiry.css";

// const formFields = [
//   {
//     id: "name",
//     label: "Full Name",
//     type: "text",
//     position: "left",
//     required: true,
//   },
//   {
//     id: "email",
//     label: "Email",
//     type: "text",
//     position: "right",
//     required: true,
//   },
//   {
//     id: "gender",
//     label: "Gender",
//     type: "dropdown",
//     options: ["Male", "Female", "Other"],
//     position: "left",
//     required: true,
//   },
//   {
//     id: "dob",
//     label: "Date of Birth",
//     type: "date",
//     position: "right",
//     required: true,
//   },
//   {
//     id: "arrivalTime",
//     label: "Arrival Time",
//     type: "time",
//     position: "left",
//     required: true,
//   },
//   {
//     id: "resume",
//     label: "Upload Resume",
//     type: "file",
//     position: "right",
//     required: false,
//   },
// ];

// export default function CustomForm() {
//   const [formData, setFormData] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     const filled = formFields.every(
//       (f) => !f.required || (formData[f.id] && formData[f.id] !== "")
//     );
//     setIsValid(filled);
//   }, [formData]);

//   const handleChange = (id, value) => {
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const renderField = (field) => {
//     const value = formData[field.id] || "";

//     if (field.type === "dropdown") {
//       return (
//         <div className="form-group" id={`group-${field.id}`} key={field.id}>
//           <label htmlFor={field.id} className="form-label">
//             {field.label}
//             {field.required && <span className="required">*</span>}
//           </label>
//           <select
//             id={field.id}
//             className="form-select"
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//           >
//             <option value="">-- Select --</option>
//             {field.options.map((opt, idx) => (
//               <option key={idx} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         </div>
//       );
//     }

//     if (field.type === "date") {
//       return (
//         <div className="form-group" id={`group-${field.id}`} key={field.id}>
//           <label htmlFor={field.id} className="form-label">
//             {field.label}
//             {field.required && <span className="required">*</span>}
//           </label>
//           <DatePicker
//             selected={value ? new Date(value) : null}
//             onChange={(date) => handleChange(field.id, date)}
//             className="form-input"
//             dateFormat="dd-MMM-yyyy"
//             placeholderText="Select date"
//           />
//         </div>
//       );
//     }

//     if (field.type === "time") {
//       return (
//         <div className="form-group" id={`group-${field.id}`} key={field.id}>
//           <label htmlFor={field.id} className="form-label">
//             {field.label}
//             {field.required && <span className="required">*</span>}
//           </label>
//           <input
//             type="time"
//             id={field.id}
//             className="form-input"
//             value={value}
//             onChange={(e) => handleChange(field.id, e.target.value)}
//           />
//         </div>
//       );
//     }

//     if (field.type === "file") {
//       return (
//         <div className="form-group" id={`group-${field.id}`} key={field.id}>
//           <label htmlFor={field.id} className="form-label">
//             {field.label}
//             {field.required && <span className="required">*</span>}
//           </label>
//           <input
//             type="file"
//             id={field.id}
//             className="form-input"
//             onChange={(e) => {
//               const file = e.target.files[0];
//               handleChange(field.id, file?.name || "");
//             }}
//           />
//         </div>
//       );
//     }

//     // Default = text input
//     return (
//       <div className="form-group" id={`group-${field.id}`} key={field.id}>
//         <label htmlFor={field.id} className="form-label">
//           {field.label}
//           {field.required && <span className="required">*</span>}
//         </label>
//         <input
//           type="text"
//           id={field.id}
//           className="form-input"
//           value={value}
//           onChange={(e) => handleChange(field.id, e.target.value)}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="custom-form-wrapper">
//       <h2 className="form-title">Registration Form</h2>
//       <div className="form-layout">
//         <div className="form-left">
//           {formFields.filter((f) => f.position === "left").map(renderField)}
//         </div>
//         <div className="form-right">
//           {formFields.filter((f) => f.position === "right").map(renderField)}
//         </div>
//       </div>
//       <button
//         className="form-submit"
//         disabled={!isValid}
//         onClick={() => alert(JSON.stringify(formData, null, 2))}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }











import React, { useState } from "react";
import "./AdmissionEnquiry.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const AdmissionEnquiry = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    class: "",
    source: "",
    fromDate: new Date(),
    toDate: new Date(),
    status: "",
  });

/**  Starting */
   const formElements = 
   [
  
  { id : 'Std', label : 'Class',type: "dropdown", options: ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11 - Science", "Class 11 - Commerce", "Class 11 - Arts", "Class 12 - Science", "Class 12 - Commerce", "Class 12 - Arts", "B.A.", "B.Sc.", "B.Com.", "B.Tech", "BBA", "BCA", "M.A.", "M.Sc.", "M.Com.", "M.Tech", "MBA", "MCA"], require: true,},
  {id: "Source",label: "Source",type: "dropdown",require: true,options: ["Advertisement", "Online Front Site", "Google Ads", "Admission Campaign", "Front Office", "parents", "Student"]},
  { id: "date", label: "Enquiry From Date", type: "date", position: "left", require: true },
  { id: "date", label: "Enquiry To Date", type: "date", position: "left", require: true },
  { id: "status", label: "Status", type: "dropdown", options: ["All", "Active", "Passive", "Dead", "Won", "Lost"],position: "left", require: true },

]


  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 

  const handleSearch = () => {
    console.log("Search triggered with:", formData);
    // Add fetch logic for admission enquiries based on criteria
  };

  return (
    <div className="admission-enquiry-wrapper">
      <div className="filter-section">
        <h3>Select Criteria</h3>
        <div className="form-row">
         

{formElements.map((item) => {
  const value = formData[item.id] || "";

  if (item.id === "Std" || item.id === "Source" || item.id === "status") {
    return (
      <div key={item.id} className="form-group">
        <label htmlFor={item.id}>
          {item.label}
          {item.require && <span className="required">*</span>}
        </label>
        <select
          id={item.id}
          name={item.id}
          value={value}
          onChange={handleChange}
        >
          <option value="">Select {item.label}</option>
          {item.options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }


if (item.type === "date") {
  const today = new Date();
  const oneYearBack = new Date(today);
  oneYearBack.setFullYear(today.getFullYear() - 1);

  const oneYearAhead = new Date(today);
  oneYearAhead.setFullYear(today.getFullYear() + 1);

  // 📌 Formatter to 15-Aug-2025
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div key={item.id} className="form-group">
      <label htmlFor={item.id}>
        {item.label}
        {item.require && <span className="required">*</span>}
      </label>
      <DatePicker
        id={item.id}
        selected={formData[item.id] ? new Date(formData[item.id]) : null}
        onChange={(date) => {
          const formatted = formatDate(date);
          handleChange(item.id, formatted);
        }}
        minDate={oneYearBack}
        maxDate={oneYearAhead}
        placeholderText="Pick a date"
        dateFormat="dd-MMM-yyyy"
        className="text-input"
      />
    </div>
  );
}


return null;
})}
          <div className="form-group">
            <button onClick={handleSearch} className="search-btn">Search</button>
          </div>
        </div>
      </div>

      <div className="table-section">
        <div className="table-header">
          <h4>Admission Enquiry</h4>
          <input
            type="text"
            placeholder="Search..."            //🔎 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="add-btn"   onClick={() => navigate("/createaddmission")}>create +</button>
        </div>
        <table className="enquiry-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PHONE</th>
              <th>SOURCE</th>
              <th>ENQUIRY DATE</th>
              <th>LAST FOLLOW UP DATE</th>
              <th>NEXT FOLLOW UP DATE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="no-data">
                <div className="no-data-img" />
                <div>No data available in table</div>
                <p>↩ Add new record or search with different criteria.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionEnquiry;
