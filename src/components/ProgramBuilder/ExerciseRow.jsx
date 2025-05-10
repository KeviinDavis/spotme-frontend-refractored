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
  errorName,
  errorSets,
  errorReps,
  errorWeight,
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
  {/* Name field */}
  <div>
    <input
      name="name"
      value={name}
      onChange={onExerciseNameChange}
      style={{
        width: "100%",
        padding: "0.5rem",
        border: errorName ? "1px solid red" : "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
    {errorName && (
      <p style={{ color: "red", margin: "0.25rem 0" }}>{errorName}</p>
    )}
  </div>

  {/* Sets field */}
  <div>
    <input
      type="number"
      name="sets"
      value={sets}
      onChange={onSetsChange}
      style={{
        width: "100%",
        padding: "0.5rem",
        border: errorSets ? "1px solid red" : "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
    {errorSets && (
      <p style={{ color: "red", margin: "0.25rem 0" }}>{errorSets}</p>
    )}
  </div>

  {/* Reps field */}
  <div>
    <input
      type="number"
      name="reps"
      value={reps}
      onChange={onRepsChange}
      style={{
        width: "100%",
        padding: "0.5rem",
        border: errorReps ? "1px solid red" : "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
    {errorReps && (
      <p style={{ color: "red", margin: "0.25rem 0" }}>{errorReps}</p>
    )}
  </div>

  {/* Weight field */}
  <div>
    <input
      type="number"
      name="weight"
      value={weight}
      onChange={onWeightChange}
      style={{
        width: "100%",
        padding: "0.5rem",
        border: errorWeight ? "1px solid red" : "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
    {errorWeight && (
      <p style={{ color: "red", margin: "0.25rem 0" }}>{errorWeight}</p>
    )}
  </div>
</div>
);

export default ExerciseRow;