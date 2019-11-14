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
      initialized: false,
      activePlanet: 'mars',
      flatEarth: false,
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
      rotation: {
        speed: 0.001
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
          cloudTexture: textures.earth.cloudTexture,
          specularMap: textures.earth.specularMap,
          flatTexture: textures.earth.flatTexture,
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
          texture: textures.saturn.texture,
          ringTexture: textures.saturn.ringTexture
        },
        uranus: {
          texture: textures.uranus.texture
        },
        neptune: {
          texture: textures.neptune.texture
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
    this.controls = controls;
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

  flattenEarth = () => {
    if (this.disc && this.state.flatEarth) return;
    console.log(
      '"The earth is flat; any fool can see that."',
      'https://www.youtube.com/watch?v=tC5RalYWZ5Y'
    );
    this.scene.remove(this.sphere);
    const geometry = new THREE.CylinderBufferGeometry(
      10,
      10,
      0.1,
      100,
      100,
      false
    );
    this.disc = new THREE.Mesh(geometry);
    this.disc.rotation.set(0.5, 0.9, 0.1);
    let material = new THREE.MeshToonMaterial();
    const texture = this.state.materials.earth.flatTexture;
    const flatEarthtexture = new THREE.TextureLoader().load(texture, () => {
      console.log('Texture loaded');
    });
    flatEarthtexture.anisotropy = this.renderer.getMaxAnisotropy();
    material.map = flatEarthtexture;
    this.disc.material = material;
    this.scene.add(this.disc);
    this.state.flatEarth = true;
  };

  unFlattenEarth = () => {
    this.state.flatEarth = false;
    this.scene.remove(this.disc);
    this.state.flatEarth = false;
    this.scene.add(this.sphere);
  };

  createSaturnRings = () => {
    // CREATE GEOMETRIES
    const innerRingGeometry = new THREE.RingBufferGeometry(20, 23, 200, 100);
    const outerRingGeometry = new THREE.RingBufferGeometry(12, 19.8, 200, 100);
    // CREATE MESHES
    this.innerRing = new THREE.Mesh(innerRingGeometry);
    this.outerRing = new THREE.Mesh(outerRingGeometry);
    // CREATE MATERIAL AND ADD TEXTURES
    let material = new THREE.MeshToonMaterial({
      color: 'dimgray'
      // wireframeLinewidth: 0.1,
      // wireframe: true
    });
    const texture = this.state.materials.saturn.ringTexture;
    const ringTexture = new THREE.TextureLoader().load(texture, () => {
      console.log('Texture loaded');
    });
    ringTexture.anisotropy = this.renderer.getMaxAnisotropy();
    material.map = ringTexture;
    // ADD MATERIAL TO RINGS
    this.innerRing.material = material;
    this.outerRing.material = material;
    this.innerRing.material.side = THREE.DoubleSide;

    // ADD ROTATION
    this.innerRing.rotation.set(29.9, -0.03, 0.7);
    this.outerRing.rotation.set(29.9, -0.03, 0.7);
  };

  updatePlanetMaterial = (planet, flat) => {
    // RENDER THE FIRST TIME NO MATTER WHAT
    if (this.state.initialized && this.state.activePlanet === planet && !flat)
      return;
    // IF PLANET MATERIALS DO NOT EXIST, RETURN
    if (!this.state.materials[planet]) return;
    // CREATE MATERIALS
    let material = new THREE.MeshPhongMaterial();
    // CREATE TEXTURES, BUMP MAP
    const texture = this.state.materials[planet].texture;
    const bumpMap = this.state.materials[planet].bumpMap;
    const planetTexture = new THREE.TextureLoader().load(texture, () => {
      console.log('Texture loaded');
    });
    // MAX ANISOTROPHY MAKES SH*T LOOK BETTER
    planetTexture.anisotropy = this.renderer.getMaxAnisotropy();
    // ADD TEXTURES AND MAPS TO MATERIALS
    material.map = planetTexture;
    material.bumpMap = new THREE.TextureLoader().load(bumpMap, () => {
      console.log('Bump map loaded');
    });
    material.bumpScale = this.state.materials[planet].bumpScale;
    // ADD MATERIAL TO SPHERE
    this.sphere.material = material;
    this.sphere.material.side = THREE.DoubleSide;
    // UPDATE ACTIVE PLANET
    this.setState({ activePlanet: planet, initialized: true });
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
    this.light.intensity = int / 100;
  };

  setRotationSpeed = int => {
    this.state.rotation.speed = int / 10000;
  };

  addSaturnRings = () => {
    if (this.state.activePlanet === 'saturn')
      this.scene.add(this.innerRing, this.outerRing);
    else this.scene.remove(this.innerRing, this.outerRing);
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
    // CREATE SATURN RINGS
    this.createSaturnRings();
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
    this.addSaturnRings();
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
    this.sphere.rotation.y += this.state.rotation.speed;
    if (this.state.flatEarth) this.disc.rotation.y += this.state.rotation.speed;
    this.innerRing.rotation.z += 0.0005;
    this.outerRing.rotation.z += 0.0009;
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
