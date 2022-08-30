import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Form from "../FormTest/FormTest";

export default function LandingPage() {
  return (
    <>
      {/* <Form/> */}
      <div className="content">
        <h1>Bienvenidos a COUNTRIES</h1>
        <Link to="/home">Ingresar</Link>
      </div>

    </>
  );
}
