import React from "react";
import "./Pages.css";

export default function Pages({ countryByPage, allCountries, showPages, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil( allCountries / countryByPage ); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <button className={currentPage === number ? "active" : ""} onClick={() => showPages(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
