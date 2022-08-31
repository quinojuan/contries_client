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
      <div className="detail-a">
          <Link to={"/home"}>⬅ Regresar</Link>
        </div>
        {countryDetail.hasOwnProperty("name") ? (

        <div className="detail">


        <div className="main-container">
          <div className="detail-container">
            
              <img className="detail-flag" src={countryDetail.flag} alt="Flag" />
              <h2 className="dtl-h2">{countryDetail.name}</h2>
              <p><label className="detail-label-subtitle">Capital: </label><label>{countryDetail.capital}</label></p>
              <p><label className="detail-label-subtitle">Código: </label><label>{countryDetail.id}</label></p>
              <p><label className="detail-label-subtitle">Subregion: </label><label>{countryDetail.subregion}</label></p>
              <p><label className="detail-label-subtitle">Area: </label><label>{countryDetail.area + " km²"}</label></p>
              <p><label className="detail-label-subtitle">Población: </label><label>{parseInt(countryDetail.population)}</label></p>
          </div>

          <div className="detail-activities-container">
            <h2 className="dtl-h2"><i>Actividades: </i></h2>
            <div className="test" >
              {countryDetail.Activities?.length > 0 ? (
                countryDetail.Activities.map((act) => (
                  <p key={act.id}>
                    <li>Actividad: </li><label>{act.name}</label><br />
                    <li>Temporada: </li><label> {act.season}</label><br />
                    <li>Duración: </li><label> {act.duration}</label><br />
                    <li>Dificultad: </li><label> {act.difficulty}</label><br />
                  </p>
                ))) : ( <h2 className="dtl-h2">No hay actividades que mostrar por el momento!</h2> )}
            </div>
          </div>

        </div>
      </div>
        ) : ( <p>Searching...</p> )}
    </>
  );
}