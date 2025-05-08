import React, { useState, useEffect } from "react";
import ProgramNameInput     from "./ProgramNameInput";
import AddWorkoutDayButton  from "./AddWorkoutDayButton";
import WorkoutDayCard       from "./WorkoutDayCard";
import { getPrograms }    from "../../services/programService";


const ProgramBuilder = () => {
  const [programName, setProgramName] = useState("");
  const [programs, setPrograms]     = useState([]);

  useEffect(() => {
    getPrograms()
      .then(data => setPrograms(data))
      .catch(err => console.error("Failed to load programs:", err));
  }, []);

  const handleNameChange = (e) => {
    setProgramName(e.target.value);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Program Builder</h2>
  
      {/* Saved programs list */}
      <div style={{ margin: "1rem 0" }}>
        <h3>Your Saved Programs</h3>
        {programs.length === 0 ? (
          <p>No programs yet.</p>
        ) : (
          <ul>
            {programs.map((prog) => (
              <li key={prog._id} style={{ marginBottom: "0.5rem" }}>
                {prog.name}
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Program Name input */}
      <ProgramNameInput value={programName} onChange={handleNameChange} />
  
      {/* Add Workout Day button */}
      <AddWorkoutDayButton onClick={() => {}} />
  
      {/* Placeholder day card */}
      <WorkoutDayCard
        dayName=""
        onDayNameChange={() => {}}
        onAddExercise={() => {}}
      />
    </div>
  );
};

export default ProgramBuilder;
