import React from 'react';
import '../css/App.css';
import Planetarium from './Planetarium';
import PlanetDock from './PlanetDock';

class App extends React.Component {
  constructor() {
    super();
    this.planetarium = React.createRef();
  }

  planetInput = planet => {
    this.planetarium.updatePlanetMaterial(planet);
  };

  setLightIntensity = int => {
    this.planetarium.setLightIntensity(int);
  };

  render() {
    return (
      <div className="App">
        <Planetarium
          ref={r => {
            this.planetarium = r;
          }}
        />
        <PlanetDock
          planetInput={this.planetInput}
          setLightIntensity={this.setLightIntensity}
        />
      </div>
    );
  }
}

export default App;
