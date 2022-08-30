import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ nameCountry, continent, flag, id, population }) {
  return (
    <>
      <div className="card">
          <Link to={`Country/${id}`}>
            <img
              src={flag}
              alt="img not found"
              width={"150px"}
              height={"100px"}
            />
          </Link>
          <h4>{nameCountry}</h4>
          <h5>{continent}</h5>
          <h5>{population}</h5>
      </div>
    </>
  );
}
