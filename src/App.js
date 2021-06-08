import './App.css';
import React, {useState, useEffect, useRef, useComponentWillMount, useLayoutEffect } from "react"
import Header from "./components/Header/Header"
import GameArea from "./components/GameArea/GameArea"
import gameEngine from "./logic/gameEngine"
import dragAndDrop from "./logic/dragAndDrop/dragAndDrop"

//TODO: saving App.js page causes two boards to appear.
function App() {
 const [players, setPlayers] = useState([])
 const [currentPlayer, setCurrentPlayer] = useState(0) // 0 = player, 1 = AI
 const [gameOver, setGameOver] = useState(false)
 const [winningPlayer, setWinningPlayer] = useState(0)

 // Initial game setup.
 useEffect(() => {
    gameEngine.initializeSetPlayers(setPlayers)
    gameEngine.initializePlayers("John Doe", "Admiral Akbar")
    gameEngine.initializePlayersGameboard()
    gameEngine.placeAIShips()
    setPlayers(gameEngine.getPlayers())
    setCurrentPlayer(gameEngine.getCurrentPlayer())
  }, [])

  // TODO: will get called everytime player places ships. Need to prevent it on drag and drop.
  // TODO: More efficient way of handling next turn. Perhaps put it all in one function in gameEngine.
  // Called when next turn occurs
  useEffect(() => {
    gameEngine.nextPlayerTurn()
    setCurrentPlayer(gameEngine.getCurrentPlayer())

    if(gameEngine.checkGameOver()) {
      setGameOver(true)
      setWinningPlayer(gameEngine.checkWhoWon())
    }
    
  }, [players])

  // Initialize drag and drop functionality
  // useEffect(() => {
  //   if(boardRef.current !== null && shipRef.current !== null) {
  //     console.log("refs ready");
  //     dragAndDrop.initializeDragAndDrop(boardRef, shipRef, players, handlePlayerShipPlacement)
  //   }
  // })

  // TODO: new component for game over screen.
  // TODO: Should be passing current Player to gameboard to prevent clicking on own gameboard.
  // NOTE: current player could also be used in PvP to know who's screen to obscure. 
  return (
    <div className="App">
      <Header />
      { players.length > 0 && <GameArea players={players} key={players}/> }
    </div>
  );
}

export default App;
