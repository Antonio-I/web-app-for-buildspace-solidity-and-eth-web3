import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import { useEffect } from "react";

export default function App() {
  const checkWalletConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Requires metamask");
    } else{
      console.log("We have ethereum object", ethereum);
    }
  }

  const ideaAction = () => {
    
  }

  useEffect(() => {
    checkWalletConnected();
  }, [])
  
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
