import { creatStore } from "redux";

const initialState = {
  pokemonList: [],
};

const store = creatStore((state = initialState, action) => {
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

export default store;
