import React, { Component } from 'react';

import React3 from 'react-three-renderer';
import * as THREE from 'three';

class Scene extends Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0,0,50);
    this.particleCount = 5000;
    this.particles = [];
    this.particleRefs = [];
    this.mouseX = 0;
    this.mouseY = 0;

    this.state = {
      update: 0
    };

    this._onAnimate = () => {
      this.camera.position.x -= (this.mouseX/10 + this.camera.position.x+10) * 0.05;
      this.camera.position.y -= -(this.mouseY/10 - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);

      for (let i = 0; i < this.particleCount; i++) {
        if(this.particleRefs[i].direction.y > 0 && i<this.particleCount/2) {
          this.particleRefs[i].position.y += 0.1;
        } else {
          this.particleRefs[i].position.y -= 0.1;
        }

        if(this.particleRefs[i].direction.x > 0 && i<this.particleCount/2) {
          this.particleRefs[i].position.x += 0.1;
        } else {
          this.particleRefs[i].position.x -= 0.1;
        }

        if(this.particleRefs[i].position.x < -window.innerWidth || 
          this.particleRefs[i].position.x > window.innerWidth ) {
          this.particleRefs[i].direction.x = -this.particleRefs[i].direction.x;
        }
        if(this.particleRefs[i].position.y < -window.innerHeight || 
          this.particleRefs[i].position.y > window.innerHeight ) {
          this.particleRefs[i].direction.y = -this.particleRefs[i].direction.y;
        }

      }
    }
    let particleGeometry = <sphereGeometry radius={2} widthSegments={20} heightSegments={20}/>;
    let particleMaterial = <meshBasicMaterial color={0xf05f40} opacity={0.5} transparent={true} />;

    for (let i = 0; i < this.particleCount; i++) {
      this.particles[i] = (
        <mesh 
          key={i}
          ref={(particle) => {this.particleRefs.push(particle);
            this.particleRefs[i].direction = {
              x:1,
              y:1
            }
          }}
          position={
            new THREE.Vector3( 
              Math.random() * window.innerWidth * 2 - window.innerWidth, 
              Math.random() * window.innerHeight * 2 - window.innerHeight,
              Math.random() * window.innerWidth * 2 - window.innerWidth
            )
          }
        >
         {particleGeometry}
         {particleMaterial}
        </mesh>
      );
    }
  }

  componentDidMount() {
    // window.addEventListener('wheel', this.handleScroll, false);
    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    // window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  onWindowResize = () => {
    this.setState({
      update: this.state.update + 1
    });
  }

  handleMouseMove = (e) => {
        this.mouseX = e.clientX - window.innerWidth/2;
        this.mouseY = e.clientY - window.innerHeight/2;
  }

  handleScroll = (e) => {
    e.preventDefault();

    this.camera.rotation.set(this.camera.rotation.x + (e.deltaY * 0.005), this.camera.rotation.y+ (e.deltaY * 0.005), this.camera.rotation.z);
    this.camera.position.set(this.camera.position.x , this.camera.position.y, this.camera.position.z+ (e.deltaY * 0.005))
  
    this.camera.position.clampScalar( 0, 10 );
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    return (
      <div id="canvas">
        <React3
          ref={(renderer) => {this.renderer = renderer}}
          mainCamera="camera"
          width={width}
          height={height}
          clearColor={0x080808}
          alpha={true}
          clearAlpha={1}
          onAnimate={this._onAnimate}
        >
          <scene ref={(scene) => {this.scene = scene}}>
            <perspectiveCamera
              ref={(camera) => {this.camera = camera}}
              name="camera"
              fov={75}
              aspect={width/height}
              near={0.1}
              far={1000}

              position={this.cameraPosition}
            />
            {this.particles}
            {/*<mesh>
              <sphereGeometry radius={10} widthSegments={15} heightSegments={8}/>
              <meshLambertMaterial color={0xFFFFFF} wireframe={true} />
            </mesh>*/}
            <ambientLight intensity={.8} />
            
          </scene>
        </React3>
      </div>
    );
  }
}

export default Scene;
