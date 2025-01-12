const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Fetch all workouts
const getWorkouts = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/workouts`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

// Create a workout
const createWorkout = async (workout) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/workouts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workout),
  });
  return await res.json();
};

// Update a workout
const updateWorkout = async (id, updatedWorkout) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/workouts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedWorkout),
  });
  return await res.json();
};

// Delete a workout
const deleteWorkout = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/workouts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export { getWorkouts, createWorkout, updateWorkout, deleteWorkout };
