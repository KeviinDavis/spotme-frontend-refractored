import { useState, useEffect } from "react";
import * as workoutService from "../../services/workoutService";
import * as programService from "../../services/programService";  // ← here


const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ title: "", date: "", focus: "" });
  const [editWorkout, setEditWorkout] = useState(null);

  // Fetch workouts on mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      const fetchedWorkouts = await workoutService.getWorkouts();
      setWorkouts(fetchedWorkouts);
    };
    fetchWorkouts();
  }, []);

  useEffect(() => {
    // Fetch workouts...
    const fetchWorkouts = async () => { /* … */ };
    fetchWorkouts();
  
    // Now also fetch programs
    programService.getPrograms()
      .then(data => console.log("Programs:", data))
      .catch(err => console.error("Programs fetch failed:", err));
  }, []);
  
  
  
  // Handle input changes for new workout
  const handleChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  // Create a new workout
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const createdWorkout = await workoutService.createWorkout(newWorkout);
      setWorkouts([...workouts, createdWorkout]);
      setNewWorkout({ title: "", date: "", focus: "" });
    } catch (err) {
      console.error("Failed to create workout:", err);
    }
  };

  // Handle input changes for editing a workout
  const handleEditChange = (e) => {
    setEditWorkout({ ...editWorkout, [e.target.name]: e.target.value });
  };

  // Update a workout
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedWorkout = await workoutService.updateWorkout(editWorkout._id, editWorkout);
      setWorkouts(
        workouts.map((workout) =>
          workout._id === editWorkout._id ? updatedWorkout : workout
        )
      );
      setEditWorkout(null);
    } catch (err) {
      console.error("Failed to update workout:", err);
    }
  };

  // Delete a workout
  const handleDelete = async (id) => {
    try {
      await workoutService.deleteWorkout(id);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (err) {
      console.error("Failed to delete workout:", err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Create Workout Section */}
      <div className="create-workout">
        <form onSubmit={handleCreate}>
          <h2>Create a New Workout</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newWorkout.title}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={newWorkout.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="focus"
            placeholder="Focus"
            value={newWorkout.focus}
            onChange={handleChange}
          />
          <button type="submit">Create Workout</button>
        </form>
      </div>

      {/* Workouts List Section */}
      <div className="workouts-list">
        <h2>Your Workouts</h2>
        <ul>
          {workouts.map((workout) =>
            editWorkout && editWorkout._id === workout._id ? (
              <form key={workout._id} onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="title"
                  value={editWorkout.title}
                  onChange={handleEditChange}
                />
                <input
                  type="date"
                  name="date"
                  value={editWorkout.date}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="focus"
                  value={editWorkout.focus}
                  onChange={handleEditChange}
                />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditWorkout(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <li key={workout._id}>
                <h3>{workout.title}</h3>
                <p>Date: {workout.date}</p>
                <p>Focus: {workout.focus}</p>
                <button onClick={() => setEditWorkout(workout)}>Edit</button>
                <button onClick={() => handleDelete(workout._id)}>Delete</button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
