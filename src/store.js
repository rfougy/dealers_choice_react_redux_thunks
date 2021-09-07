import axios from "axios";
import { createStore, applyMiddleware } from "redux";

//////////////// CREATING STORE AND REDUCER FUNC ////////////////

const initialState = {
  pokemonList: [],
};

const pokemonReducer = (state = initialState, action) => {
  if (action.type === "LOAD") {
    state = { ...state, pokemonList: action.pokemonList };
  }
  if (action.type === "POST") {
    state = { ...state, pokemonList: action.pokemon };
  }
  if (action.type === "PUT") {
    state = {
      ...state,
      pokemonList: state.pokemonList.map((pokemon) =>
        pokemon.id === action.pokemon.id ? action.grocery : grocery
      ),
    };
  }
  if (action.type === "DELETE") {
    state = {
      ...state,
      pokemonList: state.pokemonList.reduce((accum, pokemon) => {
        if (pokemon.id !== action.pokemon.id) accum.push(pokemon);
      }, []),
    };
  }
});

const store = createStore(pokemonReducer(), applyMiddleware());

//////////////// CONNECTORS ////////////////

export const loadPokemon = () => {
  return async (dispatch) => {
    const pokemonList = (await axios.get("api/pokemon")).data;
    dispatch({
      type: "LOAD",
      pokemonList,
    });
  };
};
export const createPokemon = () => {
  return async (dispatch) => {
    const newPokemon = (await axios.post("api/pokemon")).data;
    dispatch({
      type: "POST",
      pokemon: newPokemon,
    });
  };
};
export const updatePokemon = () => {
  return async (dispatch) => {
    const updatedPokemon = (await axios.put("api/pokemon/${pokemon.id}")).data;
    dispatch({
      type: "PUT",
      pokemon: updatedPokemon,
    });
  };
};
export const deletePokemon = () => {
  return async (dispatch) => {
    const deletedPokemon = (await axios.delete("api/pokemon/${pokemon.id}"))
      .data;
    dispatch({
      type: "DELETE",
      pokemon: deletedPokemon,
    });
  };
};

export default store;
