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
    let gameboard = player.gameboard
    let ships = player.fleet.ships

    return (
        <div className="Gameboard">
            {
                gameboard.gameboard.map(square => {
                    return (
                        <div 
                            className={`gamesquare gamesquare-${square.ship.type}`} 
                            key={square.id}
                            onClick={(e) => gameboard.clickHandler(e, ships, square.id)}
                        >

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Gameboards
