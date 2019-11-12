// import * as VSkull from './assets/3D/vsskull.obj';
import OrbitControls from 'orbit-controls-es6';
import React, { Component } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three-obj-mtl-loader';
import textures from '../assets/3D/textures/planetTextures';
const milkyWayBackground = require('../assets/3D/textures/milkyway.jpg');

class Planetarium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlanet: 'mars',
      renderer: {
        gamma: {
          gammaFactor: 1.8,
          gammaOutput: true,
          gammaInput: true
        }
      },
      controls: {
        max: 100,
        min: 20
      },
      camera: {
        fov: 35,
        near: 0.1,
        far: 100,
        position: { x: 0, y: 0, z: 40 },
        rotation: {}
      },
      light: {
        position: { x: 0.1, y: 0.4, z: 0.3 },
        intensity: 1
      },
      materials: {
        mercury: {
          texture: textures.mercury.texture,
          bumpMap: textures.mercury.bumpMap,
          bumpScale: 0.1
        },
        venus: {
          texture: textures.venus.texture
        },
        earth: {
          texture: textures.earth.texture,
          bumpMap: textures.earth.bumpMap,
          bumpScale: 0.03
        },
        mars: {
          texture: textures.mars.texture,
          bumpMap: textures.mars.texture,
          bumpScale: 0.05
        },
        jupiter: {
          texture: textures.jupiter.texture
        },
        saturn: {
          texture: textures.saturn.texture
        },
        uranus: {
          texture: textures.uranus.texture
        },
        neptune: {
          texture: textures.neptune.texture
          // bumpMap: textures.neptune.bumpMap
        }
      },
      activeBackground: 'milkyWay',
      backgrounds: {
        milkyWay: milkyWayBackground
      }
    };
  }

  createScene = color => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(color);
    if (this.state.activeBackground) {
      const background = this.state.backgrounds[this.state.activeBackground];
      this.scene.background = new THREE.TextureLoader().load(background);
    }
  };

  createCamera = (fov, aspect, near, far, pos) => {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(pos.x, pos.y, pos.z);
    this.camera.rotateOnAxis(new THREE.Vector3(0, 100, 0));
  };

  addControls = (max, min) => {
    const controls = new OrbitControls(this.camera, this.mount);
    controls.enabled = true;
    controls.maxDistance = max;
    controls.minDistance = min;
  };

  createRenderer = (width, height, gamma) => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // this.renderer.setClearColor(0x000000, 0);
    this.renderer.gammaFactor = gamma.gammaFactor;
    this.renderer.gammaOutput = gamma.gammaOutput;
    this.renderer.gammaInput = gamma.gammaInput;
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
  };

  createPlanet = () => {
    const geometry = new THREE.SphereBufferGeometry(10, 100, 100);
    this.sphere = new THREE.Mesh(geometry);
    this.sphere.rotation.set(0, 0, 0.1);
    this.scene.add(this.sphere);
  };

  updatePlanetMaterial = planet => {
    if (!this.state.materials[planet]) return;
    const texture = this.state.materials[planet].texture;
    const bumpMap = this.state.materials[planet].bumpMap;
    let material = new THREE.MeshPhongMaterial();
    const planetTexture = new THREE.TextureLoader().load(texture, () => {
      console.log('Texture loaded');
    });
    planetTexture.anisotropy = this.renderer.getMaxAnisotropy();
    material.map = planetTexture;
    material.bumpMap = new THREE.TextureLoader().load(bumpMap, () => {
      console.log('Bump map loaded');
    });
    material.bumpScale = this.state.materials[planet].bumpScale;
    this.sphere.material = material;
  };

  updateSceneBackground = (color, background) => {
    if (color) this.scene.background = new THREE.Color(color);
    if (background)
      this.scene.background = new THREE.TextureLoader().load(
        this.state.background[background]
      );
  };

  addLights(color, intensity, position) {
    this.light = new THREE.DirectionalLight(color, intensity);
    this.light.position.set(position.y, position.x, position.z);
    this.scene.add(this.light);
    this.start();
  }

  setLightIntensity = int => {
    console.log('lol');
    this.light.intensity = int;
  };

  // LIFECYCLE METHODS
  componentDidMount() {
    // SET RENDER SIZES
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    const aspect = width / height;
    // CREATE SCENE
    this.createScene(0x000000, 'milkyWay');
    // CREATE CAMERA
    this.createCamera(
      this.state.fov,
      aspect,
      this.state.near,
      this.state.far,
      this.state.camera.position
    );
    // ADD CONTROLS
    this.addControls(this.state.controls.max, this.state.controls.min);
    // ADD RENDERER
    this.createRenderer(width, height, this.state.renderer.gamma);

    // CREATE PLANET
    this.createPlanet();
    // UPDATE PLANET MATERIAL
    this.updatePlanetMaterial(this.state.activePlanet);
    //ADD LIGHTS
    this.addLights(
      'white',
      this.state.light.intensity,
      this.state.light.position
    );
    // LOAD OBJ this.loadObject(VSkull, 'skull');
  }

  componentDidUpdate() {
    this.updatePlanetMaterial(this.state.activePlanet);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  // UTILITY FUNCTIONS
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
    window.addEventListener('resize', e => {
      this.onWindowResize(e);
    });
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    this.sphere.rotation.y += 0.001;
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderScene();
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
  onWindowResize = () => {
    // update aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    // update frustum
    this.camera.updateProjectionMatrix();
    // update renderer and canvas
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
  loadObject = (file, name) => {
    const scene = this.scene;
    const material = new THREE.MeshStandardMaterial({
      color: 'black',
      wireframeLinewidth: 0.1,
      wireframe: true
    });
    const loader = new OBJLoader();
    loader.load(
      file,
      object => {
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });
        scene.add(object);
        object.name = name;
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      error => {
        console.error(error, 'LOADING ERROR');
      }
    );
  };

  render() {
    return (
      <div
        onClick={() => {}}
        className="Planetarium"
        style={{ width: '100vw', height: '100vh' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default Planetarium;
