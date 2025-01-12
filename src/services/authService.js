const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Get the current user from the token
const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = atob(token.split(".")[1]); // Decode token payload
    return JSON.parse(payload); // Parse and return the user object
  } catch (err) {
    return null; // Return null if token is invalid
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
    localStorage.setItem("token", json.token); // Save token in local storage
    return getUser(); // Return the current user
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
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    localStorage.setItem("token", json.token); // Save token in local storage
    return getUser(); // Return the current user
  } catch (err) {
    throw err;
  }
};

// Sign out the user
const signout = () => {
  localStorage.removeItem("token"); // Remove token from local storage
};

export { getUser, signup, signin, signout };
