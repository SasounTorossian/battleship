import React, { useRef } from "react" 

const dragAndDrop = (() => {
    let squareNodes
    let shipNodes
    let humanPlayer

    let selectedShipIndex
    let selectedShipNameWithIndex
    let draggedShip
    let draggedShipLength

    const mouseDown = (e) => {
        selectedShipNameWithIndex = e.target.id
        console.log(selectedShipNameWithIndex);
    }

    const dragStart = (e) => {
        draggedShip = e.target
        draggedShipLength = draggedShip.childNodes.length
        console.log(draggedShip);
        console.log(draggedShipLength);
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
        let shipNameWithLastId = draggedShip.lastChild.id
        let shipClass = shipNameWithLastId.slice(0, -2)
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
        let shipLastId = lastShipIndex + parseInt(e.target.dataset.id)
        selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
        shipLastId = shipLastId - selectedShipIndex
        let horizontal = true

        // TODO: Horizontal and vertical
        // TODO: Check

        // Horizontal / Vertical
        // for(let i=0; i<draggedShipLength; i++) {
        //     // squareNodes[parseInt(e.target.dataset.id) - selectedShipIndex + i].classList.add("taken", shipClass)

        //     squareNodes[parseInt(e.target.dataset.id) - selectedShipIndex + i].classList.remove("gamesquare-empty") // NOTE: Might not be needed if adding to player object.
        //     squareNodes[parseInt(e.target.dataset.id) - selectedShipIndex + i].classList.add(`gamesquare-${shipClass}`) 
        // }

        let shipObject = humanPlayer.fleet.ships.find(ship => ship.type === shipClass)
        let shipOrientation = horizontal ? shipObject.orientation[0] : shipObject.orientation[1]
        // console.log(shipObject);
        // console.log(shipOrientation);
        // console.log(humanPlayer.gameboard.gameboard[parseInt(e.target.dataset.id) - selectedShipIndex]);


        shipOrientation.forEach(index => {
            humanPlayer.gameboard.gameboard[parseInt(e.target.dataset.id) - selectedShipIndex + index].occupied = true  // Populate gameboard occupied variable.
            humanPlayer.gameboard.gameboard[parseInt(e.target.dataset.id) - selectedShipIndex + index].ship = shipObject // Populate gameboard ship variable.
            shipObject.position.push(parseInt(e.target.dataset.id) - selectedShipIndex + index) // Populates position variable in ship.
        }) 



        // TODO: Need to send player back up to App.js for re-render
        // TODO: Remove from dock
        // TODO: populate gamesquare object on player. 
    }

    const initializeDragAndDrop = (boardRef, shipRef, players) => {
        squareNodes = boardRef.current.childNodes
        shipNodes = shipRef.current.childNodes
        humanPlayer = players[0]

        shipNodes.forEach(ship => ship.addEventListener("mousedown", mouseDown))
        shipNodes.forEach(ship => ship.addEventListener("dragstart", dragStart))
        squareNodes.forEach(square => square.addEventListener("dragenter", dragEnter))
        squareNodes.forEach(square => square.addEventListener("dragover", dragOver))
        squareNodes.forEach(square => square.addEventListener("dragleave", dragLeave))
        squareNodes.forEach(square => square.addEventListener("dragend", dragEnd))
        squareNodes.forEach(square => square.addEventListener("drop", dragDrop))
        
    }

    return {
        initializeDragAndDrop
    }

})()

export default dragAndDrop