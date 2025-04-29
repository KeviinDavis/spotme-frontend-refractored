// Define the backend URL based on the environment
const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001" // Local backend for development
    : "https://spotme-backend-735859f6cac5.herokuapp.com"; // Heroku backend for production

// Get the current user from the token
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = atob(token.split(".")[1]); 
    return JSON.parse(payload);
  } catch (err) {
    return null; 
  }
};

// Sign up a new user
const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    localStorage.setItem("token", json.token);
    return getUser(); 
  } catch (err) {
    throw err;
  }
};

// Sign in an existing user
const signin = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Check the response status
    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }

    localStorage.setItem("token", json.token);
    return getUser();
  } catch (err) {
    console.error("Error during sign-in:", err);
    throw err;
  }
};

// Sign out the user
const signout = () => {
  localStorage.removeItem("token");
};

export { getUser, signup, signin, signout };
