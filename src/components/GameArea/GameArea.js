import React, { useState} from 'react'
import './GameArea.css'
import './Dock.css'
import gameEngine from "../../logic/gameEngine"
import gameboardFactory from '../../logic/factories/gameboardFactory/gameboardFactory'

const GameArea = ({ players }) => {
    console.log(players);
    const [horizontal, setHorizontal] = useState(false)

    const handleClick = () => { setHorizontal(!horizontal) }

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

    // TODO: Use to highlight where object would be. (Need future position too)
    const dragEnter = (e) => {
        e.preventDefault()
        console.log("drag enter");
    }


    const dragOver = (e) => {
        e.preventDefault()
        console.log("drag over");
    }

    // TODO: Remove hightlight.
    const dragLeave = (e) => {
        // Not needed?
        console.log("drag leave");
    }

    // TODO: Might not have any need
    const dragEnd = (e) => {
        console.log("drag end");
    }

    const dragDrop = (e) => {
        console.log("DROPPED");
        // NOTE: Need to FULLLLLYYYYY understand what's going on here instead of hacking it together.
        let humanPlayer = players[0]
        let shipNameWithLastId = draggedShip.lastChild.id
        let shipClass = shipNameWithLastId.slice(0, -2)
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
        let shipLastId = lastShipIndex + parseInt(e.target.dataset.id)
        let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
        shipLastId = shipLastId - selectedShipIndex // TODO: Will need to check overflow (horizontal and vertical)
        let horizontal = true // TODO: create horizonta and vertical button.

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
        // TODO: Delete original drag and drop file.  
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
            <Control handleClick={handleClick}/>
            <Dock 
                playerShips={players[0].fleet.ships} 
                horizontal={horizontal}
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

//TODO: Reset
// TODO: Change horizontal
const Control = ({ handleClick }) => {
    return (
        <div className="Control">
            <button onClick={handleClick}>
                Change Orientation
            </button>
        </div>
    )
}

const Dock = ({ playerShips, horizontal, mouseDown,  dragStart}) => {
    return (
        <div className="FleetDock">
            {playerShips.map(ship => {
                if(ship.position.length === 0) {
                    return (
                        <div 
                            className={`ship ${ship.type}-container-${horizontal ? "horizontal" : "vertical"}`} 
                            draggable={true} 
                            onMouseDown={mouseDown} 
                            onDragStart={dragStart}
                        >
                            {ship.orientation[0].map(idx => {
                                return (
                                    <div className="ship-segment" id={`${ship.type}-${idx}`}></div>
                                )
                            })}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default GameArea
