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
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </div>
          <div>
            <label>Element:</label>
            <br />
            <input
              name="element"
              value={element}
              onChange={(event) =>
                this.setState({ element: event.target.value })
              }
            />
          </div>
          <div>
            <label>Owner:</label>
            <br />
            <input
              name="owner"
              value={owner}
              onChange={(event) => this.setState({ owner: event.target.value })}
            />
          </div>
          <button type="submit" onClick={() => this.props.create(this.state)}>SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default Form;
