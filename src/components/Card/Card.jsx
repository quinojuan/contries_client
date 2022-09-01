import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ nameCountry, continent, flag, id }) {
  return (
    <>
      <div className="card">
          <Link to={`Country/${id}`}>
            <img
              src={flag}
              alt="img not found"
              width={"90%"}
              height={"40%"}
            />
          </Link>
          <div>
              <li className="card-li">Nombre: </li><label className="label-li">{nameCountry}</label><br />
              <li className="card-li">Continente: </li><label className="label-li"> {continent}</label><br />
              <li className="card-li">ID: </li><label className="label-li"> {id}</label><br />
          </div>
      </div>
    </>
  );
}
