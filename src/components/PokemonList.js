import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "../store";

class PokemonList extends Component {
  componentDidMount() {
    console.log("mounting successful");
    this.props.loadPokemon();
  }

  render() {
    console.log("render successful");
    console.log(this.props.pokemonList);
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
  pokemonList: state.pokemonList,
});

export default connect(mapStateToProps, { loadPokemon })(PokemonList);

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
