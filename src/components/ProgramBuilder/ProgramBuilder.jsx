import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProgramNameInput    from "./ProgramNameInput";
import AddWorkoutDayButton from "./AddWorkoutDayButton";
import WorkoutDayCard      from "./WorkoutDayCard";
import { getPrograms, createProgram, updateProgram, deleteProgram,} from "../../services/programService";

const ProgramBuilder = () => {
  //State 
  const [programName, setProgramName]           = useState("");
  const [programs, setPrograms]                 = useState([]);
  const [programDays, setProgramDays]           = useState([]);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [nameError, setNameError]               = useState("");
  const [dayErrors, setDayErrors]               = useState([]);
  const [exerciseErrors, setExerciseErrors] = useState([]);

  // Fetch existing programs on mount
  useEffect(() => {
    getPrograms()
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Failed to load programs:", err));
  }, []);

  // Program name change
  const handleNameChange = (e) => {
    setProgramName(e.target.value);
    if (nameError) setNameError("");
  };

  // Add a new workout day
  const handleAddWorkoutDay = () => {
    setProgramDays([
      ...programDays,
      { name: "", exercises: [{ name: "", sets: "", reps: "", weight: "" }] },
    ]);
    setDayErrors([...dayErrors, ""]);
  };

  // Change a day's name, clearing any existing error
  const handleDayNameChange = (dayIndex) => (e) => {
    const updated = [...programDays];
    updated[dayIndex].name = e.target.value;
    setProgramDays(updated);

    if (dayErrors[dayIndex]) {
      const errs = [...dayErrors];
      errs[dayIndex] = "";
      setDayErrors(errs);
    }
  };

  // Add exercise stub
  const handleAddExercise = (dayIndex) => () => {
    const updated = [...programDays];
    updated[dayIndex].exercises.push({ name: "", sets: "", reps: "", weight: "" });
    setProgramDays(updated);
  };

  // Handle exercise field changes
  const handleExerciseChange = (dayIdx, exIdx, e) => {
    const updated = [...programDays];
    updated[dayIdx].exercises[exIdx][e.target.name] = e.target.value;
    setProgramDays(updated);
  };

  // Click to edit existing program
  const handleEditClick = (prog) => {
    setProgramName(prog.name);
    setProgramDays(prog.days);
    setEditingProgramId(prog._id);
    setDayErrors(prog.days.map(() => "")); // reset day errors
    setNameError("");
  };

  // Create or update program
  const handleSaveProgram = () => {
    // 10.1: Program-name validation
    if (!programName.trim()) {
      setNameError("Program name is required");
      return;
    }

    //Day-level validation
    const errs = programDays.map((day) =>
      day.name.trim() === "" ? "Day name is required" : ""
    );
    if (errs.some((msg) => msg !== "")) {
      setDayErrors(errs);
      return;
    }

    const exErrs = programDays.map(day =>
      day.exercises.map(ex => {
        const err = { name: "", sets: "", reps: "", weight: "" };
        if (!ex.name.trim())               err.name   = "Required";
        if (!ex.sets || +ex.sets <= 0)      err.sets   = "Must be > 0";
        if (!ex.reps || +ex.reps <= 0)      err.reps   = "Must be > 0";
        if (ex.weight === "" || +ex.weight < 0) err.weight = "Must be ≥ 0";
        return err;
      })
    );
      if (exErrs.some(dayArr => dayArr.some(f => Object.values(f).some(msg => msg)))) {
        setExerciseErrors(exErrs);
        return;
    }

    const payload = { name: programName, days: programDays };

    if (editingProgramId) {
      // Update existing
      updateProgram(editingProgramId, payload)
        .then((updated) => {
          setPrograms(
            programs.map((p) => (p._id === editingProgramId ? updated : p))
          );
          // Reset form
          setEditingProgramId(null);
          setProgramName("");
          setProgramDays([]);
          setDayErrors([]);
        })
        .catch((err) => console.error("Failed to update program:", err));
    } else {
      // Create new
      createProgram(payload)
        .then((newProg) => {
          setPrograms([newProg, ...programs]);
          // Reset form
          setProgramName("");
          setProgramDays([]);
          setDayErrors([]);
        })
        .catch((err) => console.error("Failed to save program:", err));
    }
  };

  // Delete a program
  const handleDeleteProgram = (id) => {
    deleteProgram(id)
      .then(() => {
        setPrograms(programs.filter((p) => p._id !== id));
        if (editingProgramId === id) {
          // Clear edit mode if needed
          setEditingProgramId(null);
          setProgramName("");
          setProgramDays([]);
          setDayErrors([]);
        }
      })
      .catch((err) => console.error("Failed to delete program:", err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Back to Dashboard */}
      <div style={{ marginBottom: "1rem" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#007bff",
            fontSize: "0.9rem",
            display: "inline-block",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>

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
              alignItems: "center",
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
      <div
        style={{
          marginBottom: "0.5rem",
          border: nameError ? "1px solid red" : "none",
          borderRadius: "4px",
          padding: "0.25rem",
        }}
      >
        <ProgramNameInput value={programName} onChange={handleNameChange} />
      </div>
      {nameError && (
        <p style={{ color: "red", margin: "0 0 1rem" }}>{nameError}</p>
      )}

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
          nameError={dayErrors[dayIdx] || ""}
          exerciseErrors={exerciseErrors[dayIdx] || []}
          onExerciseNameChange={(exIdx) => (e) =>
            handleExerciseChange(dayIdx, exIdx, e)
          }
          onSetsChange={(exIdx) => (e) =>
            handleExerciseChange(dayIdx, exIdx, e)
          }
          onRepsChange={(exIdx) => (e) =>
            handleExerciseChange(dayIdx, exIdx, e)
          }
          onWeightChange={(exIdx) => (e) =>
            handleExerciseChange(dayIdx, exIdx, e)
          }
        />
      ))}
      

      {/* Save/Update Program button */}
      <button
        onClick={handleSaveProgram}
        disabled={!programName.trim()}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          opacity: !programName.trim() ? 0.5 : 1,
          cursor: !programName.trim() ? "not-allowed" : "pointer",
        }}
      >
        {editingProgramId ? "Update Program" : "Save Program"}
      </button>
    </div>
  );
};

export default ProgramBuilder;