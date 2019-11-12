import React from 'react';
import '../css/PlanetDock.css';

export default class PlanetDock extends React.Component {
  render() {
    return (
      <div className="PlanetDock">
        {/* <div className="dock-planets"> */}
        <div className="dock-planet" />
        <div
          id="mercury"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ☿
        </div>
        <div
          id="venus"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ♀
        </div>
        <div
          id="earth"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ♁
        </div>
        <div
          id="mars"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ♂
        </div>
        <div
          id="jupiter"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ♃
        </div>
        <div
          id="saturn"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ♄
        </div>
        <div
          id="uranus"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ♅
        </div>
        <div
          id="neptune"
          onClick={e => {
            this.props.planetInput(e.target.id);
          }}
          className="dock-planet"
        >
          ♆
        </div>
        <div className="dock-planet" />
        {/* </div> */}
      </div>
    );
  }
}
