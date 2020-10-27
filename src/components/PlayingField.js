import React from 'react';
import "../style.css";


class PlayingField extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            selectedCards: []
        }
    }

    render(){
        return(
            <div className="PlayingField">
                <h1>Quartets: </h1>
                {this.props.quartets.map((quartet, index) => (
                <ul className ="ulListPlayingField">
                  {quartet.map((singleCard, index) =><div className="cardInPlayfield"><img className = "singleCard" src={singleCard.src} alt="playingcard"/></div> )}
                </ul>
              ))}
            </div>

            
        );
    }


}

export default PlayingField;
