import React from "react";
import ExerciseRow from "./ExerciseRow";

const WorkoutDayCard = ({
  dayName,
  onDayNameChange,
  onAddExercise,
  exercises,
  onExerciseNameChange,
  onSetsChange,
  onRepsChange,
  onWeightChange,
}) => (
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

    {/* Render one ExerciseRow per exercise */}
    {exercises.map((ex, exIdx) => (
      <ExerciseRow
        key={exIdx}
        name={ex.name}
        sets={ex.sets}
        reps={ex.reps}
        weight={ex.weight}
        onExerciseNameChange={onExerciseNameChange(exIdx)}
        onSetsChange={onSetsChange(exIdx)}
        onRepsChange={onRepsChange(exIdx)}
        onWeightChange={onWeightChange(exIdx)}
      />
    ))}
  </div>
);

export default WorkoutDayCard;