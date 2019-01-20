import React, { Component } from 'react';
import './App.css';
import './mouse.css';
import { TimelineLite,TweenLite, CSSPlugin } from "gsap/all";
import * as THREE from 'three';
import { FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";
import resume from './assets/resume.pdf';

import Scene from './components/Scene';
import Card from './components/Card';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pageTo: null,
    };

    this.dataArray = [
      {
        "src": "./assets/Empire.png",
        "title": "Empire Life, Innovation Lab",
        "description": "Software Developer"
      },
      {
        "src": "./assets/q4.svg",
        "title": "Q4 Inc.",
        "description": "QA Automation Developer"
      },
      {
        "src": "./assets/mockup1.png",
        "title": "Messager",
        "description": "Message/Video Chat web/mobile"
      }
    ];
    this.tl = new TimelineLite({ paused: true });
    this.cardsTween = null;

    this.headerMain = null;
    this.headerSecondary = null;
    this.myTween = null;
    this.cards = [];
    this.page2 = null
  }

  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  componentDidMount() {

    this.authenticate().then(() => {
      const ele = document.getElementById('loading-screen')
      if(ele){
        // fade out
        ele.classList.add('available')
        this.headerTween.restart();

        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = '';
        }, 2000)
      }
    })

    window.addEventListener('wheel', this.handleScroll, false);
    this.headerTween = new TimelineLite({paused: true})
      .to(this.cards , 0.5, { autoAlpha: 0, y: 20 })
      .from(this.headerMain, 1, {autoAlpha:0, y: 100})
      .from(this.headerSecondary, 1, {autoAlpha:0, y: 100})
      .add(() => {this.setState({pageTo: null})} )

    this.bodyTweenIn = new TimelineLite({ paused: true })
      .to(this.headerSecondary, 0.5, {autoAlpha:0, y: 100})
      .to(this.headerMain, 0.5, {autoAlpha:0, y: 100})
      .staggerFrom( this.cards , 0.5, { autoAlpha: 0, y: 20 }, 0.1)
      .add(() => {this.setState({pageTo: null})} )

    // this.bodyTweenOut = new TimelineLite({ paused: true })
    //   .to(this.cards, 0.5, { autoAlpha: 0, y: 20 })
    //   .from(this.headerMain, 1, {autoAlpha:0, y: 100})
    //   .from(this.headerSecondary, 1, {autoAlpha:0, y: 100})
  }

  handleScroll = (e) => {
    e.preventDefault();
    if(e.deltaY > 0 && this.state.pageTo === null && this.state.page !== 2) {
      this.setState({
        pageTo: 2,
        page: 2
      })
    } else if(e.deltaY < 0 && this.state.pageTo === null && this.state.page !== 1){
      this.setState({
        pageTo: 1,
        page: 1
      })
    }
  }

  render() {
    if (this.state.pageTo === 1) {
      // this.bodyTweenOut.restart();
      this.headerTween.restart();
    } else if(this.state.pageTo === 2) {
      this.bodyTweenIn.restart();
    }
    // this.tl.kill().clear().pause(0);
    return (
      <div id="master-wrapper" >
        <Scene />
        <div id="header-main" ref={(i) => {this.headerMain = i}}>
          <span>HI, I'M </span>
          <span id="name">BRIAN</span>
        </div>
        <div id="header-secondary" ref={(i) => {this.headerSecondary = i}}>
          SOFTWARE DEVELOPER
        </div>
        <div id="icon-container">
          <a href={resume} target="_blank">
            <div className="icon">
              <FiFileText />
            </div>
          </a>
          <a href="https://github.com/brnjlee" target="_blank">
            <div className="icon">
              <FiGithub />
            </div>
          </a>
          <a href="https://www.linkedin.com/in/brian-lee-2553a1149/" target="_blank">
            <div className="icon">
              <FiLinkedin />
            </div>
          </a>
        </div>
        {this.state.page===1 && <div className="mouse"><span></span></div>}
        <div className="page-indicator">
          <span className={this.state.page===1 ? "active" : null}/>
          <span className={this.state.page===2 ? "active" : null}/>
        </div>
        <div id="body">
            <div ref={(ref) => {this.cards.push(ref)}}>
              <span id="section-title">EXPERIENCE</span>
            </div>
            
            <div id="section-body">
            {/*
            this.dataArray.map((element, index) => (
              <div key={index} ref={(ref) => {this.cards.push(ref)}}>
                <Card 
                  src={require(element.src)}
                  imgWidth={100} 
                  imgHeight={100} 
                  title={element.title} 
                  description={element.description} 
                />
              </div>
            ))*/}
              <div ref={(ref) => {this.cards.push(ref)}}>
                <Card 
                  src={require('./assets/Empire.png')}
                  imgWidth={100} 
                  imgHeight={100}
                  type={"Internship"}
                  title={"Empire Life, Innovation Lab"} 
                  description={"Software Developer"} 
                />
              </div>
              <div ref={(ref) => {this.cards.push(ref)}}>
                <Card 
                  src={require("./assets/q4.svg")}
                  imgWidth={100} 
                  imgHeight={100} 
                  type={"Internship"}
                  title={"Q4 Inc."} 
                  description={"QA Automation Developer"} 
                />
              </div>

            </div>
            <div id="section-body">
              <div ref={(ref) => {this.cards.push(ref)}}>
                <Card 
                  src={require( "./assets/mockup1.png")}
                  imgWidth={170} 
                  imgHeight={100} 
                  type={"Project"}
                  title={"Messager"} 
                  description={"Multiplatform Messaging/Video Chat"} 
                />
              </div>
              <div ref={(ref) => {this.cards.push(ref)}}>
                <Card 
                  src={require( "./assets/home.png")}
                  imgWidth={100} 
                  imgHeight={100} 
                  type={"Project"}
                  title={"RentForYou"} 
                  description={"Classified Ads for sublets"} 
                />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
