import React from "react";

const ProgramNameInput = ({ value, onChange }) => (
  <div className="program-name-input" style={{ marginBottom: "1rem" }}>
    <label htmlFor="program-name" style={{ display: "block", marginBottom: "0.5rem" }}>
      Program Name:
    </label>
    <input
      type="text"
      id="program-name"
      name="programName"
      placeholder="Enter program name"
      value={value}
      onChange={onChange}
      style={{ padding: "0.5rem", width: "100%", boxSizing: "border-box" }}
    />
  </div>
);

export default ProgramNameInput;
