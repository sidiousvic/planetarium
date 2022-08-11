import React from 'react';
import '../css/PlanetDock.css';

export default class PlanetDock extends React.Component {
  constructor() {
    super();
    this.state = {
      activePlanet: 'Planets',
    };
  }
  render() {
    return (
      <div
        id="planet-dock"
        onMouseLeave={() => {
          this.setState({ activePlanet: 'Planets' });
        }}
      >
        <div id="planet-dock-top">
          <div id="active-planet">
            <p>
              {this.props.loadingTexture ? 'LOADING' : this.state.activePlanet}
            </p>
          </div>
          <div id="planet-signs">
            <div
              id="mercury"
              onClick={(e) => {
                console.log(this.props.loadingTexture);
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Mercury' });
              }}
              className="dock-planet"
            >
              <p>☿</p>
            </div>
            <div
              id="venus"
              onClick={(e) => {
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Venus' });
              }}
              className="dock-planet"
            >
              <p>♀</p>
            </div>
            <div
              id="earth"
              onClick={(e) => {
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Earth' });
              }}
              className="dock-planet"
            >
              <p>♁</p>
            </div>
            <div
              id="mars"
              onClick={(e) => {
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Mars' });
              }}
              className="dock-planet"
            >
              <p>♂</p>
            </div>
            <div
              id="jupiter"
              onClick={(e) => {
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Jupiter' });
              }}
              className="dock-planet"
            >
              <p>♃</p>
            </div>
            <div
              id="saturn"
              onClick={(e) => {
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Saturn' });
              }}
              className="dock-planet"
            >
              <p>♄</p>
            </div>
            <div
              id="uranus"
              onClick={(e) => {
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Uranus' });
              }}
              className="dock-planet"
            >
              <p>♅</p>
            </div>
            <div
              id="neptune"
              onClick={(e) => {
                this.props.planetInput(e.target.parentElement.id);
              }}
              onMouseOver={() => {
                this.setState({ activePlanet: 'Neptune' });
              }}
              className="dock-planet"
            >
              <p>♆</p>
            </div>
          </div>
        </div>
        <div id="planet-dock-bottom">
          <div className="planet-slider">
            <p className="light-emoji emoji">🌞</p>
            <input
              type="range"
              onChange={(e) => {
                this.props.setLightAngle(e.target.value);
              }}
              min="-2000"
              max="2000"
              defaultValue="200"
              className="slider"
              id="adjustement-slider"
            ></input>
          </div>
          <div className="planet-slider">
            <p className="rotation-emoji emoji">💫</p>
            <input
              type="range"
              onChange={(e) => {
                this.props.setRotationSpeed(e.target.value);
              }}
              min="0"
              max="200"
              defaultValue="10"
              className="slider"
              id="adjustement-slider"
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
