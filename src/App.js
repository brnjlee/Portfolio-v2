import React, { Component } from "react";
import "./App.css";
import "./mouse.css";
import { FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";
import resume from "./assets/resume.pdf";

import Scene from "./components/Scene";

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pageTo: 0,
      showCard: null
    };
    this.headerTween = null;
    this.bodyTweenIn = null;
    this.bodyTweenOut = null;
    this.cardsTween = null;
    this.width = window.innerWidth;
    this.isMobile = window.innerWidth < 450;
    this.headerMain = null;
    this.headerSecondary = null;
    this.myTween = null;
    this.cards = [];
    this.links = [];
    this.page2 = null;
  }

  authenticate() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  componentDidMount() {
    this.authenticate().then(() => {
      const ele = document.getElementById("loading-screen");
      if (ele) {
        ele.classList.add("available");

        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = "";
        }, 2000);
      }
    });
  }

  openCard = index => {
    if (this.state.showCard === null) {
      this.setState({
        showCard: index
      });
    }
  };

  closeCard = index => {
    this.setState({
      showCard: null
    });
  };

  render() {
    if (this.state.pageTo === 1) {
      this.bodyTweenOut.restart();
      // this.headerTween.restart();
    } else if (this.state.pageTo === 2) {
      this.bodyTweenIn.restart();
    }

    return (
      <div id="master-wrapper">
        <Scene isMobile={this.isMobile} />
        <div
          id="header-main"
          ref={i => {
            this.headerMain = i;
          }}
        >
          <span id={this.isMobile ? "name-mobile" : "name"}>Brian Lee</span>
        </div>
        <div
          id="header-secondary"
          ref={i => {
            this.headerSecondary = i;
          }}
        ></div>
        {/* {this.state.page===1 && !this.isMobile && <div className="mouse"><span></span></div>} */}
        <div id={this.isMobile ? "mobile-icon-container" : "icon-container"}>
          <a href={resume} target="_blank" rel="noopener noreferrer">
            <div
              className="icon"
              ref={ref => {
                this.links.push(ref);
              }}
            >
              <FiFileText />
            </div>
          </a>
          <a
            href="https://github.com/brnjlee"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div
              className="icon"
              ref={ref => {
                this.links.push(ref);
              }}
            >
              <FiGithub />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/brian-lee-2553a1149/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div
              className="icon"
              ref={ref => {
                this.links.push(ref);
              }}
            >
              <FiLinkedin />
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default App;
