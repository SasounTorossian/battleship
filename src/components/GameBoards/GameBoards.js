import React, { useEffect, useRef } from 'react'
import './Gameboards.css'

const Gameboards = React.forwardRef(({ players }, boardRef) => {
    // console.log(ref);
    return (
        <div className="Gameboards">
            <Gameboard player={players[0]} humanPlayer={ true } ref={boardRef}/>
            <Gameboard player={players[1]} humanPlayer={ false }/>
        </div>
    )
})


const Gameboard = React.forwardRef(({ player, humanPlayer }, boardRef) => {
    
    let gameboard = player.gameboard
    let ships = player.fleet.ships

    return (
        <div className="Gameboard" ref={boardRef}>
            {
                gameboard.gameboard.map(square => {
                    return (
                        <div 
                            className={`gamesquare gamesquare-${square.ship.type || "empty"} ${humanPlayer ? "user-gamesquare" : ""}`} 
                            key={square.id}
                            onClick={(e) => gameboard.clickHandler(e, ships, square.id)}
                        >

                        </div>
                    )
                })
            }
        </div>
    )
})

export default Gameboards
