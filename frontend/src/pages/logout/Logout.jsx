import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1>Logout</h1>
        <p className="lead">You have been successfully logged out.</p>{" "}
        
          <Link to="/">Login Here</Link>
        
      </div>
    </div>
  );
};

export default Logout;
