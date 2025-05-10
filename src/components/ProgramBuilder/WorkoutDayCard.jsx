import React from "react";
import ExerciseRow from "./ExerciseRow";

const WorkoutDayCard = ({
  dayName,
  onDayNameChange,
  onAddExercise,
  exercises,
  nameError,
  exerciseErrors,
  exerciseErrors,
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
    {/* Day Name input with error styling */}
    <input
      type="text"
      placeholder="Day Name (e.g. Day 1 – Chest & Triceps)"
      value={dayName}
      onChange={onDayNameChange}
      style={{
        width: "100%",
        padding: "0.5rem",
        marginBottom: nameError ? "0.25rem" : "0.5rem",
        border: nameError ? "1px solid red" : "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
    {nameError && (
      <p style={{ color: "red", margin: "0 0 0.5rem" }}>
        {nameError}
      </p>
    )}

    {/* Add Exercise button */}
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
        errorName={exerciseErrors[exIdx]?.name}
        errorSets={exerciseErrors[exIdx]?.sets}
        errorReps={exerciseErrors[exIdx]?.reps}
        errorWeight={exerciseErrors[exIdx]?.weight}
      />
    ))}
  </div>
);

export default WorkoutDayCard;