import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import "./Detail.css"

export default function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.details);

  console.log(countryDetail);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]); ////////////////////////////// Si las dejo vacías chilla y si las pongo chilla... no sé //////////////////////////////////

  return (
      <>
        {countryDetail.hasOwnProperty("name") ? (

        <div className="detail">


        <div className="main-container">
          <div className="detail-container">
            
              <img className="detail-flag" src={countryDetail.flag} alt="Flag" />
              <h2>{countryDetail.name}</h2>
              <p><label>Capital: </label><label>{countryDetail.capital}</label></p>
              <p><label>Código: </label><label>{countryDetail.id}</label></p>
              <p><label>Subregion: </label><label>{countryDetail.subregion}</label></p>
              <p><label>Area: </label><label>{countryDetail.area + " km²"}</label></p>
              <p><label>Población: </label><label>{countryDetail.population}</label></p>
          </div>

          <div className="detail-activities-container">
            <h2><i>Actividades: </i></h2>
            <br />
            {countryDetail.Activities?.length > 0 ? (
              countryDetail.Activities.map((act) => (
                <p key={act.id}>
                  <li>Actividad: {act.name}</li>
                  <li>Temporada: {act.season}</li>
                  <li>Duración: {act.duration}</li>
                  <li>Dificultad: {act.difficulty}</li>
                </p>
              ))) : ( <h2>No hay actividades que mostrar por el momento!</h2> )}
          </div>
        </div>
      </div>
        ) : ( <p>Searching...</p> )}

        <div className="detail-a">
          <Link to={"/home"}>⬅ Regresar</Link>
        </div>
    </>
  );
}