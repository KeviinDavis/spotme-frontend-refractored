import React from "react";

const ExerciseRow = ({
  setsOptions,
  repsOptions,
  onExerciseNameChange,
  onSetsChange,
  onRepsChange,
  onWeightChange,
}) => {
  return (
    <div
      className="exercise-row"
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      {/* Exercise name combo-box (datalist empty for now) */}
      <input
        list="exercise-list"
        placeholder="Exercise"
        onChange={onExerciseNameChange}
        style={{ padding: "0.5rem" }}
      />
      <datalist id="exercise-list">
        {/* options will go here later */}
      </datalist>

      {/* Sets combo-box */}
      <input
        list="sets-list"
        placeholder="Sets"
        onChange={onSetsChange}
        onBlur={() => {}}
        style={{ padding: "0.5rem" }}
      />
      <datalist id="sets-list">
        {setsOptions.map(n => (
          <option key={n} value={n} />
        ))}
      </datalist>

      {/* Reps combo-box */}
      <input
        list="reps-list"
        placeholder="Reps"
        onChange={onRepsChange}
        onBlur={() => {}}
        style={{ padding: "0.5rem" }}
      />
      <datalist id="reps-list">
        {repsOptions.map(n => (
          <option key={n} value={n} />
        ))}
      </datalist>

      {/* Weight input */}
      <input
        type="number"
        placeholder="Weight"
        onChange={onWeightChange}
        style={{ padding: "0.5rem" }}
      />
    </div>
  );
};

export default ExerciseRow;
