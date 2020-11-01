import React from 'react';
import Card from './Card';
import "../style.css";


class Hand extends React.Component{

    constructor(props){
        super(props);
    }

    burnTheCard =() =>{
        this.props.burnCardFunction(this.props.selectedCards);
    }

    placeQuartet =() =>{
        this.props.placeQuartetFunction(this.props.selectedCards);
    }

    shiftLeft =() =>{
        this.props.shiftLeft(this.props.selectedCards)
    }

    shiftRight =()=>{
        this.props.shiftRight(this.props.selectedCards)
    }

    selectCard = (card) => {
        this.props.selectCard(card)
    }

    render(){
        return(
            <div className="hand">
                {this.props.cardsInHand.map((singleCard, index) => 
                    <ul key={index} className = "ulList" onClick = {()=> this.selectCard(singleCard)}>
                        <Card key={singleCard.id} src={singleCard.src} card={singleCard.card} type={singleCard.type} selected={singleCard.selected}/>
                    </ul>)}
                <div>
                    <button className="buttonHand" 
                        disabled={this.props.cardsInHand.length === 0 || 
                            this.props.selectedCards[0] === this.props.cardsInHand[0] ||
                            this.props.selectedCards.length  > 1 ||
                            this.props.selectedCards.length === 0 ? true : false} 
                        onClick={this.shiftLeft}>
                        &lt;&lt;&lt;
                    </button>
                    <button className="buttonHand" 
                        disabled={!this.props.canBurn || 
                            this.props.cardsInHand.length === 0 ? true : false || 
                            this.props.selectedCards.length === 0 ? true : false } 
                        onClick = {this.burnTheCard}>
                        Burn card
                    </button>
                    <button className="buttonHand" 
                        disabled={this.props.selectedCards.length === 4 ? false : true} 
                        onClick = {this.placeQuartet}>
                        Place Quartet
                    </button>
                    <button className="buttonHand" 
                        disabled={this.props.cardsInHand.length === 0 || 
                            this.props.selectedCards[this.props.selectedCards.length - 1] === this.props.cardsInHand[this.props.cardsInHand.length - 1] || 
                            this.props.selectedCards.length === 0 || 
                            this.props.selectedCards.length  > 1 ? true : false} 
                        onClick = {this.shiftRight}>
                        &gt;&gt;&gt;
                    </button>
                </div>
            </div> 
        );
    }
   
}

export default Hand;
