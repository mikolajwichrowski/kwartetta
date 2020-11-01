import React from 'react';
import Card from './Card';
import "../style.css";


class Hand extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedCards: [],
        }
    }

    selectCard = (card) => {
        if(!card.selected){
            card.selected = true;
            this.setState({
            selectedCards: this.state.selectedCards.concat(card)
        })
        }else{
            card.selected = false;
            var selectedcards = this.state.selectedCards
            const index = selectedcards.findIndex(d => d.id === card.id);
            if (index > -1) {
                selectedcards.splice(index, 1);
            this.setState({
                selectedCards: selectedcards
            })
            }
        }      
    }

    burnTheCard =() =>{
        this.props.burnCardFunction(this.state.selectedCards);
        this.setState({
            selectedCards:[]
          })
    }

    placeQuartet =() =>{
        this.props.placeQuartetFunction(this.state.selectedCards);
        this.setState({
            selectedCards: []
        })
    }

    shiftLeft =() =>{
        this.props.shiftLeft(this.state.selectedCards)
    }

    shiftRight =()=>{
        this.props.shiftRight(this.state.selectedCards)
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
                            this.state.selectedCards[0] === this.props.cardsInHand[0] ||
                            this.state.selectedCards.length  > 1 ||
                            this.state.selectedCards.length === 0 ? true : false} 
                        onClick={this.shiftLeft}>
                        &lt;&lt;&lt;
                    </button>
                    <button className="buttonHand" 
                        disabled={!this.props.canBurn || 
                            this.props.cardsInHand.length === 0 ? true : false || 
                            this.state.selectedCards.length > 1 ? true : false } 
                        onClick = {this.burnTheCard}>
                        Burn card
                    </button>
                    <button className="buttonHand" 
                        disabled={this.state.selectedCards.length === 4 ? false : true} 
                        onClick = {this.placeQuartet}>
                        Place Quartet
                    </button>
                    <button className="buttonHand" 
                        disabled={this.props.cardsInHand.length === 0 || 
                            this.state.selectedCards[this.state.selectedCards.length - 1] === this.props.cardsInHand[this.props.cardsInHand.length - 1] || 
                            this.state.selectedCards.length === 0 || 
                            this.state.selectedCards.length  > 1 ? true : false} 
                        onClick = {this.shiftRight}>
                        &gt;&gt;&gt;
                    </button>
                </div>
            </div> 
        );
    }
   
}

export default Hand;
