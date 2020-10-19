import React from 'react';
import Card from './Card';
import "../style.css";


class Hand extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedCards: []
        }
    }

    //Werkt nog niet helemaal zoals het zou moeten werken.
    selectCard = (card) => {
        if(!card.selected === true){
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
                {this.props.cardsInHand.map((singleCard) => 
                    <ul className = "ulList" onClick = {()=> this.selectCard(singleCard)}>
                        <Card key={singleCard.id} src={singleCard.src} card={singleCard.card} type={singleCard.type} selected={singleCard.selected}/>
                    </ul>)}
                <div>
                    <button className="buttonHand" onClick={this.shiftLeft}>&lt;&lt;&lt;</button>
                    <button className="buttonHand" onClick = {this.burnTheCard}>Burn card</button>
                    <button className="buttonHand" onClick = {this.placeQuartet}>Place Quartet</button>
                    <button className="buttonHand" onClick = {this.shiftRight}>&gt;&gt;&gt;</button>
                </div>
                <p>{JSON.stringify(this.state.selectedCards)}</p>
            </div> 
        );
    }
   
}

export default Hand;
