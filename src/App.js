import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './component/navigation';
import Logo from './component/Logo';
import Rank from './component/Rank';
import Imagelinkform from './component/Imagelinkform';
import FaceRecogintion from './component/FaceRecogintion';

const particlesOptions = {
  particles: {
    number : {
      value:150,
      destiny: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '5d70736312554420871febd37cccfc83'
 });
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onbuttonsubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
      function(response) {
        console.log(response);
      },
      function(err) {
      // there was an error
      }
    );
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <Imagelinkform
          onInputChange={this.onInputChange} 
          onbuttonsubmit={this.onbuttonsubmit}/>
        <FaceRecogintion imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}


export default App;
