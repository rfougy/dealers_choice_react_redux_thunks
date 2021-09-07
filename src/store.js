import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

//////////////// CREATING STORE AND REDUCER FUNC ////////////////

// const initialState = {
//   pokemonList: [],
//   selectedPokemon: {},
// };
const middleware = [thunk];

const LOAD = "LOAD";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const pokemonReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD:
      state = action.pokemonList;
    case POST:
      state = [...state, action.pokemon];
    // case PUT:
    //   state = state.map((pokemon) =>
    //     pokemon.id === action.pokemon.id ? action.pokemon : pokemon
    //   );
    // case DELETE:
    //   state = state.pokemonList.reduce((accum, pokemon) => {
    //     if (pokemon.id !== action.pokemon.id) accum.push(pokemon);
    //   }, []);
    default:
      return state;
  }
};

const allReducers = combineReducers({ pokemonList: pokemonReducer });

const store = createStore(allReducers, applyMiddleware(thunk, logger));

//////////////// ACTION CREATORS ////////////////

export const loadPokemon = () => async (dispatch) => {
  const pokemonList = (await axios.get("api/pokemon")).data;
  dispatch({
    type: LOAD,
    pokemonList,
  });
};
export const createPokemon = () => async (dispatch) => {
  const newPokemon = (await axios.post("api/pokemon/${pokemon.id}")).data;
  dispatch({
    type: POST,
    pokemon: newPokemon,
  });
};
export const updatePokemon = () => async (dispatch) => {
  const updatedPokemon = (await axios.put("api/pokemon/${pokemon.id}")).data;
  dispatch({
    type: PUT,
    pokemon: updatedPokemon,
  });
};
export const deletePokemon = () => async (dispatch) => {
  const deletedPokemon = (await axios.delete("api/pokemon/${pokemon.id}")).data;
  dispatch({
    type: DELETE,
    pokemon: deletedPokemon,
  });
};

export default store;
