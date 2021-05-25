import './App.css';
import React, {useState, useEffect} from "react"
import Header from "./components/Header/Header"
import Gameboards from "./components/Gameboards/Gameboards"
import Dock from "./components/Dock/Dock"
import gameEngineModule from "./logic/gameEngineModule"

function App() {
 const [players, setplayers] = useState([])
 const gameEngine = gameEngineModule()

 // TODO: gameEngine handler that changes player state.

 // TODO: When/how does "players" have to be updated?
 // How will the game engine interact with the program and play-cycle.
 useEffect(() => {
    gameEngine.initializePlayers("Michael")
    gameEngine.initializePlayersGameboard()
    gameEngine.initializeAIGameboard()
    setplayers(gameEngine.getPlayers())
  }, [])

  return (
    <div className="App">
      <Header />
      {players.length > 0 && <Gameboards players={players}/>}
      <Dock />
    </div>
  );
}

export default App;
