import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div className="content">
        <h1>Bienvenidos a COUNTRIES</h1>
        <Link to="/home">Ingresar</Link>
      </div>

    </>
  );
}
