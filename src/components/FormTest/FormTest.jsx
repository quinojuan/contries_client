import React, { useState } from "react";
import "./FormTest.css";

export default function Form() {
  const [activity, setActivity] = useState("");
  const [difficulty, setDifficulty] = useState("1");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [error, setError] = useState("");

//   function validateUser(value) {
//     console.log(value);
//     console.log(error);
//     if (!/\S+@\S+\.\S/.test(value)) {
//       setError("El usuario tiene que ser un email");
//     } else {
//       setError("");
//     }
//     setUsername(value);
//   }

  return (
    <form>
      <label>Nombre de la actividad:</label>
      <input type="text" placeholder="username" name="username" />
      <label>Dificultad:</label>
      <select>
        <option disable hidden>
          Seleccione
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label>Duración:</label>
      <input type="text" placeholder="Ingrese duración en horas" />
      <label>Temporada:</label>
      <select>
        <option disable hidden>
          Seleccione
        </option>
        <option value="summer">Verano</option>
        <option value="autumn">Otoño</option>
        <option value="winter">Invierno</option>
        <option value="spring">Primavera</option>
      </select>
      <label>Países</label>

      <input type="submit" />
    </form>
  );
}
