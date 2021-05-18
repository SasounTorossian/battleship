import React from 'react'
import './GameBoards.css'

const GameBoards = ({ players }) => {
    return (
        <div className="GameBoards">
            <GameBoard player={players[0]} />
        </div>
    )
}

const GameBoard = ({ player }) => {
    let gameBoard = player.fleet.gameBoard

    return (
        <div className="GameBoard">
        </div>
    )
}

export default GameBoards
