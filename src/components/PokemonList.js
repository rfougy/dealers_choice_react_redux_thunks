import React, { Component } from "react";
import axios from "axios";

class PokemonList extends Component {
  //PREVIOUS CODE...
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

  render() {
    const pokemonListRender = this.state.pokemonList.map((pokemon) => {
      return (
        <div key={pokemon.id}>
          <h3>{pokemon.name}</h3>
          <h4>{pokemon.element}</h4>
        </div>
      );
    });
    console.log(this.state);
    return (
      <div>
        <h1>LIST</h1>
        {pokemonListRender}
      </div>
    );
  }
}

export default PokemonList;
