import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  filterCountryByContinent,
  filterCountryByPopulation,
  orderByCountry,
  getTourActivity,
  countryByActivity,
} from "../../redux/actions";

import Card from "../Card/Card";
// import Pages from "../Pages.jsx"
import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";
import Pages from "../Pages/Pages";
import "./Home.css";
import Form from "../FormTest/FormTest";

export default function Home() {
  const dispatch = useDispatch();
  const allcountries = useSelector((state) => state.country);
  const tourActivity = useSelector((state) => state.tourActivity);

  const [currentPage, setCurrentPage] = useState(1);
  const [countryByPage, setCountryByPage] = useState(10);
  const [, setInOrder] = useState("");

  const indexOfLastCountry = currentPage * countryByPage;
  const indexOfFirstCountry = indexOfLastCountry - countryByPage;
  const currentCountry = allcountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // estos useEffect separados los puedo unificar?
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTourActivity());
  }, [dispatch]);

  function handleCleanFilter(e) {
    e.preventDefault();
    dispatch(getAllCountries());
    window.location.reload();
  }

  function handleFilterContinent(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterCountryByContinent(e.target.value));
    setInOrder(`Ordenado ${e.target.value}`);
  }

  function showPages(pageNumber) {
    return setCurrentPage(pageNumber);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByCountry(e.target.value));
    setCurrentPage(1);
    setInOrder(`Ordenado ${e.target.value}`);
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(filterCountryByPopulation(e.target.value));
    setCurrentPage(1);
    setInOrder(`Ordenado ${e.target.value}`);
  }

  function handleCountryActivity(e) {
    e.preventDefault();
    dispatch(countryByActivity(e.target.value));
    setCurrentPage(1);
    setInOrder(`Ordenado ${e.target.value}`);
  }
  return (
    <div>
      <SearchBar />
      <div className="filter-wrap">
        <h2 className="filter-title">FILTRADOS:</h2>

        <select className="filter" onChange={(e) => handleFilterContinent(e)}>
          <option value="all">Todos los continentes</option>
          <option value="Africa">África</option>
          <option value="Americas">América</option>
          <option value="Antarctic">Antártica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>

        <select className="filter" onChange={(e) => handleCountryActivity(e)}>
          <option value={"All"}>Todas las actividades</option>
          {tourActivity.length > 0 ? (
            tourActivity.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))
          ) : (
            <option>No hay actividades</option>
          )}
        </select>
        <button className="btn" onClick={(e) => handleCleanFilter(e)}>
          Limpiar filtro
        </button>
      </div>
      <div className="filter-wrap">
        <h2 className="filter-title">ORDENAMIENTOS:</h2>
        <select className="filter" onChange={(e) => handleSort(e)}>
          <option value={null}>Órden alfabético</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
        <select
          className="filter"
          onChange={(e) => {
            handleSortPopulation(e);
          }}
        >
          <option>Población</option>
          <option value={"less"}>Menor población</option>
          <option value={"more"}>Mayor población</option>
        </select>
      </div>

      {/* <div>
        <button>ANTERIORES</button>
        <button onClick={() => proxPagina}>SIGUIENTES</button>

        {array.map((c) => {
          return <Card key={c.id} nameCountry={c.name} flag={c.flag} />;
        })}
      </div> */}

      <div>
        <Pages
          countryByPage={countryByPage}
          allCountries={allcountries.length}
          showPages={showPages}
        />
      </div>
      <div className="card-container">
        {currentCountry?.map((c) => {
          return (
            <Card
              key={c.id}
              nameCountry={c.name}
              continent={c.region}
              population={c.population}
              flag={c.flag}
              id={c.id}
            />
          );
        })}
      </div>
    </div>
  );
}
