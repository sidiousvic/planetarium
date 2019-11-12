import React from 'react';
import '../css/PlanetDock.css';

export default class PlanetDock extends React.Component {
  constructor() {
    super();
    this.state = {
      activePlanet: 'Planets'
    };
  }
  render() {
    return (
      <div
        className="PlanetDock"
        onMouseLeave={() => {
          this.setState({ activePlanet: 'Planets' });
        }}
      >
        {/* <div className="dock-planets"> */}
        <div id="title" className="dock-planet">
          <p>{this.state.activePlanet}</p>
        </div>
        <div
          id="mercury"
          onClick={e => {
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
          onClick={e => {
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
          onClick={e => {
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
          onClick={e => {
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
          onClick={e => {
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
          onClick={e => {
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
          onClick={e => {
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
          onClick={e => {
            this.props.planetInput(e.target.parentElement.id);
          }}
          onMouseOver={() => {
            this.setState({ activePlanet: 'Neptune' });
          }}
          className="dock-planet"
        >
          <p>♆</p>
        </div>
        <div className="dock-planet slider">
          <p className="light-emoji emoji">🌞</p>
          <input
            type="range"
            onChange={e => {
              this.props.setLightIntensity(e.target.value);
            }}
            min="0"
            max="200"
            defaultValue="100"
            className="slider"
            id="rotation-speed-slider"
          ></input>{' '}
        </div>
        <div className="dock-planet slider">
          <p className="rotation-emoji emoji">💫</p>
          <input
            type="range"
            onChange={e => {
              this.props.setRotationSpeed(e.target.value);
            }}
            min="0"
            max="1000"
            defaultValue="100"
            className="slider"
            id="rotation-speed-slider"
          ></input>{' '}
        </div>
        {/* </div> */}
      </div>
    );
  }
}
