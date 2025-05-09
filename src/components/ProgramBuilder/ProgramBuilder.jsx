import React, { useState, useEffect } from "react";
import ProgramNameInput    from "./ProgramNameInput";
import AddWorkoutDayButton from "./AddWorkoutDayButton";
import WorkoutDayCard      from "./WorkoutDayCard";
import { getPrograms, createProgram, updateProgram, deleteProgram } from "../../services/programService";

const ProgramBuilder = () => {
  const [programName, setProgramName] = useState("");
  const [programs, setPrograms]       = useState([]);
  const [programDays, setProgramDays] = useState([]);
  const [editingProgramId, setEditingProgramId] = useState(null);

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

  const handleEditClick = (prog) => {
    setProgramName(prog.name);
    setProgramDays(prog.days);
    setEditingProgramId(prog._id);
  };

  const handleSaveProgram = () => {
    const payload = { name: programName, days: programDays };
    if (editingProgramId) {
      // Update existing
      updateProgram(editingProgramId, payload)
        .then(updated => {
          // Replace it in the list
          setPrograms(programs.map(p => p._id === editingProgramId ? updated : p));
          // Exit edit mode & reset form
          setEditingProgramId(null);
          setProgramName("");
          setProgramDays([]);
        })
        .catch(err => console.error("Failed to update program:", err));
    } else {
      // Create new
      createProgram(payload)
        .then(newProg => {
          setPrograms([newProg, ...programs]);
          setProgramName("");
          setProgramDays([]);
        })
        .catch(err => console.error("Failed to save program:", err));
    }
  };

// Delete a program by ID
const handleDeleteProgram = (id) => {
  deleteProgram(id)
    .then(() => {
      // Remove from local list
      setPrograms(programs.filter(p => p._id !== id));
      // If we were editing it, reset the form
      if (editingProgramId === id) {
        setEditingProgramId(null);
        setProgramName("");
        setProgramDays([]);
      }
    })
    .catch(err => console.error("Failed to delete program:", err));
};

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Program Builder</h2>

      {/* Saved programs list */}
      <ul>
      {programs.map((prog) => (
        <li
          key={prog._id}
          onClick={() => handleEditClick(prog)}
          style={{
            marginBottom: "0.5rem",
            cursor: "pointer",
            fontWeight: editingProgramId === prog._id ? "bold" : "normal",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>{prog.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProgram(prog._id);
            }}
            style={{ marginLeft: "1rem" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>

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
        {editingProgramId ? "Update Program" : "Save Program"}
      </button>
    </div>
  );
};

export default ProgramBuilder;