// TODO: Fix ship/fleet naming convention
const shipFactory = () => {
    const fleet = [
        {
            type: "Destroyer",
            length: 2,
            position: [],
            orientation: [
                [0, 1],
                [0, 10]
            ],
            hit(segment) {
                if(segment < position.length) {
                    this.position[segment] = "X"
                }
            },
            isSunk() {
                return this.position.every(segment => segment === "X")
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
                return this.position.every(segment => segment === "X")
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
                return this.position.every(segment => segment === "X")
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
                return this.position.every(segment => segment === "X")
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
                return this.position.every(segment => segment === "X")
            },
        },
    ]

    const checkIfFleetSunk = () => {
        return fleet.every(ship => ship.isSunk())
    }

    return {
        fleet,
        checkIfFleetSunk
    }

} 

export default shipFactory