import React, { useState, useEffect } from "react";
import ProgramNameInput    from "./ProgramNameInput";
import AddWorkoutDayButton from "./AddWorkoutDayButton";
import WorkoutDayCard      from "./WorkoutDayCard";
import { getPrograms, createProgram } from "../../services/programService";

const ProgramBuilder = () => {
  const [programName, setProgramName] = useState("");
  const [programs, setPrograms]       = useState([]);
  const [programDays, setProgramDays] = useState([]);

  useEffect(() => {
    getPrograms()
      .then(data => setPrograms(data))
      .catch(err => console.error("Failed to load programs:", err));
  }, []);

  const handleNameChange = (e) => {
    setProgramName(e.target.value);
  };

  const handleAddWorkoutDay = () => {
    setProgramDays([
      ...programDays,
      { name: "", exercises: [{ name: "", sets: "", reps: "", weight: "" }] },
    ]);
  };

  const handleDayNameChange = (dayIndex) => (e) => {
    const updated = [...programDays];
    updated[dayIndex].name = e.target.value;
    setProgramDays(updated);
  };

  const handleAddExercise = (dayIndex) => () => {
    const updated = [...programDays];
    updated[dayIndex].exercises.push({ name: "", sets: "", reps: "", weight: "" });
    setProgramDays(updated);
  };

  const handleExerciseChange = (dayIdx, exIdx, e) => {
    const updated = [...programDays];
    updated[dayIdx].exercises[exIdx][e.target.name] = e.target.value;
    setProgramDays(updated);
  };

  const handleSaveProgram = () => {
    const payload = { name: programName, days: programDays };
    createProgram(payload)
      .then(newProg => {
        setPrograms([newProg, ...programs]);
        setProgramName("");
        setProgramDays([]);
      })
      .catch(err => console.error("Failed to save program:", err));
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
      <AddWorkoutDayButton onClick={handleAddWorkoutDay} />

      {/* Workout Day Cards */}
      {programDays.map((day, dayIdx) => (
        <WorkoutDayCard
          key={dayIdx}
          dayName={day.name}
          onDayNameChange={handleDayNameChange(dayIdx)}
          onAddExercise={handleAddExercise(dayIdx)}
          exercises={day.exercises}
          onExerciseNameChange={(exIdx) => (e) => handleExerciseChange(dayIdx, exIdx, e)}
          onSetsChange={(exIdx) => (e) => handleExerciseChange(dayIdx, exIdx, e)}
          onRepsChange={(exIdx) => (e) => handleExerciseChange(dayIdx, exIdx, e)}
          onWeightChange={(exIdx) => (e) => handleExerciseChange(dayIdx, exIdx, e)}
        />
      ))}

      {/* Save Program */}
      <button
        onClick={handleSaveProgram}
        style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", fontSize: "1rem" }}
      >
        Save Program
      </button>
    </div>
  );
};

export default ProgramBuilder;