import React from 'react';
import '../css/App.css';
import Planetarium from './Planetarium';
import PlanetDock from './PlanetDock';

class App extends React.Component {
  constructor() {
    super();
    this.planetarium = React.createRef(null);
    this.state = {
      loadingTexture: true,
    };
  }

  planetInput = (planet) => {
    this.planetarium.updatePlanetMaterial(planet);
  };

  setLightAngle = (int) => {
    this.planetarium.setLightAngle(int);
  };

  setRotationSpeed = (int) => {
    this.planetarium.setRotationSpeed(int);
  };

  flattenEarth = () => {
    this.planetarium.flattenEarth();
  };

  unFlattenEarth = () => {
    this.planetarium.unFlattenEarth();
  };

  render() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 70) this.flattenEarth();
    });
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 70) this.unFlattenEarth();
    });
    return (
      <div tabIndex="0" className="App">
        {this.state.loadingTexture && (
          <div id="loading-overlay">
            <div id="spinner">🌒</div>
          </div>
        )}
        <Planetarium
          onTextuteUpdate={(loading) => {
            this.setState({ ...this.state, loadingTexture: loading });
          }}
          ref={(r) => {
            this.planetarium = r;
          }}
        />
        <PlanetDock
          loadingTexture={this.state.loadingTexture}
          planetInput={this.planetInput}
          setLightAngle={this.setLightAngle}
          setRotationSpeed={this.setRotationSpeed}
        />
      </div>
    );
  }
}

export default App;
