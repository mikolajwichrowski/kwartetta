import React from 'react';

function Card(props){
    return(
        <img className = "singleCard" src={props.card.src} alt="playingcard"/>
    );
}

export default Card;

