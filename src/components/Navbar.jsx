import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="link-underline-light">
            <p className="navbar-brand" >
                Login
            </p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link className="nav-item link-underline-light" to="/register">
              <p className="nav-link active" aria-current="page" href="/register">
                Register
              </p>
            </Link>
            <Link className="nav-item link-underline-light" to="/about">
              <p className="nav-link">
                About Me
              </p>
            </Link>
            </ul>  
        </div>
      </div>
    </nav>
  );
}
