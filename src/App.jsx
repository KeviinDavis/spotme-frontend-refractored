import { useState, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from './services/authService'; // Updated path

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // Fetch the current user from token

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <Route path="/" element={<Dashboard user={user} />} />
          ) : (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignupForm setUser={setUser} />} />
              <Route path="/signin" element={<SigninForm setUser={setUser} />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} /> {/* Redirect */}
            </>
          )}
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;