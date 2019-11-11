import OrbitControls from 'orbit-controls-es6';
import React, { Component } from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as VSkull from './assets/3D/vsskull.obj';
OBJLoader(THREE);

class Threehouse extends Component {
  componentDidMount() {
    this.THREE = THREE;
    this.skullMesh = null;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    const fov = 35;
    const aspect = this.mount.clientWidth / this.mount.clientHeight;
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 0, 5);
    //ADD CONTROLS
    const controls = new OrbitControls(this.camera, this.mount);
    controls.enabled = true;
    controls.maxDistance = 1500;
    controls.minDistance = 0;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //ADD OBJ
    this.loadObject(VSkull, 'skull');
    //ADD LIGHTS
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(10, 10, 10);
    this.scene.add(this.light);

    this.start();
  }
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    if (this.skullMesh !== null) {
      console.log('ANIMATING');
      this.skullMesh.rotation.x += 0.1;
      this.skullMesh.rotation.y += 0.1;
      this.light.position.set(10, 10, this.frameId);
      console.log(this.skullMesh.rotation.x, this.skullMesh.rotation.y);
    }
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderScene();
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  loadObject = (file, name) => {
    // store scene reference
    const scene = this.scene;
    const loader = new this.THREE.OBJLoader();
    const material = new THREE.MeshStandardMaterial({
      color: 'black'
      // wireframeLinewidth: 0.1,
      // wireframe: true
    });

    return loader.load(
      file,
      object => {
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });
        this.skullMesh = new THREE.Mesh(object, material);
        scene.add(object);
        object.name = name;
      },
      // called when loading is in progress
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // called when error during loading
      error => {
        console.error(error, 'LOADING ERROR');
      }
    );
  };

  render() {
    return (
      <div
        className="Threehouse"
        style={{ width: '100vw', height: '100vh' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default Threehouse;
