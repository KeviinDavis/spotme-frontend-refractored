import React from "react";
import ExerciseRow from "./ExerciseRow";

const WorkoutDayCard = ({ dayName, onDayNameChange, onAddExercise }) => (
  <div
    className="workout-day-card"
    style={{
      border: "1px solid #ccc",
      borderRadius: "6px",
      padding: "1rem",
      marginBottom: "1rem",
    }}
  >
    <input
      type="text"
      placeholder="Day Name (e.g. Day 1 – Chest & Triceps)"
      value={dayName}
      onChange={onDayNameChange}
      style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
    />
    <button onClick={onAddExercise} style={{ marginBottom: "1rem" }}>
      + Add Exercise
    </button>
    {/* Render one ExerciseRow as a placeholder */}
    <ExerciseRow
      setsOptions={[1, 2, 3, 4, 5]}
      repsOptions={[1, 5, 8, 10, 12]}
      onSetsChange={() => {}}
      onRepsChange={() => {}}
      onExerciseNameChange={() => {}}
      onWeightChange={() => {}}
    />
  </div>
);

export default WorkoutDayCard;
