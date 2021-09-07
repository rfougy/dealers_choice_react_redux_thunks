import axios from "axios";
import React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import store from "./store";
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

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
