import './App.css';
import React, {useState, useEffect} from "react"
import Header from "./components/Header/Header"
import Gameboards from "./components/Gameboards/Gameboards"
import Dock from "./components/Dock/Dock"
import gameEngine from "./logic/gameEngine"

function App() {
 const [players, setPlayers] = useState([])
 const [currentPlayer, setCurrentPlayer] = useState(0) // 0 = player, 1 = AI
 const [gameOver, setGameOver] = useState(false)
 const [winningPlayer, setWinningPlayer] = useState(0)
 
 const handlePlayerChange = () => {
   setPlayers(gameEngine.getPlayers())
 }

 useEffect(() => {
    gameEngine.initializeAppPlayerUpdate(handlePlayerChange)
    gameEngine.initializePlayers("John Doe", "Admiral Akbar")
    gameEngine.initializePlayersGameboard()
    gameEngine.placeAIShips()
    setPlayers(gameEngine.getPlayers())
    setCurrentPlayer(gameEngine.getCurrentPlayer())
  }, [])

  // TODO: More efficient way of handling next turn. Perhaps put it all in one function in gameEngine.
  useEffect(() => {
    gameEngine.nextPlayerTurn()
    setCurrentPlayer(gameEngine.getCurrentPlayer())

    if(gameEngine.checkGameOver()) {
      setGameOver(true)
      setWinningPlayer(gameEngine.checkWhoWon())
    }

  }, [players])

  // TODO: new component for game over screen.
  // TODO: Should be passing current Player to gameboard to prevent clicking on own gameboard.
  // NOTE: current player could also be used in PvP to know who's screen to obscure. 
  return (
    <div className="App">
      <Header />
      {players.length > 0 && <Gameboards players={players}/>}
      <Dock />
    </div>
  );
}

export default App;
