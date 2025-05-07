import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import * as authService from "./services/authService";

import NavBar         from "./components/NavBar/NavBar";
import Landing        from "./components/Landing/Landing";
import Dashboard      from "./components/Dashboard/Dashboard";
import ProgramBuilder from "./components/ProgramBuilder/ProgramBuilder";
import SignupForm     from "./components/SignupForm/SignupForm";
import SigninForm     from "./components/SigninForm/SigninForm";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />

      <Routes>
        {user ? (
          <> {/* wrap multiple routes in a fragment */}
            <Route path="/"         element={<Dashboard />} />
            <Route path="/programs" element={<ProgramBuilder />} />
            {/* catch-all for authenticated users */}
            <Route path="*"         element={<Navigate to="/" replace />} />
          </>
        ) : (
          <> {/* guests can only see landing/signup/signin */}
            <Route path="/"         element={<Landing />} />
            <Route path="/signup"   element={<SignupForm setUser={setUser} />} />
            <Route path="/signin"   element={<SigninForm setUser={setUser} />} />
            {/* protect dashboard and programs for guests */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/programs"  element={<Navigate to="/" replace />} />
            {/* catch-all for guests */}
            <Route path="*"          element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
