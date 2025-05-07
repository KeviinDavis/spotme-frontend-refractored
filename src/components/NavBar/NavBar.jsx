import { NavLink } from "react-router-dom";
import { useContext }   from "react";
import { AuthedUserContext } from "../../App";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav>
      <h1>SpotMe</h1>
      <div className="nav-right">
        {user && (
          <NavLink to="/programs" style={{ margin: "0 1rem" }}>
            Programs
          </NavLink>
        )}

        {user ? (
          <>
            <p>Welcome, {user.username}</p>
            <button onClick={handleSignout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <p>Welcome, Guest</p>
        )}
      </div>
    </nav>
  );
};


export default NavBar;
