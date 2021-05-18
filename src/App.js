import './App.css';
import React, {useState, UseEffect} from "react"
import Header from "./components/Header/Header"
import Gameboards from "./components/Gameboards/Gameboards"
import Dock from "./components/Dock/Dock"
import gameEngineModule from "./logic/gameEngineModule"

function App() {
 const [players, setplayers] = useState([])
 const gameEngine = gameEngineModule()

 // FIXME: Getting called multiple times. Only call once. UseEffect
 gameEngine.initializePlayers()
 gameEngine.initializePlayersGameboard()
 gameEngine.initializeAIGameboard()
 setplayers(gameEngine.getPlayers())

  return (
    <div className="App">
      {/* <Header />
      <Gameboards />
      <Dock /> */}
    </div>
  );
}

export default App;
