import React, { Component } from 'react';
import './App.css';
import './mouse.css';
import { TimelineMax, TweenLite, CSSPlugin } from "gsap/all";
import { FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";
import resume from './assets/resume.pdf';

import Scene from './components/Scene';

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pageTo: 0,
      showCard: null,
    };
    this.data = [
        {
          src: require("./assets/Empire.png"),
          srcWidth: 100,
          srcHeight: 100,
          title: "Empire Life, Innovation Lab",
          description: "Software Developer",
          body: `
          • Worked as a core member of the innovation team, producing research and development regarding emerging technologies <br />
          • Designed and developed a chatbot module integrated with a Support knowledge base <br />
          • Used Google Dialogflow to handle client queries producing a 80% decrease in CSR workload <br />
          • Led a team of frontend developers to architect a robust codebase using React + Redux <br />
          • Maintained thorough documentation and unit tests with Jest/Enzyme
          `,
          tools: ['React.js', 'React Native', 'Redux', 'Jest/Enzyme', 'Node.js', 'Express.js', 'Firebase', 'Dialogflow']
        },
        {
          src: require("./assets/q4.svg"),
          srcWidth: 100,
          srcHeight: 100,
          title: "Q4 Inc.",
          description: "QA Automation Developer",
          body: `
          • Responsible as the primary QA engineer for testing all web SaaS products working with tools such as
          Postman, Selenium, and SQL <br />
          • Automated regression testing for web products using Selenium, Java, and TestNG <br />
          • Created automated test suites for the product’s front end and REST APIs increasing the testing 
          workflow effeciency by more than 90% <br />
          • Worked in a fast-paced, Agile environment as an active member of a Scrum team
          `,
          tools:['Java', 'Selenium', 'TestNG']

        },
        {
          src: require("./assets/mockup1.png"),
          srcWidth: 170,
          srcHeight: 100,
          title: "LooChat",
          description: "Messaging/Video Chat app",
          body: `
          <a 
            href="https://loochat.herokuapp.com" 
            rel="noopener noreferrer"
            target="_blank"
            id="git-link"
          >
            https://loochat.herokuapp.com
          </a> <br />
          • Developed a P2P chat application that handles messages and video calls using Socket.io and WebRTC <br />
          • Built web and mobile clients in React/React Native + Redux, paired with a Node/Express RESTful API <br />
          • Implemented JWT token authentication
          <br />
          <a 
            href="https://github.com/brnjlee/LooChat" 
            rel="noopener noreferrer" 
            target="_blank"
            id="git-link"
          >
            Source Code
          </a>
          `,
          tools: ['React.js', 'React Native', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Simple-Peer(WebRTC)']
        },
        {
          src: require("./assets/home.png"),
          srcWidth: 100,
          srcHeight: 100,
          title: "RentForYou",
          description: "Classified Ads for sublets",
          body: `
          • Created a classified ad platform where students can find housing options around their school area <br />
          • Integrated Google Maps API to generate geocoded addresses and display rents onto a dynamic map
          <br />
          <a 
            href="https://github.com/brnjlee/RentForYou" 
            rel="noopener noreferrer" 
            target="_blank"
            id="git-link"
          >
            Source Code
          </a>
          `,
          tools: ['Flask', 'MySQL', 'HTML', 'CSS', 'Javascript', 'Google Maps API']
        }
      ];
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
    this.page2 = null
  }

  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  componentDidMount() {
      this.authenticate().then(() => {
        const ele = document.getElementById('loading-screen')
        if(ele){
          ele.classList.add('available')

          setTimeout(() => {
            // remove from DOM
            ele.outerHTML = '';
          }, 2000)
        }
      })
  }

  openCard = (index) => {
    if (this.state.showCard === null) {
      this.setState({
        showCard: index
      })
    }
  }

  closeCard = (index) => {
    this.setState({
      showCard: null
    })
  }


  render() {
    if (this.state.pageTo === 1) {
      this.bodyTweenOut.restart();
      // this.headerTween.restart();
    } else if(this.state.pageTo === 2) {
      this.bodyTweenIn.restart();
    }

    return (
      <div id="master-wrapper" >
        <Scene isMobile={this.isMobile} />
        <div id="header-main" ref={(i) => {this.headerMain = i}}>
          <span id={this.isMobile? "name-mobile":"name"}>Brian Lee</span>
        </div>
        <div id="header-secondary" ref={(i) => {this.headerSecondary = i}}>
          
        </div>
        {/* {this.state.page===1 && !this.isMobile && <div className="mouse"><span></span></div>} */}
        <div id={this.isMobile? "mobile-icon-container":"icon-container"}>
          <a 
            href={resume} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="icon" ref={(ref) => {this.links.push(ref)}}>
              <FiFileText />
            </div>
          </a>
          <a 
            href="https://github.com/brnjlee" 
            rel="noopener noreferrer" 
            target="_blank"
          >
            <div className="icon" ref={(ref) => {this.links.push(ref)}}>
              <FiGithub />
            </div>
          </a>
          <a 
            href="https://www.linkedin.com/in/brian-lee-2553a1149/" 
            rel="noopener noreferrer" 
            target="_blank"
          >
            <div className="icon" ref={(ref) => {this.links.push(ref)}}>
              <FiLinkedin />
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default App;
