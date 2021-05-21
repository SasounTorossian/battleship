// TODO: Fix ship/fleet naming convention
const fleetFactory = () => {
    const ships = [
        {
            type: "Destroyer",
            length: 2,
            position: [],
            orientation: [
                [0, 1],
                [0, 10]
            ],
            hit(segment) {
                if(segment < position.length) { // What if segment doesn't exist? 
                    this.position[segment] = "X"
                }
            },
            isSunk() {
                return !!this.position.length && this.position.every(segment => segment === "X")
            },
        },
        {
            type: "Submarine",
            length: 3,
            position: [],
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ],
            hit(segment) {
                if(segment < position.length) {
                    this.position[segment] = "X"
                }
            },
            isSunk() {
                return !!this.position.length && this.position.every(segment => segment === "X")
            },
        },
        {
            type: "Cruiser",
            length: 3,
            position: [],
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ],
            hit(segment) {
                if(segment < position.length) {
                    this.position[segment] = "X"
                }
            },
            isSunk() {
                return !!this.position.length && this.position.every(segment => segment === "X")
            },
        },
        {
            type: "Battleship",
            length: 4,
            position: [],
            orientation: [
                [0, 1, 2, 3],
                [0, 10, 20, 30]
            ],
            hit(segment) {
                if(segment < position.length) {
                    this.position[segment] = "X"
                }
            },
            isSunk() {
                return !!this.position.length && this.position.every(segment => segment === "X")
            },
        },
        {
            type: "Carrier",
            length: 5,
            position: [],
            orientation: [
                [0, 1, 2, 3, 4],
                [0, 10, 20, 30, 40]
            ],
            hit(segment) {
                if(segment < position.length) {
                    this.position[segment] = "X"
                }
            },
            isSunk() {
                return !!this.position.length && this.position.every(segment => segment === "X")
            },
        },
    ]

    // Checks if all ships in the fleet are sunk.
    const checkIfShipsSunk = () => {
        return ships.every(ship => ship.isSunk())
    }

    // TODO: Check if functioning. What if undefined.
    // Find which ship is occupying a particular position. 
    const findShipFromPosition = (pos) => {
        let foundShip

        // Might return index
        foundShip = ships.find(ship => {
            return ship.position.indexOf(pos) !== -1
        })

        return foundShip
    }

    const findIndexFromPosition = (ship, pos) => {
        return ship.position.indexOf(pos)
    }

    const hitShip = (positionToHit) => {
        let ship = findShipFromPosition(positionToHit)
        let index = findIndexFromPosition(ship, positionToHit)
        ship.hit(index)
    }

    return {
        ships,
        checkIfShipsSunk,
        findShipFromPosition,
        findIndexFromPosition
    }

} 

export default fleetFactory