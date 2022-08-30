import {
  GET_COUNTRY_NAME,
  GET_ALL_COUNTRIES,
  GET_DETAILS,
  GET_ONLY_COUNTRIES,
  GET_TOUR_ACTIVITY,
  ORDER_BY_COUNTRY,
  FILTER_BY_CONTINENT,
  ORDER_BY_POPULATION,
  COUNTRY_BY_ACTIVITY,
} from "../actions";

const initialState = {
  country: [],
  allcountries: [],
  details: {},
  onlyCountries: [],
  tourActivity: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        country: action.payload,
        allcountries: action.payload,
      };

    case GET_COUNTRY_NAME:
      return {
        ...state,
        country: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case ORDER_BY_COUNTRY:
      // let copyOne = state.allcountries;
      let sortCountries =
        action.payload === "asc"
          ? state.country.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.country.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        country: sortCountries,
      };

    case FILTER_BY_CONTINENT:
      // const copyTwo = state.country;
      const continentFiltered =
        action.payload === "all"
          ? state.allcountries
          : state.allcountries.filter((c) => c.region === action.payload);
      return {
        ...state,
        country: continentFiltered,
      };

    case ORDER_BY_POPULATION:
      // const copyThree = state.country;
      const sortPopulation =
        action.payload === "less"
          ? state.country.sort((a, b) => a.population - b.population)
          : state.country.sort((a, b) => b.population - a.population);
      return {
        ...state,
        country: sortPopulation,
      };

    case GET_ONLY_COUNTRIES:
      return {
        ...state,
        onlyCountries: action.payload,
      };

    case GET_TOUR_ACTIVITY:
      return {
        ...state,
        tourActivity: action.payload, // esto termina guardando todas las actividades que obtengo de la ruta /touractivity desde mi DB (ver el componente home que es el que dispara esto creo)
      };

    case COUNTRY_BY_ACTIVITY:
      const filteredActivity =
        action.payload === "All"
          ? state.allcountries // es correcto consumir del allcountries? porque sino al elegir una activ se me vacía el arreglo y luego no anda
          : state.allcountries.filter((country) =>
              country.Activities.find(
                (activity) => activity.name === action.payload
              )
            );
      return {
        ...state,
        country: filteredActivity,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
