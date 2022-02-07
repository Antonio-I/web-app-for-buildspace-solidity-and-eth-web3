import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        💡 Idea Central
        </div>

        <div className="bio">
        Hey! Connect your Ethereum wallet and share your ideas!
        </div>

        <button className="waveButton" onClick={wave}>
          Share an idea
        </button>
      </div>
    </div>
  );
}
