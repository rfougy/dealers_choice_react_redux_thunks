import axios from "axios";
import React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
//Components...
import PokemonList from "./components/PokemonList";
import Form from "./components/Form";

class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <PokemonList />
      </div>
    );
  }
}

render(<App />, document.querySelector("#root"));
