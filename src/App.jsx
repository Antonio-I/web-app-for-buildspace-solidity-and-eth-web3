import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import { useEffect, useState } from "react";
import abi from "./utils/IdeaPortal.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ideaText, setIdeaText] = useState("");

  const contractAddress = "0xCFE875d3A86EF791F9378A14c4e8110708130Cfa";

  const contractABI = abi.abi;

  const checkWalletConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Requires metamask");
      } else{
        console.log("We have ethereum object", ethereum);
      }

      // Check if authorised to access user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an auth'd account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No auth'd account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask pls");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const idea = async (event) => {
    event.preventDefault();

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ideaPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await ideaPortalContract.getTotalIdeas();
        console.log("Total idea count:", count.toNumber());

        const ideaTransaction = await ideaPortalContract.idea(ideaText);
        console.log("Mining...", ideaTransaction.hash);

        await ideaTransaction.wait();
        console.log("Mined -- ", ideaTransaction.hash);

        count = await ideaPortalContract.getTotalIdeas();
        console.log("Retrieved total idea count =", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist :(");
      }
    } catch (error) {
      console.log(error);
    }
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
          Share your idea with others!
        </div>

        {currentAccount && (<form className="ideaButton" onSubmit={idea}>
          <label>
            <input type="text" name="name" placeholder="super cool idea" value={ideaText} onChange={e => setIdeaText(e.target.value)}/>
          </label>
          <input type="submit" value="Share"/>
          </form>
        )}

        {!currentAccount && (
          <div className="bio">
          <div> Oh no! You have not connected your wallet yet. </div>
            <button className="ideaButton" onClick={connectWallet}>
            Connect your wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default App