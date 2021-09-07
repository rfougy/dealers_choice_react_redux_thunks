import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//////////////// CREATING STORE AND REDUCER FUNC ////////////////

const initialState = {
  pokemonList: [],
  selectedPokemon: {},
};
const middleware = [thunk];

const LOAD = "LOAD";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state = { ...state, pokemonList: action.pokemonList };
    case POST:
      state = { ...state, pokemonList: action.pokemon };
    case PUT:
      state = {
        ...state,
        pokemonList: state.pokemonList.map((pokemon) =>
          pokemon.id === action.pokemon.id ? action.grocery : grocery
        ),
      };
    case DELETE:
      state = {
        ...state,
        pokemonList: state.pokemonList.reduce((accum, pokemon) => {
          if (pokemon.id !== action.pokemon.id) accum.push(pokemon);
        }, []),
      };
    default:
      return state;
  }
};

const store = createStore(pokemonReducer(), applyMiddleware(...middleware));

//////////////// CONNECTORS ////////////////

export const loadPokemon = () => async (dispatch) => {
  const pokemonList = (await axios.get("api/pokemon")).data;
  dispatch({
    type: LOAD,
    pokemonList,
  });
};
export const createPokemon = () => async (dispatch) => {
  const newPokemon = (await axios.post("api/pokemon")).data;
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
