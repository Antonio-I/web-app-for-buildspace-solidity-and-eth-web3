import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const ideaAction = () => {
    
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

        <button className="ideaButton" onClick={ideaAction}>
          Share an idea
        </button>
      </div>
    </div>
  );
}
