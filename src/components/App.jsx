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
    // debugger;
    console.log(planet);
    console.log(this.planetarium);
    this.planetarium.updatePlanetMaterial(planet);
  };

  render() {
    return (
      <div className="App">
        <Planetarium
          ref={r => {
            this.planetarium = r;
          }}
        />
        <PlanetDock planetInput={this.planetInput} />
      </div>
    );
  }
}

export default App;
