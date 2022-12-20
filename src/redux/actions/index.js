import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const GET_ONLY_COUNTRIES = "GET_ONLY_COUNTRIES";
export const GET_TOUR_ACTIVITY = "GET_TOUR_ACTIVITY";
export const ORDER_BY_COUNTRY = "ORDER_BY_COUNTRY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const COUNTRY_BY_ACTIVITY = "COUNTRY_BY_ACTIVITY";

export function getAllCountries() {
  return async function (dispatch) {
    try {
      var jsonData = await axios.get(`${process.env.REACT_APP_URL_LOCAL}/countries`); // despues probar hacerle un .then para no tener que hacer abajo jsonData.data
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: jsonData.data,
      });
    } catch (error) {
      console.log(error); // manejar de forma mas efectiva los errores
    }
  };
}

export function getCountryName(name) {
  return async function (dispatch) {
    try {
      const jsonName = await axios.get(
        `${process.env.REACT_APP_URL_LOCAL}/countries?name=${name}`
      );
      return dispatch({
        type: GET_COUNTRY_NAME,
        payload: jsonName.data,
      });
    } catch (error) {
      console.log(error);
      alert("Country doesn't exist");
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const jsonDetail = await axios.get(
        `${process.env.REACT_APP_URL_LOCAL}/countries/${id}`
      );
      return dispatch({
        type: GET_DETAILS,
        payload: jsonDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOnlyCountries() {
  return async function (dispatch) {
    try {
      const jsonOnlyCountries = await axios.get(
        `${process.env.REACT_APP_URL_LOCAL}/allcountries`
      );
      return dispatch({
        type: GET_ONLY_COUNTRIES,
        payload: jsonOnlyCountries.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTourActivity() {
  return async function (dispatch) {
    try {
      const jsonTourActivity = await axios.get(
        `${process.env.REACT_APP_URL_LOCAL}/touractivity`
      );
      return dispatch({
        type: GET_TOUR_ACTIVITY,
        payload: jsonTourActivity.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderByCountry(payload) {
  return {
    type: ORDER_BY_COUNTRY,
    payload,
  };
}

export function filterCountryByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function filterCountryByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function countryByActivity(payload) {
  return {
    type: COUNTRY_BY_ACTIVITY,
    payload,
  };
}

export function postTourActivity(payload) {
  return async function (dispatch) {
    try {
      var tourAct = await axios.post(
        `${process.env.REACT_APP_URL_LOCAL}/touractivity`,
        payload
      );
      return dispatch({
        type: GET_TOUR_ACTIVITY,
        payload: tourAct.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
