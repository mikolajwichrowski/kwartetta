import React from 'react';
import Hand from "./components/Hand";
import ClosedCards from './components/ClosedCards';
import OpenCard from './components/OpenCard';
import images from "./components/images.js";
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
        CanBurn: true
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
      var items = shuffledCards.slice(0, 8)
      shuffledCards.splice(0,8)
      const openCard = shuffledCards.shift();
      this.setState({
        ShuffledDeck: shuffledCards,
        CardsInHand: items,
        OpenCard: openCard,
        BurnedCards:[],
        PlayField: [],
        Quartets: []
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
      if(!this.state.CanBurn){
        if(!this.state.ShuffledDeck.length){
          //game conditions
          alert("The deck is empty")
        }else if(this.state.CardsInHand.length >= 8){
          alert("You cannot have more then 8 cards in your hand, pleace place a quartet or burn a card")
        }else{
          this.setState({
            CardsInHand: this.state.CardsInHand.concat(this.state.OpenCard),
            OpenCard: this.state.ShuffledDeck.shift(),
            CanBurn: true
          });
        }
      }else{
        alert("Je moet eerst burnen jonguh")
      }
    }

    burnCard = (selectedCards) =>{
      if(this.state.CanBurn){
        if(selectedCards.length === 1){
          const cardsInHand = this.state.CardsInHand.filter(card => card.id !== selectedCards[0].id);
          this.setState({
            BurnedCards: this.state.BurnedCards.concat(selectedCards),
            CardsInHand: cardsInHand,
            CanBurn: false
          })
        }else if(selectedCards.length === 0){
          console.log("You did not select a card")
        }else{
          console.log("You selected to many cards, you can only burn one.")
        }
      }else{
        alert("Eerst pakken dan burnen G")
      }
      this.deselectCards(selectedCards);
    }
    
    placeQuartet = (selectedCards) =>{
      var cardNumber = selectedCards[0].card;
      var cardCounter = 0;
      if(selectedCards.length < 4){
        alert("You didn't select enough cards for a quartet")
      }else if(selectedCards.length > 4){
        alert("Te veel kaarten voor kwartet neef")
      }else{
        for(var i = 0; i < selectedCards.length; i++){
          if(selectedCards[i].card === cardNumber){
            cardCounter++;
          }
        }
      }
      if(cardCounter === 4){
        alert("JE HEBT EEN BINGO")
        var cardsInHandCopy = this.state.CardsInHand
        for(var j = 0; j < selectedCards.length; j++){
          const index = cardsInHandCopy.findIndex(d => d.id === selectedCards[j].id);
          if (index > -1) {
            cardsInHandCopy.splice(index, 1);
          }
        }
        this.setState({
          CardsInHand: cardsInHandCopy,
          Quartets: this.state.Quartets.concat([selectedCards])
        }) 
      }else{
        alert("VALSE BINGO G")
      }
      this.deselectCards(selectedCards);
    }

    deselectCards = (selectedCards) =>{
      for(var i = 0; i < selectedCards.length; i++){
        selectedCards[i].selected = false;
      }
    }

    shiftLeft = (selectedCards) =>{
      var cardsInHandCopy = this.state.CardsInHand
      const index = cardsInHandCopy.findIndex(card => card.id === selectedCards[0].id);
      if(index === 0 || selectedCards.length > 1){
        alert("Je kan niet verder naar links")
      }else{
        var tempcard = cardsInHandCopy[index - 1];
        cardsInHandCopy[index - 1] = selectedCards[0]; 
        cardsInHandCopy[index]  = tempcard
        this.setState({
          CardsInHand: cardsInHandCopy
        }
        )
      }
    }

    shiftRight = (selectedCards) =>{
      var cardsInHandCopy = this.state.CardsInHand
      const index = cardsInHandCopy.findIndex(card => card.id === selectedCards[0].id);
      if(index === cardsInHandCopy.length - 1 || selectedCards.length > 1){
        alert("Je kan niet verder naar rechts")
      }else{
        var tempcard = cardsInHandCopy[index + 1];
        cardsInHandCopy[index + 1] = selectedCards[0]; 
        cardsInHandCopy[index]  = tempcard
        this.setState({
          CardsInHand: cardsInHandCopy
        }
        )
      }
    }

    render(){
      return(
        <div>
          <button type="buttonNewGame" onClick={this.startGame}>Start new game</button>
          <PlayingField playingField={this.state.PlayField}/>
          <ClosedCards/>
          <OpenCard openCard={this.state.OpenCard}/>
          <div className = "newCard">
            <button type="button" onClick={this.turnCard}>New card</button>
          </div>
          <div className = "takeCard">
            <button type="button" onClick={this.takeCard}>Take card</button>
          </div>
          <Hand cardsInHand={this.state.CardsInHand} burnedCard={this.state.BurnedCards} burnCardFunction={this.burnCard} placeQuartetFunction={this.placeQuartet} shiftLeft={this.shiftLeft} shiftRight={this.shiftRight}/>
        </div>
        
      )
    }

}

export default App;
  