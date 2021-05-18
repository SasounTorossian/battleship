import React from 'react'
import './Gameboards.css'

const Gameboards = ({ players }) => {
    return (
        <div className="Gameboards">
            <Gameboard player={players[0]} />
            <Gameboard player={players[1]} />
        </div>
    )
}

const Gameboard = ({ player }) => {
    let gameboard = player.fleet.gameboard

    return (
        <div className="Gameboard">
        </div>
    )
}

export default Gameboards
