import { useState, useEffect } from "react";
import * as workoutService from "../../services/workoutService";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ title: "", date: "", focus: "" });

  // Fetch workouts on mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      const fetchedWorkouts = await workoutService.getWorkouts();
      setWorkouts(fetchedWorkouts);
    };
    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const createdWorkout = await workoutService.createWorkout(newWorkout);
    setWorkouts([...workouts, createdWorkout]);
    setNewWorkout({ title: "", date: "", focus: "" });
  };

  return (
    <div className="dashboard-container">
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

      <div className="workouts-list">
        <h2>Your Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <h3>{workout.title}</h3>
              <p>Date: {workout.date}</p>
              <p>Focus: {workout.focus}</p>
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
