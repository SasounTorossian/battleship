import React, { useRef } from "react" 

const dragAndDrop = (() => {
    let squareNodes
    let shipNodes

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
        // console.log(shipNameWithLastId);
        // console.log(shipClass);
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
        let shipLastId = lastShipIndex + parseInt(e.target.dataset.id)
        selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
        
        shipLastId = shipLastId - selectedShipIndex

        // Horizontal / Vertical
        for(let i=0; i<draggedShipLength; i++) {
            squareNodes[parseInt(e.target.dataset.id) - selectedShipIndex + i].classList.add("taken", shipClass)

            squareNodes[parseInt(e.target.dataset.id) - selectedShipIndex + i].classList.remove("gamesquare-empty")
            squareNodes[parseInt(e.target.dataset.id) - selectedShipIndex + i].classList.add(`gamesquare-${shipClass}`)
        }

        // TODO: Remove from dock
        // TODO: populate gamesquare object on player. 
    }

    const initializeDragAndDrop = (boardRef, shipRef) => {
        squareNodes = boardRef.current.childNodes
        shipNodes = shipRef.current.childNodes

        // console.log(squareNodes);
        // console.log(shipNodes);
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