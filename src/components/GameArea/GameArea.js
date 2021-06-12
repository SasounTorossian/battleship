import React, { useLayoutEffect, useState} from 'react'
import './GameArea.css'
import './Dock.css'
import gameEngine from "../../logic/gameEngine"
import gameboardFactory from '../../logic/factories/gameboardFactory/gameboardFactory'

const GameArea = ({ players }) => {
    console.log(players);
    const [horizontal, setHorizontal] = useState(true)

    const handleHorizontal = () => { setHorizontal(!horizontal) }

    const handleReset = () => {
        let humanPlayer = players[0]
        humanPlayer.fleet.ships.forEach(ship => {
            ship.position = []
        })

        humanPlayer.gameboard.clearBoard()
        humanPlayer.gameboard.initGameboard()
        gameEngine.updateHumanPlayer(humanPlayer)
        gameEngine.updatePlayersState()
    }

    let selectedShipNameWithIndex
    let selectedShipIndex
    let draggedShip
    let draggedShipLength
    let selectedShipIndexMultipler

    const clearAllHighlights = () => {
        document.querySelectorAll(".user-gamesquare").forEach(square => {
            square.classList.remove("highlight")
        })
    }
    
    const mouseDown = (e) => {
        selectedShipNameWithIndex = e.target.id
        selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1)) // Which segment has been selected 
        selectedShipIndexMultipler = selectedShipIndex * (horizontal ? 1 : 10)
    }

    const dragStart = (e) => {
        draggedShip = e.target
        draggedShipLength = draggedShip.childNodes.length
    }

    const dragEnter = (e) => {
        e.preventDefault()
        clearAllHighlights()
        for(let i=0; i < draggedShipLength; i++) {
            let indexMultiplier = i * (horizontal ? 1 : 10)
            let highlightedElement = document.querySelector(`[data-id='${parseInt(e.target.dataset.id) - selectedShipIndexMultipler + indexMultiplier}']`)
            if(highlightedElement !== null) { highlightedElement.classList.add("highlight") }
        }
    }

    // NOTE: Not Needed
    const dragLeave = (e) => {
        e.preventDefault()
    }

    // NOTE: Not Needed
    const dragOver = (e) => {
        e.preventDefault()
    }

    const dragEnd = (e) => {
        clearAllHighlights()
    }

    const dragDrop = (e) => {
        console.log("DROPPED");
        // NOTE: Have single function to handle all of this in the gameEngine
        let humanPlayer = players[0]
        let hoveredSquare = parseInt(e.target.dataset.id)
        let shipNameWithLastId = draggedShip.lastChild.id // destroyer-0
        let shipClass = shipNameWithLastId.slice(0, -2) // destroyer
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1)) // 0
        let shipLastId = lastShipIndex + parseInt(e.target.dataset.id) // Last place of ship on current square.
        shipLastId = shipLastId - selectedShipIndex // How far back to start placing ship.

        let shipObject = humanPlayer.fleet.ships.find(ship => ship.type === shipClass)
        let shipOrientation = horizontal ? shipObject.orientation[0] : shipObject.orientation[1]
        let shipStartingPosition = hoveredSquare - selectedShipIndexMultipler

        if(checkShipCollision(humanPlayer.gameboard.gameboard, shipOrientation, shipStartingPosition)) { return }
        if(horizontal && checkHorizontalOutOfBounds(shipOrientation, shipStartingPosition)) { return }
        

        shipOrientation.forEach(index => {
            humanPlayer.gameboard.gameboard[shipStartingPosition + index].occupied = true  // Populate gameboard occupied variable.
            humanPlayer.gameboard.gameboard[shipStartingPosition + index].ship = shipObject // Populate gameboard ship variable.
            shipObject.position.push(shipStartingPosition + index) // Populates position variable in ship.
        }) 

        gameEngine.updateHumanPlayer(humanPlayer)
        gameEngine.updatePlayersState()

        // TODO: Clean up variables.
        // TODO: Delete original drag and drop file.  
    }

    // Check if ship placement interferes with existing ships.
    const checkShipCollision = (gameboard, orientation, shipStartingPosition) => {
        return orientation.some(index => gameboard[shipStartingPosition + index].occupied === true )
    }

    // Check if ship is out of bounds on horizontal axis.
    const checkHorizontalOutOfBounds = (orientation, shipStartingPosition) => {
        return orientation.some(index => (shipStartingPosition % 10) + index >= 10) 
                // orientation.some(index => (hoveredSquare % 10) - index < 0)
    }

    // // Check if ship is out of bounds on vertical axis.
    // const checkVerticalOutOfBounds = (position, orientation) => {
    //     return orientation.some(index => (position + index >= 100))
    // }

    return (
        <div className="GameArea">
            <Gameboards 
                players={players} 
                dragEnter={dragEnter}
                dragOver={dragOver}
                dragLeave={dragLeave}
                dragDrop={dragDrop}
            />
            <Control 
                handleHorizontal={handleHorizontal}
                handleReset={handleReset}
            />
            <Dock 
                playerShips={players[0].fleet.ships} 
                horizontal={horizontal}
                mouseDown={mouseDown}
                dragStart={dragStart}
                dragEnd={dragEnd}
            />
        </div>
    )
}

// NOTE: Do I even need a humanPlayer?
const Gameboards = ({ players, dragEnter, dragOver, dragLeave, dragDrop }) => {
    return (
        <div className="Gameboards">
            <Gameboard 
                player={players[0]} 
                humanPlayer={ true } 
                dragEnter={dragEnter}
                dragOver={dragOver}
                dragLeave={dragLeave}
                dragDrop={dragDrop}
            />
            <Gameboard 
                player={players[1]} 
                humanPlayer={ false }
            />
        </div>
    )
}


const Gameboard = ({ player, humanPlayer, dragEnter, dragOver, dragLeave, dragDrop }) => {
    
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
                            onClick={(e) => gameboard.clickHandler(e, ships, square.id)} // NOTE: Could be better to call gameEngine.
                            onDragEnter={dragEnter}
                            onDragOver={dragOver}
                            onDragLeave={dragLeave}
                            onDrop={dragDrop}
                        >

                        </div>
                    )
                })
            }
        </div>
    )
}

const Control = ({ handleHorizontal, handleReset }) => {
    return (
        <div className="Control">
            <button onClick={handleHorizontal}>
                Change Orientation
            </button>
            <button onClick={handleReset}>
                Reset Ship Positions
            </button>
        </div>
    )
}

const Dock = ({ playerShips, horizontal, mouseDown,  dragStart, dragEnd}) => {
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
                            onDragEnd={dragEnd}
                        >
                            {ship.orientation[0].map(idx => {
                                return (
                                    <div className="ship-segment" id={`${ship.type}-${idx}`}></div>
                                )
                            })}
                        </div>
                    )
                }
                else {
                    return(<div></div>)
                }
            })}
        </div>
    )
}

export default GameArea
