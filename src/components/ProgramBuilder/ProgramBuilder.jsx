import React, { useState } from "react";
import ProgramNameInput     from "./ProgramNameInput";
import AddWorkoutDayButton  from "./AddWorkoutDayButton";
import WorkoutDayCard       from "./WorkoutDayCard";

const ProgramBuilder = () => {
  const [programName, setProgramName] = useState("");

  const handleNameChange = (e) => {
    setProgramName(e.target.value);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Program Builder</h2>

      {/* Program Name field */}
      <ProgramNameInput
        value={programName}
        onChange={handleNameChange}
      />

      {/* Add Day button */}
      <AddWorkoutDayButton onClick={() => {}} />

      {/* Single day card placeholder */}
      <WorkoutDayCard
        dayName=""
        onDayNameChange={() => {}}
        onAddExercise={() => {}}
      />

      <p>Your programs will live here.</p>
    </div>
  );
};

export default ProgramBuilder;
