const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Fetch all programs
const getPrograms = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/programs`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

// Create a program
const createProgram = async (program) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/programs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(program),
  });
  return await res.json();
};

// Update a program
const updateProgram = async (id, updatedProgram) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/programs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedProgram),
  });
  return await res.json();
};

// Delete a program
const deleteProgram = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/api/programs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
};
