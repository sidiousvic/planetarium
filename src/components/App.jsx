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

  setLightAngle = int => {
    this.planetarium.setLightAngle(int);
  };

  setRotationSpeed = int => {
    this.planetarium.setRotationSpeed(int);
  };

  flattenEarth = () => {
    this.planetarium.flattenEarth();
  };

  unFlattenEarth = () => {
    this.planetarium.unFlattenEarth();
  };

  render() {
    // "THE EARTH IS FLAT; ANY FOOL CAN SEE THAT"
    document.addEventListener('keydown', e => {
      if (e.keyCode === 70) this.flattenEarth();
    });
    document.addEventListener('keyup', e => {
      if (e.keyCode === 70) this.unFlattenEarth();
    });
    return (
      <div
        tabIndex="0"
        className="App"
        // onKeyDown={e => {
        //   console.log(e.target);
        // }}
        // onKeyUp={this.unFlattenEarth}
      >
        <Planetarium
          ref={r => {
            this.planetarium = r;
          }}
        />
        <PlanetDock
          planetInput={this.planetInput}
          setLightAngle={this.setLightAngle}
          setRotationSpeed={this.setRotationSpeed}
        />
      </div>
    );
  }
}

export default App;
