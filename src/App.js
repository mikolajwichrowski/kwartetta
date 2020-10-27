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
        Quartets: [],
        CanBurn: true,
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
        Quartets: [],
        CanBurn: true,
      });
    }
    
    turnCard =()=>{
      //Get the latest open card and append to burned cards
      if(!this.state.ShuffledDeck.length){
        //game conditions
        this.setState({
          ErrorMessage: ["EMPTYDECK"]
        })
        alert("De kaarten zijn op")
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
          this.setState({
            ErrorMessage: ["GAMEDONE", this.state.Quartets.length]
          })
          alert("Het spel is afgelopen je hebt " + this.state.Quartets.length + " kwartetten")
        }else if(this.state.CardsInHand.length >= 8){
          this.setState({
            ErrorMessage: ["MORETHEN8CARDS"]
          })
          alert("Je kan niet meer dan 8 kaarten in je hand hebben.")
        }else{
          this.setState({
            CardsInHand: this.state.CardsInHand.concat(this.state.OpenCard),
            OpenCard: this.state.ShuffledDeck.shift(),
            CanBurn: true
          });
        }
      }else{
        this.setState({
          ErrorMessage: ["BURNCARD"]
        })
        alert("Je moet eerst een kaart wegleggen")
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
          this.setState({
            ErrorMessage: ["NOCARDSELECTED"]
          })
          alert("Je hebt geen kaart geselecteerd.")
        }else{
          this.setState({
            ErrorMessage: ["TOMUCHSELECTED"]
          })
          alert("Je hebt te veel kaarten geselecteerd")
        }
      }else{
        this.setState({
          ErrorMessage: ["PICKCARD"]
        })
      }
      this.deselectCards(selectedCards);
    }
    
    placeQuartet = (selectedCards) =>{
      var cardNumber = selectedCards[0].card;
      var cardCounter = 0;
      if(selectedCards.length < 4){
        this.setState({
          ErrorMessage: ["NOTENOUGHQUARTET"]
        })
        alert("Je hebt niet genoeg kaarten voor een kwartet geselecteerd.")
      }else if(selectedCards.length > 4){
        this.setState({
          ErrorMessage: ["TOMUCHCARDFORQUARTET"]
        })
        alert("Een kwartet kan alleen uit 4 kaarten bestaan, je hebt er te veel geselecteerd.")
      }else{
        for(var i = 0; i < selectedCards.length; i++){
          if(selectedCards[i].card === cardNumber){
            cardCounter++;
          }
        }
      }
      if(cardCounter === 4){
        var cardsInHandCopy = this.state.CardsInHand
        for(var j = 0; j < selectedCards.length; j++){
          const index = cardsInHandCopy.findIndex(d => d.id === selectedCards[j].id);
          if (index > -1) {
            cardsInHandCopy.splice(index, 1);
          }
        }
        this.setState({
          CardsInHand: cardsInHandCopy,
          Quartets: this.state.Quartets.concat([selectedCards]),
          ErrorMessage: ["QUARTET"]
        }) 
        alert("Je hebt een kwartet!")
        if(!cardsInHandCopy.length){
          this.setState({
            ErrorMessage: ["GAMEFINISH", this.state.Quartets.length ]
          })
          alert("Het spel is afgelopen, je hebt " + this.state.Quartets.length + " kwartetten met nog " + this.state.ShuffledDeck.length + " kaarten in het spel")
        }
      }else{
        alert("VALSE BINGO G")
        this.setState({
          ErrorMessage: ["FALSEQUARTET"]
        })
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
        this.setState({
          ErrorMessage: ["CANNOTGOLEFT"]
        })
        alert("Je kan niet nog verder naar links")
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
        this.setState({
          ErrorMessage: ["CANNOTGORIGTH"]
        })
        alert("Je kan niet nog verder naar rechts")
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
          <PlayingField quartets={this.state.Quartets}/>
          <div className="openCloseCard">
            <ClosedCards/>
            <OpenCard openCard={this.state.OpenCard}/>
            <div className = "buttonNewGame">
              <button type="button" onClick={this.startGame}>Start new game</button>
            </div>
            <div className = "takeCard">
              <button disabled={this.state.CanBurn || this.state.CardsInHand < 8} type="button" onClick={this.takeCard}>Take card</button>
            </div>
          </div>
          <Hand cardsInHand={this.state.CardsInHand} burnedCard={this.state.BurnedCards} burnCardFunction={this.burnCard} placeQuartetFunction={this.placeQuartet} shiftLeft={this.shiftLeft} shiftRight={this.shiftRight} canBurn={this.state.CanBurn}/>
        </div>
      )
    }

}

export default App;
  