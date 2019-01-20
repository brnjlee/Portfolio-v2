import React from 'react';
import './Card.css';
import { FiXCircle } from "react-icons/fi";

export default class Card extends React.Component {
  constructor() {
    super();
  }
  createMarkup = () => {
    return {__html: this.props.body};
  }
  render() {
    const tools = this.props.tools.map((tool, i) => {
      return <div key={i} id="tool">{tool}</div>
    });

    return (
        <div 
          className={this.props.show? "show Card": "hide Card"} 
          style={{display: this.props.hide ? 'none' : null }} 
          onClick={this.props.openCard}
        >
          {this.props.show && <FiXCircle id="close-button" onClick={this.props.closeCard}/>}
          <img src={this.props.src} alt={this.props.title} title={this.props.title}
               id="logo" width={this.props.imgWidth} height={this.props.imgHeight}
          />
          <span id="title">{this.props.title}</span>
          <span id="description">{this.props.description}</span>
          <br />
          {this.props.show && 
            <div id="card-content">
              <div dangerouslySetInnerHTML={this.createMarkup()} />
              <br />
              {tools}
            </div>
          }
        </div>
    )
  }
}
