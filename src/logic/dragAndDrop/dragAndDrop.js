import React, { useRef } from "react" 

const dragAndDrop = (() => {
    let squareNodes
    let shipNodes

    const dragStart = (e) => {

    }

    const dragEnter = (e) => {

    }

    const dragOver = (e) => {

    }

    const dragLeave = (e) => {

    }

    const dragEnd = (e) => {

    }

    const dragDrop = (e) => {

    }

    const initializeDragAndDrop = (boardRef, shipRef) => {
        squareNodes = boardRef.current.childNodes
        shipNodes = shipRef.current.childNodes

        console.log(squareNodes);
        console.log(shipNodes);

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