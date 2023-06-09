import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>¡WELCOME APP POKEMON!</h1>
      <Link to="/home">
        <button>Login</button>
      </Link>
    </div>
  );
}
export default LandingPage;
