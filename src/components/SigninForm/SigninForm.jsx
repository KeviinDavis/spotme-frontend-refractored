import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // To show any error messages
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg); // Set error or success messages
  };

  const handleChange = (e) => {
    updateMessage(""); // Clear message on change
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData); // Call signin function
      props.setUser(user); // Set the user in the parent component's state
      navigate("/"); // Redirect to the dashboard after successful login
    } catch (err) {
      updateMessage(err.message || "Failed to log in."); // Handle errors
    }
  };

  return (
    <main>
  <form onSubmit={handleSubmit}>
    <h1>Log In</h1>

    <label htmlFor="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
    />

    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <div className="button-group">
      <button type="submit">Log In</button>
      <button type="button" className="cancel" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  </form>
</main>

  );
};

export default SigninForm;
