import React from 'react';
import Hand from "./components/Hand";
import ClosedCards from './components/ClosedCards';
import OpenCard from './components/OpenCard';
import images from "./components/images.js";
import BurnedCards from './components/BurnedCards';
import Card from './components/Card';
import PlayingField from './components/PlayingField';

class App extends React.Component{

    constructor(){
      super()
      this.state = {
        ShuffledDeck: [],
        CardsInHand: [],
        OpenCard: null, 
        BurnedCards:[],
        PlayField: [],
        SelectedCard: []
      };
    }
    
    //Voor de shuffle maak ik gebruik van de fisher-yates formule: https://www.wikiwand.com/en/Fisher%E2%80%93Yates_shuffle#/The_modern_algorithm
    //de implementatie heb ik gevonden op stackoverflow: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffleCards(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    
    startGame =() => {
      const shuffledCards = this.shuffleCards(images);
      const openCard = shuffledCards.shift();
      this.setState({
        ShuffledDeck: shuffledCards,
        CardsInHand: [],
        OpenCard: openCard,
        BurnedCards:[],
        PlayField: []
      });
    }
    
    turnCard =()=>{
      //Get the latest open card and append to burned cards
      if(!this.state.ShuffledDeck.length){
        //game conditions
        alert("deck is leeg jongen")
      }else{
        this.setState({
          BurnedCards: this.state.BurnedCards.concat(this.state.OpenCard),
          OpenCard: this.state.ShuffledDeck.shift(),
        });
      }
    }

    takeCard =() => {
      if(!this.state.ShuffledDeck.length){
        //game conditions
        alert("The deck is empty")
      }else if(this.state.CardsInHand.length >= 6){
        alert("You cannot have more then 6 cards in your hand, pleace place a quartet or burn a card")
        console.log(this.state.CardsInHand.length)
      }else{
        const tempOpenCard = this.state.OpenCard;
        tempOpenCard.selectebale = true;
        this.setState({
          CardsInHand: this.state.CardsInHand.concat(this.state.OpenCard),
          OpenCard: this.state.ShuffledDeck.shift()
        });
      }
      console.log(this.state)
    }

    // selectCard=() =>{
    //   if(this.state.CardsInHand.length > 4){
    //     alert("You cannot select more then 4 cards")
    //   }else{
        
    //   }
    // }

    render(){
      return(
        <div>
          <PlayingField playingField={this.state.PlayField}/>
          <ClosedCards/>
          <OpenCard openCard={this.state.OpenCard}/>
          <div className = "newCard">
            <button type="button" onClick={this.turnCard}>New card</button>
          </div>
          <div className = "takeCard">
            <button type="button" onClick={this.takeCard}>Take card</button>
          </div>
          <Hand cardsInHand={this.state.CardsInHand} burnedCard={this.state.BurnedCards}/>
          <button type="button" onClick={this.startGame}>Start new game</button>
        </div>
        
      )
    }

}

export default App;
  

    //Voor de shuffle maak ik gebruik van de fisher-yates formule: https://www.wikiwand.com/en/Fisher%E2%80%93Yates_shuffle#/The_modern_algorithm
    //de implementatie heb ik gevonden op stackoverflow: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

    
  //   const cardComponents = images.map(item => <Card key={item.id} card={item}/>)

  //   var cardsInDeck = shuffle(images);;
  //   var cardsInHand = [];
  //   var cardsBurned = [];
  //   var closedCard = cardComponents.filter(card=> card.type==="back")
  //   var cardOpen;

  //   return (
  //     <div className="speelveld">
  //       {closedCard}
  //       <Hand />
  //       <ClosedCards/>
  //       <OpenCard />
  //       <BurnedCards />
  //     </div>
  //   );
  // }
