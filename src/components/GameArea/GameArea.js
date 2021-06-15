import React, { useState } from 'react'
import Gameboard from '../Gameboard/Gameboard'
import Control from '../Control/Control'
import Dock from '../Dock/Dock'
import './GameArea.css'

import gameEngine from "../../logic/gameEngine"

const GameArea = ({ players }) => {
    console.log(players);
    const [horizontal, setHorizontal] = useState(true)

    // sets horizontal variable on orientation change.
    const handleHorizontal = () => { setHorizontal(!horizontal) }

    // Called to reset player ship positions during drag and drop process.
    const handleReset = () => { gameEngine.handleGameboardReset(players[0]) }

    // Called when user clicks on gameboard.
    const handleClick = (player, SquareID) => { gameEngine.handleGameboardClick(player, SquareID) }

    let draggedShip // Element that is selected when selected ship entered drag space. E.g. <div class="ship destroyer-container-horizontal" draggable="true"></>
    let draggedShipChildren // All the children elements that make up ship element. E.g. [<div class="ship-segment" id="destroyer-0"></div>, <div class="ship-segment" id="destroyer-1"></div>]
    let selectedShipIndexMultipler // Ship index multipler to make positional calculations based on horizontal positioning E.g. [0, 1, 2, ...], or vertical E.g. [0 , 10, 20, ...]

    // Clears all highlihts from gameboard before calculating new highlight pattern.
    const clearAllHighlights = () => {
        document.querySelectorAll(".user-gamesquare").forEach(square => {
            square.classList.remove("highlight-legal", "highlight-illegal")
        })
    }
    
    // mouseDown event that activates when user clicks on one of the ships in the dock.
    const mouseDown = (e) => {
        let selectedShipNameWithIndex = e.target.id // The type of the selected ship plus the selected segment. E.g. destroyer-1, carrier-0
        let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1)) // Which segment has been selected. E.g. 1, 0
        selectedShipIndexMultipler = selectedShipIndex * (horizontal ? 1 : 10) 
    }

    // dragStart event that acticates when user drags ship object into the gameboard area.
    const dragStart = (e) => {
        draggedShip = e.target
        draggedShipChildren = Array.from(draggedShip.childNodes)
    }

    // dragEnter event that activates when ship gets dragged into new game square within the gameboard
    const dragEnter = (e) => {
        e.preventDefault()
        clearAllHighlights()

        let shipStartingPosition = parseInt(e.target.dataset.id) - selectedShipIndexMultipler
        let shipOrientation = draggedShipChildren.map((child, index) => index * (horizontal ? 1 : 10))
        let shipGameboardSquares = shipOrientation.map(index => document.querySelector(`[data-id='${ shipStartingPosition + index}']`))

        shipGameboardSquares.forEach(square => {
            if(square === null) { return }
            else if((horizontal && checkHorizontalOutOfBounds(shipOrientation, shipStartingPosition)) ||
                    (!horizontal && checkVerticalOutOfBounds(shipOrientation, shipStartingPosition)) ||
                    (checkHighlightCollision(shipGameboardSquares)))
                    { 
                        square.classList.add("highlight-illegal") 
                    }
            else { 
                        square.classList.add("highlight-legal") 
                }      
        })
    }

    // NOTE: Not used, but needed for for drag and drop to work.
    const dragLeave = (e) => { e.preventDefault() }

    // NOTE: Not used, but needed for for drag and drop to work.
    const dragOver = (e) => { e.preventDefault() }

    // dragEnd event that activates when user releases mouse-down in invalid position on gameboard.
    const dragEnd = (e) => { clearAllHighlights() }

    // NOTE: move to gameEngine?
    // dragDrop event that activates when user releases mouse-down over valid position on gameboard.
    const dragDrop = (e) => {
        let humanPlayer = players[0] 
        let humanGameboard = humanPlayer.gameboard.gameboard
        let droppedSquare = parseInt(e.target.dataset.id) // Get current square user dropped ship on.
        let shipNameWithLastId = draggedShip.lastChild.id // Gets the last segment of ship container E.g. destroyer-1
        let shipClass = shipNameWithLastId.slice(0, -2) // Gets type of ship from container E.g. destroyer
 
        let shipObject = humanPlayer.fleet.ships.find(ship => ship.type === shipClass) // Find correct ship object in player fleet based on ship type.
        let shipOrientation = horizontal ? shipObject.orientation[0] : shipObject.orientation[1] // Get ship orientation array from ship object.
        let shipStartingPosition = droppedSquare - selectedShipIndexMultipler // Get where the ship's first position is based on current square and where ship was clicked.

        if((horizontal && checkHorizontalOutOfBounds(shipOrientation, shipStartingPosition)) ||
            (!horizontal && checkVerticalOutOfBounds(shipOrientation, shipStartingPosition)) ||
            (checkShipCollision(humanGameboard, shipOrientation, shipStartingPosition))) 
            { 
                return 
            }
        else {
            shipOrientation.forEach(index => {
                humanGameboard[shipStartingPosition + index].occupied = true  // Populate gameboard occupied variable.
                humanGameboard[shipStartingPosition + index].ship = shipObject // Populate gameboard ship variable.
                shipObject.position.push(shipStartingPosition + index) // Populates position variable in ship.
            }) 

            gameEngine.updateHumanPlayer(humanPlayer)
            gameEngine.updatePlayersState()
        } 
    }
    
    // Check if ship is out of bounds on horizontal axis.
    const checkHorizontalOutOfBounds = (orientation, shipStartingPosition) => {
        return orientation.some(index => (shipStartingPosition % 10) + index >= 10 || shipStartingPosition + index < 0) 
    }
    
    // Check if ship is out of bounds on vertical axis.
    const checkVerticalOutOfBounds = (orientation, shipStartingPosition) => {
        return orientation.some(index => shipStartingPosition + index >= 100 || shipStartingPosition + index < 0)
    }

    // Check if ship placement interferes with existing ships.
    const checkShipCollision = (gameboard, orientation, shipStartingPosition) => {
        return orientation.some(index => gameboard[shipStartingPosition + index].occupied === true )
    }

    // Check if ship highlighting is colliding with pre-placed ship.
    const checkHighlightCollision = (gameboard) => {
        return gameboard.some(square => !square.classList.contains("gamesquare-empty"))
    }

    return (
        <div className="GameArea">
            <Gameboards 
                players={players} 
                handleClick={handleClick}
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
                players={players} 
                horizontal={horizontal}
                mouseDown={mouseDown}
                dragStart={dragStart}
                dragEnd={dragEnd}
            />
        </div>
    )
}

const Gameboards = ({ players, handleClick, dragEnter, dragOver, dragLeave, dragDrop }) => {
    return (
        <div className="Gameboards">
            <Gameboard 
                player={players[0]} 
                humanPlayer={ true } 
                handleClick={handleClick}
                dragEnter={dragEnter}
                dragOver={dragOver}
                dragLeave={dragLeave}
                dragDrop={dragDrop}
            />
            <Gameboard 
                player={players[1]} 
                humanPlayer={ false }
                handleClick={handleClick}
            />
        </div>
    )
}

export default GameArea
