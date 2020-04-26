import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './component/navigation';
import Logo from './component/Logo';
import Rank from './component/Rank';
import Imagelinkform from './component/Imagelinkform';
import FaceRecogintion from './component/FaceRecogintion';
import Signin from './component/signin/Signin';
import Register from './component/Register/Register';

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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }
  calcuatefaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
displayFaceBox = (box) => {
  this.setState({box: box});
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
      .then(response => this.displayFaceBox(this.calcuatefaceLocation(response)))
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn,imageUrl, route, box} = this.state ;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route ==='home'
          ? <div>
              <Logo />
              <Rank />
              <Imagelinkform
                onInputChange={this.onInputChange} 
                onbuttonsubmit={this.onbuttonsubmit}/>
              <FaceRecogintion box={box} imageUrl={imageUrl}/>
            </div>
          : (
              this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/> 
          )
        }
      </div>
    );
  }
}


export default App;
