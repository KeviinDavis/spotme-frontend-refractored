import React from "react";

const ExerciseRow = ({
  name,
  sets,
  reps,
  weight,
  onExerciseNameChange,
  onSetsChange,
  onRepsChange,
  onWeightChange,
}) => (
  <div
    className="exercise-row"
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: "0.5rem",
      marginBottom: "0.5rem",
    }}
  >
    <input
      name="name"
      placeholder="Exercise"
      value={name}
      onChange={onExerciseNameChange}
      style={{ padding: "0.5rem" }}
    />

    <input
      type="number"
      name="sets"
      placeholder="Sets"
      value={sets}
      onChange={onSetsChange}
      style={{ padding: "0.5rem" }}
    />

    <input
      type="number"
      name="reps"
      placeholder="Reps"
      value={reps}
      onChange={onRepsChange}
      style={{ padding: "0.5rem" }}
    />

    <input
      type="number"
      name="weight"
      placeholder="Weight"
      value={weight}
      onChange={onWeightChange}
      style={{ padding: "0.5rem" }}
    />
  </div>
);

export default ExerciseRow;