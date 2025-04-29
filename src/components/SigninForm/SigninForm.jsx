import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
 
  const updateMessage = (msg) => {
    setMessage(msg); 
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.setUser(user); 
      navigate("/"); 
    } catch (err) {
      updateMessage(err.message || "Failed to log in."); 
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
