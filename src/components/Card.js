import React from 'react';

function Card(props){
    if(props.selected){
        return(
            <img className = "selectedCard" src={props.src} alt="playingcard"/>
        );
    }else{
        return(
            <img className = "singleCard" src={props.src} alt="playingcard"/> 
        );
            
    }
    
}

export default Card;