import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCountryName } from "../../redux/actions";
import "./SearchBar.css";
import logo from "../../assets/logo.png";

export default function SearchBar() {
  const [name, setName] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value); // setName no acepta una funcion de callback como 2do argumento. ej: setName(e.target.value, () => console.log(name)) //react me retó.
    // console.log(name); // TENGO UN PROBLEMA CON LOS ESTADOS ATRASADOS !!!
  };

  useEffect(() => {
    if(name) dispatch(getCountryName(name))
  }, []); // Con esto estoy haciendo que se vayan mostrando los resultados de la búsqueda a medida que se va escribiendo el nombre del país.

  const handleSubmit = (e) => { // lo dejé de utilizar cuando hice la barra de búsqueda del tipo "liveSearch" (ver useEffect de la linea 18)
    e.preventDefault();
    if (!name) {
      alert("Debe escribir el nombre de algún país");
    } else {
      dispatch(getCountryName(name));
    }
  };

  return (
    <>
      <div className="wrap">
        <div className="logo">
          <NavLink to={"/"}>
            <img src={logo} />
          </NavLink>
        </div>
        <div className="search">
          <NavLink to={"/TourActivity"}>
            <input
              className="searchButton"
              type="submit"
              value={"Crear actividad"}
            />
          </NavLink>

          <form>
            <input
              className="searchTerm"
              type="text"
              placeholder="Buscar un país"
              onChange={handleInputChange}
              value={name}
            />
          </form>
        </div>
      </div>
    </>
  );
}
