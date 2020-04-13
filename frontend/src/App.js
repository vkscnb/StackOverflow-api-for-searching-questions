import React, { Component } from "react";
import './App.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ShowQuestions from './js/showQuestions'


class App extends Component {

  render() {
    
    return (
      <div className="container mt-3">
        <ShowQuestions />
      </div>
    );
  }
}

export default App;