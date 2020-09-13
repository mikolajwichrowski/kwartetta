import React from 'react';
import Hand from "./components/Hand";
import ClosedCards from './components/ClosedCards';
import OpenCard from './components/OpenCard';


function App() {
  return (
    <div className="speelveld">
      <Hand />
      <ClosedCards/>
      <OpenCard />
    </div>
  );
}

export default App;
