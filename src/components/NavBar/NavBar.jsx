import { useContext } from "react";
import { AuthedUserContext } from "../../App";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav>
      {/* Left corner: SpotMe title */}
      <h1>SpotMe</h1>

      {/* Right corner: Welcome message or Logout button */}
      <div className="nav-right">
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
