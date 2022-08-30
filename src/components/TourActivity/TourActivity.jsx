import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postTourActivity, getOnlyCountries } from "../../redux/actions";
import "./TourActivity.css";

// const [activity, setActivity] = useState("");
//   const [difficulty, setDifficulty] = useState("1");
//   const [duration, setDuration] = useState("");
//   const [season, setSeason] = useState("");
//   const [error, setError] = useState("");

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

  const [error, setError] = useState({
    name: "Se requiere el nombre de la actividad",
    duration: "",
  });

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

  function handleCheck(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      country: [...input.country, e.target.value],
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

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
      <div style={{ backgroundColor: "#faf0e6" }}>
        <h3>Creación de actividad turística</h3>
        <form>
          <div>
            <label>Actividad turística:&nbsp;</label>
            <input
              value={input.name}
              type="text"
              // name="name"
              onChange={(e) => handleChange(e)}
            />
            {/* {error.name && (
              <p style={{ display: "inline", color: "red" }}>{error.name}</p>
            )} */}
            {/* lo anterior es el error que va a aparecer en caso de que haya uno */}
          </div>

          {/* //////////////// ver la manera de ponerle una validacion a este campo porque me crea la actividad igual sin que ponga nada */}
          <div>
            <label>Dificultad:&nbsp;</label>
            |
            <input
              type="radio"
              value="1"
              name="difficulty"
              onChange={(e) => handleChange(e)}
            />
            1|
            <input
              type="radio"
              value="2"
              name="difficulty"
              onChange={(e) => handleChange(e)}
            />
            2|
            <input
              type="radio"
              value="3"
              name="difficulty"
              onChange={(e) => handleChange(e)}
            />
            3|
            <input
              type="radio"
              value="4"
              name="difficulty"
              onChange={(e) => handleChange(e)}
            />
            4|
            <input
              type="radio"
              value="5"
              name="difficulty"
              onChange={(e) => handleChange(e)}
            />
            5|
            {!input.difficulty && (
              <p style={{ display: "inline", color: "red" }}>
                Ingrese una dificultad
              </p>
            )}
            <label>Dificultad:&nbsp;</label>
            <select onChange={(e) => handleChange(e)} name="difficulty">
              <option disable hidden>
                Seleccione
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>

              <option value="4">4</option>
              <option value="5">5</option>
              {input.difficulty === "" && (
                <p style={{ display: "inline", color: "red" }}>
                  Ingrese una dificultad
                </p>
              )}
            </select>
          </div>
          <div>
            <label className="labeled">Duración:&nbsp;</label>
            {/* <input
              type="text"
              name="duration"
              placeholder="Tiempo en horas"
              onChange={(e) => handleChange(e)}
            /> */}
            {/* {error.duration && (
              <p style={{ display: "inline", color: "red" }}>
                {error.duration}
              </p>
            )} */}
          </div>
          <div>
            <label>Temporada:&nbsp;</label>
            <select onChange={(e) => handleCheck(e)}>
              <option disable hidden>
                Temporada
              </option>
              <option value="summer">Verano</option>
              <option value="autumn">Otoño</option>
              <option value="winter">Invierno</option>
              <option value="spring">Primavera</option>
            </select>
          </div>
          <div>
            <label>
              Paises:
              <select onChange={(e) => handleSelect(e)}>
                <option disable hidden></option>
                {onlyCountries.map((oc) => (
                  <option key={oc.name} value={oc.name}>
                    {oc.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* {input.country.map((el) => (
            <div key={el}>
              <h4>{el}</h4>
              <button onClick={() => handleDelete(el)}>X</button>
            </div>
          ))} */}
          <br />
          <div>
            {/* <button
              type="submit"
              disabled={
                error.name || error.duration || !input.difficulty || error.duration || !input.season ? true : false
              }
            >
              Crear
            </button> */}
          </div>
        </form>
        
      </div>

      {/* FORMULARIOOOOOOOOOOOOOOOOOOOOOOOOOO DEFINITIVOOOOOOOO*/}

      <h2>Creación de actividad turística</h2>
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
        {input.country.map((el) => (
            <div key={el}>
              <h4>{el}</h4>
              <button onClick={() => handleDelete(el)}>X</button>
            </div>
          ))}
        <br />
        <button className="form-submit" type="submit"
              disabled={
                error.name || error.duration || !input.difficulty || error.duration || !input.season ? true : false
              }>CREAR</button>
      </form>
      <div className="back">
          <br />
          <Link to="/home">⬅ Regresar</Link>
        </div>
        <br />
    </>
  );
}
