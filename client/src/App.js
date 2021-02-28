import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import TicTacToeGame from "./components/tic-tac-toe-game";
import Authorize from "./components/authorize";

class App extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header"></header>
          <Switch>
            <Route exact path="/" component={Authorize} />
            <Route exact path="/tictactoe" component={TicTacToeGame} />
            <Route exact path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
