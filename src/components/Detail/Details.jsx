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
    <div className="detail">
      {countryDetail.hasOwnProperty("name") ? (

        <div className="detail-container">
              <div className="detail-card-container">
                <img src={countryDetail.flag} alt="Flag" />
                <h2>{countryDetail.name}</h2>
                <h3><i>Capital:</i> {countryDetail.capital}</h3>
                <h4><i>Código:</i> {countryDetail.id}</h4>
                <h4><i>Subregion:</i> {countryDetail.subregion}</h4>
                <h4><i>Area:</i> {countryDetail.area + " km²"}</h4>
                <h4><i>Población:</i> {countryDetail.population}</h4>
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
                ))) : ( <h2>No hay actividades que mostrar!</h2> )}
          </div>

        </div>
      ) : (
        <p>Searching...</p>
      )}

      <div>
        <Link to={"/home"}>⬅ Regresar</Link>
      </div>
    </div>
  );
}