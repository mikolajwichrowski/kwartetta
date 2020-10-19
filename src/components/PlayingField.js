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
                {JSON.stringify(this.props)}
            </div>
            
        );
    }


}

export default PlayingField;
