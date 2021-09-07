import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../store";
import axios from "axios";

class PokemonList extends Component {
  //***Component is not able to retrieve the state from the store
  // PREVIOUS CODE...
  // constructor() {
  //   super();
  //   this.state = {
  //     pokemonList: [],
  //   };
  // }
  //
  // async componentDidMount() {
  //   this.setState({
  //     pokemonList: (await axios.get("/api/pokemon")).data,
  //   });
  //   console.log(this.state.pokemonList);
  // }

  componentDidMount() {
    console.log("mounting successful");
    this.props.loadPokemon();
  }

  render() {
    console.log("render successful");
    console.log(this.state);
    const pokemonListRender = this.props.pokemonList.map((pokemon) => {
      return (
        <div key={pokemon.id}>
          <h3>{pokemon.name}</h3>
          <h4>{pokemon.element}</h4>
        </div>
      );
    });
    return (
      <div>
        <h1>LIST</h1>
        {pokemonListRender}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonList: state.pokemonReducer,
});

export default connect(mapStateToProps, { loadPokemon })(PokemonList);
