import React from "react";

const AddWorkoutDayButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "block",
      margin: "1rem 0",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
    }}
  >
    + Add Workout Day
  </button>
);

export default AddWorkoutDayButton;
