import React from 'react';
import Card from './Card';

function OpenCard(props){

    if(!props.openCard){
        return(
            <div className='openCard'>
                <img className = "singleCard" src='images/purple_back.png' alt="playingcard"/>
            </div>
        )
       
    }else{
        return(
            <div className="openCard">
               <Card {...props.openCard}/>
            </div>
        );
    }
    
}

export default OpenCard;