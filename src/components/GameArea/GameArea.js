import React from 'react'
import './GameArea.css'
import './Dock.css'
import gameEngine from "../../logic/gameEngine"
import gameboardFactory from '../../logic/factories/gameboardFactory/gameboardFactory'

const GameArea = ({ players }) => {
    console.log(players);
    let selectedShipNameWithIndex
    let draggedShip
    // let draggedShipLength

    const mouseDown = (e) => {
        console.log(e.target);
        selectedShipNameWithIndex = e.target.id
        console.log(selectedShipNameWithIndex);
    }

    const dragStart = (e) => {
        console.log(e.target);
        draggedShip = e.target
        // draggedShipLength = draggedShip.childNodes.length
    }

    const dragEnter = (e) => {
        e.preventDefault()
    }

    const dragOver = (e) => {
        e.preventDefault()
    }

    const dragLeave = (e) => {
        // Not needed?
    }

    const dragEnd = (e) => {

    }

    const dragDrop = (e) => {
        console.log("DROPPED");
        let humanPlayer = players[0]
        let shipNameWithLastId = draggedShip.lastChild.id
        let shipClass = shipNameWithLastId.slice(0, -2)
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
        let shipLastId = lastShipIndex + parseInt(e.target.dataset.id)
        let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
        shipLastId = shipLastId - selectedShipIndex // TODO: Will need to check overflow
        let horizontal = true

        let shipObject = humanPlayer.fleet.ships.find(ship => ship.type === shipClass)
        let shipOrientation = horizontal ? shipObject.orientation[0] : shipObject.orientation[1]

        shipOrientation.forEach(index => {
            humanPlayer.gameboard.gameboard[parseInt(e.target.dataset.id) - selectedShipIndex + index].occupied = true  // Populate gameboard occupied variable.
            humanPlayer.gameboard.gameboard[parseInt(e.target.dataset.id) - selectedShipIndex + index].ship = shipObject // Populate gameboard ship variable.
            shipObject.position.push(parseInt(e.target.dataset.id) - selectedShipIndex + index) // Populates position variable in ship.
        }) 

        gameEngine.updateHumanPlayer(humanPlayer)
        gameEngine.updatePlayersState()

        // TODO: Clean up variables.
        // TODO: Remove from dock
    }




    return (
        <div className="GameArea">
            <Gameboards 
                players={players} 
                dragEnter={dragEnter}
                dragOver={dragOver}
                dragLeave={dragLeave}
                dragEnd={dragEnd}
                dragDrop={dragDrop}
            />
            <Dock 
                mouseDown={mouseDown}
                dragStart={dragStart}
            />
        </div>
    )
}

const Gameboards = ({ players, dragEnter, dragOver, dragLeave, dragEnd, dragDrop }) => {
    return (
        <div className="Gameboards">
            <Gameboard 
                player={players[0]} 
                humanPlayer={ true } 
                dragEnter={dragEnter}
                dragOver={dragOver}
                dragLeave={dragLeave}
                dragEnd={dragEnd}
                dragDrop={dragDrop}
            />
            <Gameboard 
                player={players[1]} 
                humanPlayer={ false }
            />
        </div>
    )
}


const Gameboard = ({ player, humanPlayer, dragEnter, dragOver, dragLeave, dragEnd, dragDrop }) => {
    
    let gameboard = player.gameboard
    let ships = player.fleet.ships

    return (
        <div className="Gameboard">
            {
                gameboard.gameboard.map(square => {
                    return (
                        <div 
                            className={`gamesquare gamesquare-${square.ship.type || "empty"} ${humanPlayer ? "user-gamesquare" : ""}`} 
                            data-id={square.id}
                            key={square.id}
                            onClick={(e) => gameboard.clickHandler(e, ships, square.id)}
                            onDragEnter={dragEnter}
                            onDragOver={dragOver}
                            onDragLeave={dragLeave}
                            onDragEnd={dragEnd}
                            onDrop={dragDrop}
                        >

                        </div>
                    )
                })
            }
        </div>
    )
}

const Dock = ({ mouseDown,  dragStart}) => {
    return (
        <div className="FleetDock">
            <div className={`ship destroyer-container`} draggable={true} onMouseDown={mouseDown} onDragStart={dragStart}>
                <div className="ship-segment" id="destroyer-0"></div>
                <div className="ship-segment" id="destroyer-1"></div>
            </div>

            <div className={`ship submarine-container`} draggable={true} onMouseDown={mouseDown} onDragStart={dragStart}>
                <div className="ship-segment" id="submarine-0"></div>
                <div className="ship-segment" id="submarine-1"></div>
                <div className="ship-segment" id="submarine-2"></div>
            </div>

            <div className={`ship cruiser-container`} draggable={true} onMouseDown={mouseDown} onDragStart={dragStart}>
                <div className="ship-segment" id="cruiser-0"></div>
                <div className="ship-segment" id="cruiser-1"></div>
                <div className="ship-segment" id="cruiser-2"></div>
            </div>

            <div className={`ship battleship-container`} draggable={true} onMouseDown={mouseDown} onDragStart={dragStart}>
                <div className="ship-segment" id="battleship-0"></div>
                <div className="ship-segment" id="battleship-1"></div>
                <div className="ship-segment" id="battleship-2"></div>
                <div className="ship-segment" id="battleship-3"></div>
            </div>

            <div className={`ship carrier-container`} draggable={true} onMouseDown={mouseDown} onDragStart={dragStart}>
                <div className="ship-segment" id="carrier-0"></div>
                <div className="ship-segment" id="carrier-1"></div>
                <div className="ship-segment" id="carrier-2"></div>
                <div className="ship-segment" id="carrier-3"></div>
                <div className="ship-segment" id="carrier-5"></div>
            </div>
        </div>
    )
}

export default GameArea
