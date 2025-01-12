import { useState, useEffect } from "react";
import * as workoutService from "../../services/workoutService";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ title: "", date: "", focus: "" });
  const [editWorkout, setEditWorkout] = useState(null);

  // Fetch workouts on mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts = await workoutService.getWorkouts();
        setWorkouts(fetchedWorkouts);
      } catch (err) {

      }
    };
    fetchWorkouts();
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

    }
  };

  // Delete a workout
  const handleDelete = async (id) => {
    try {
      await workoutService.deleteWorkout(id);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (err) {
      
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
      
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>

      {/* Create Workout Form */}
      <form onSubmit={handleCreate}>
        <h3>Create Workout</h3>
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
          placeholder="Date"
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
        <button type="submit">Create</button>
      </form>

      {/* Workout List */}
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
              <h4>{workout.title}</h4>
              <p>{workout.date}</p>
              <p>{workout.focus}</p>
              <button onClick={() => setEditWorkout(workout)}>Edit</button>
              <button onClick={() => handleDelete(workout._id)}>Delete</button>
            </li>
          )
        )}
      </ul>
    </main>
  );
};

export default Dashboard;
