import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCountryName } from "../../redux/actions";
import "./SearchBar.css";
import logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchBar() {
  const [wordEntered, setWordEntered] = useState("");

  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
  };

  useEffect(() => {
    if (wordEntered) {
      dispatch(getCountryName(wordEntered));
    }
  }, [wordEntered]);
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
        </div>

        <div style={{display: "flex"}} className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder="Ingrese un país"
              value={wordEntered}
              onChange={handleFilter}
            />
          </div>
            <div className="searchIcon">
              {<SearchIcon />}
            </div>
        </div>
      </div>
    </>
  );
}
