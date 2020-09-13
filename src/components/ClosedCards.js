import React from 'react';
import Card from './Card';

function ClosedCards(){
    return(
        <div className='closedCards'>
            <div><Card  card={"back"}/></div>
        </div>
        
    );
}

export default ClosedCards;