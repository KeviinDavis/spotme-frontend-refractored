import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // For displaying error/success messages
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg); // Set error or success message
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signup(formData); // Call signup function
      props.setUser(user); // Set the user in the parent component's state
      navigate("/"); // Redirect to dashboard on successful signup
    } catch (err) {
      updateMessage(err.message || "Failed to sign up."); // Handle errors
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf); // Ensure all fields are valid
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="passwordConf">Confirm Password:</label>
          <input
            type="password"
            id="passwordConf"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <Link to="/">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
