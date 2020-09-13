import React from 'react';
import images from './images.js'

function Card(){
    return(
        <div>
            <img className = "singleCard" src={images[0].src} alt="playingcard"/>
        </div>
    );
}

export default Card;

