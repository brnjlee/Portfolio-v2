import React, { Component } from 'react';
import './Card.css';

const Card = props => {
  return (
      <div id="Card">
        <img src={props.src} alt={props.title} title={props.title}
             id="logo" width={props.imgWidth} height={props.imgHeight}
        />
      	<div id="card-type">{props.type}</div>
        
          <span id="title">{props.title}</span>
        <span id="description">{props.description}</span>
      </div>
  )
}

export default Card;
