const fleetFactory = () => {

    // Takes segment and marks it as hit.
    function hit(segment) { this.position[segment] = "X" }

    // Checks all segments in position to see if ship is fully sunk.
    function isSunk() { return !!this.position.length && this.position.every(segment => segment === "X") }

    // Checks if all ships in the fleet are sunk.
    const checkIfAllShipsSunk = () => { return ships.every(ship => ship.isSunk()) }

    //TODO: Change "type" to "class" for better accuracy.
    const ships = [
        {
            type: "destroyer",
            length: 2,
            position: [],
            orientation: [
                [0, 1],
                [0, 10]
            ],
            hit: hit,
            isSunk: isSunk,
        },
        {
            type: "submarine",
            length: 3,
            position: [],
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ],
            hit: hit,
            isSunk: isSunk,
        },
        {
            type: "cruiser",
            length: 3,
            position: [],
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ],
            hit: hit,
            isSunk: isSunk,
        },
        {
            type: "battleship",
            length: 4,
            position: [],
            orientation: [
                [0, 1, 2, 3],
                [0, 10, 20, 30]
            ],
            hit: hit,
            isSunk: isSunk,
        },
        {
            type: "carrier",
            length: 5,
            position: [],
            orientation: [
                [0, 1, 2, 3, 4],
                [0, 10, 20, 30, 40]
            ],
            hit: hit,
            isSunk: isSunk,
        },
    ]

    return {
        ships,
        checkIfAllShipsSunk,
    }

} 

export default fleetFactory