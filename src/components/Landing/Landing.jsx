import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main>
      <h1>Welcome to SpotMe!</h1>
      <p>Track your workouts and progress effortlessly.</p>
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </main>
  );
};

export default Landing;
