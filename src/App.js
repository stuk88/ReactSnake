import React, { Component } from 'react';
import Game from './game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Snake</h2>
        </div>
        <Game></Game>
      </div>
    );
  }
}

export default App;
