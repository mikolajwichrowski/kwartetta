import React from 'react';
import Card from './Card';
import "../style.css";


function Hand(props){


    let burnedCards = props.burnedCard;
    let cardsInHand = props.cardsInHand;

    const cardComponent = props.cardsInHand.map(singleCard => <Card key={singleCard.Id} src={singleCard.src} card={singleCard.card} type={singleCard.type} selectable={singleCard.selectebale}/>);
    
    return(
        <div className="hand">
            {cardComponent}
        <div>
            <button className="buttonHand" >&lt;&lt;&lt;</button>
            <button className="buttonHand" >Burn card</button>
            <button className="buttonHand">Place Quartet</button>
            <button className="buttonHand" >&gt;&gt;&gt;</button>
        </div>

        </div>

        
    );
}

export default Hand;
