import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postTourActivity, getOnlyCountries } from "../../redux/actions";
import "./TourActivity.css";

function validate(input) {
  let error = {};
  // if (!input.name) error.name = "Se requiere el nombre de la actividad";
  if (!input.name.match(/.*[^ ].*/))
    error.name = "(no se permiten sólo espacios)";
  if (!input.name.match(/^[a-zA-Z\s]*$/) || input.name.length >= 30)
    error.name = "Sólo letras y espacios.(máx. 30 caractéres)";
  if (!input.duration) error.duration = "Se requiere la duración";
  if (!(input.duration <= 24 && input.duration >= 1))
    error.duration = "La duración tiene que ser de un máximo de 24hs";
  if (!input.difficulty)
    error.difficulty = "Se requiere un nivel de dificultad";
  if (!input.season) error.season = "Se requiere una temporada";
  console.log(error);
  return error;
}

export default function TourActivity() {
  const dispatch = useDispatch();
  const onlyCountries = useSelector((state) => state.onlyCountries);

  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });


  useEffect(() => {
    dispatch(getOnlyCountries());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if(!input.country.includes(e.target.value)) { // agregué esta línea para evitar seleccionar dos o más veces el mismo país...
    setInput({
      ...input,
      country: [...input.country, e.target.value]
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )} else {
      return null
    }}

  function handleDelete(el) {
    setInput({
      ...input,
      country: input.country.filter((oc) => oc !== el),
    });
  }

  function handleSubmit(e) {
    dispatch(postTourActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });
    alert("Se creó la actividad");
  }

  return (
    <>
      <div>
        <br />
        <Link className="form-back" to="/home">⬅ Regresar</Link>
      </div>
      <h2 className="form-title">Creación de actividad turística</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="form-create-activity">
        <label className="form-label">Actividad:</label>
        <input
          onChange={(e) => handleChange(e)}
          value={input.name}
          type="text"
          placeholder="ingrese una actividad"
          name="name"
        />
        &nbsp;&nbsp;
        {error.name && (
          <i style={{ display: "inline", color: "red", fontSize: "13px" }}>
            {error.name}
          </i>
        )}
        <br />
        <label className="form-label">Dificultad:</label>
        <select onChange={(e) => handleChange(e)} name="difficulty">
          <option disable hidden>
            Seleccione
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        &nbsp;&nbsp;
        {!input.difficulty && (
          <i style={{ display: "inline", color: "red", fontSize: "13px" }}>
            {error.difficulty}
          </i>
        )}
        <br />
        <label className="form-label">Duración:</label>
        <input
          name="duration"
          type="text"
          placeholder="Cantidad de horas"
          onChange={(e) => handleChange(e)}
        />
        &nbsp;&nbsp;
        {error.duration && (
          <i style={{ display: "inline", color: "red", fontSize: "13px" }}>
            {error.duration}
          </i>
        )}
        <br />
        <label className="form-label">Temporada:</label>
        <select onChange={(e) => handleChange(e)} name="season">
          <option disable hidden>
            Seleccione
          </option>
          <option value="summer">Verano</option>
          <option value="autumn">Otoño</option>
          <option value="winter">Invierno</option>
          <option value="spring">Primavera</option>
        </select>
        &nbsp;&nbsp;
        {!input.season && (
          <i style={{ display: "inline", color: "red", fontSize: "13px" }}>
            {error.season}
          </i>
        )}
        <br />
        <label className="form-label">Países</label>
        <select onChange={(e) => handleSelect(e)}>
          <option disable hidden></option>
          {onlyCountries.map((oc) => (
            <option key={oc.name} value={oc.name}>
              {oc.name}
            </option>
          ))}
        </select>
        
        <br />
        <button
          className="form-button"
          type="submit"
          disabled={
            error.name ||
            error.duration ||
            !input.difficulty ||
            error.duration ||
            !input.season ||
            input.country.length === 0
              ? true
              : false
          }
        >
          CREAR
        </button>
      </form>
      <div className="selected-countries">
      {input.country.map((el, i) => (
          <div className="country" key={i}>
            <label>{el}</label>
            <button onClick={() => handleDelete(el)}>X</button>
          </div>
        ))}
      </div>
      
      <br />
    </>
  );
}
