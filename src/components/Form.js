import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      element: "",
      owner: "",
    };
  }

  render() {
    const { name, element, owner } = this.state;
    return (
      <div>
        <h1>FORM</h1>
        <form>
          <div>
            <label>Name:</label>
            <br />
            <input
              name="name"
              value={name}
              onChange={(ev) => this.setState({ name: ev.target.value })}
            />
          </div>
          <div>
            <label>Element:</label>
            <br />
            <input
              name="element"
              value={element}
              onChange={(ev) => this.setState({ element: ev.target.value })}
            />
          </div>
          <div>
            <label>Owner:</label>
            <br />
            <input
              name="owner"
              value={owner}
              onChange={(ev) => this.setState({ owner: ev.target.value })}
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default Form;
