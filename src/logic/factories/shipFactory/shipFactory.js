const shipFactory = () => {
    const fleet = [
        {
            type: "Destroyer",
            length: 2,
            hull: [0, 0],
            hit: function(segment) {
                this.hull[segment] = 1
            },
            isSunk: function() {
                return this.hull.every(segment => segment === 1)
            },
            orientation: [
                [0, 1],
                [0, 10]
            ]
        },
        {
            type: "Submarine",
            length: 3,
            hull: [0, 0, 0],
            hit: function(segment) {
                this.hull[segment] = 1
            },
            isSunk: function() {
                return this.hull.every(segment => segment === 1)
            },
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ]
        },
        {
            type: "Cruiser",
            length: 3,
            hull: [0, 0, 0],
            hit: function(segment) {
                this.hull[segment] = 1 
            },
            isSunk: function() {
                return this.hull.every(segment => segment === 1) 
            },
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ]
        },
        {
            type: "Battleship",
            length: 4,
            hull: [0, 0, 0, 0],
            hit: function(segment) {
                this.hull[segment] = 1 
            },
            isSunk: function() {
                return this.hull.every(segment => segment === 1) 
            },
            orientation: [
                [0, 1, 2, 3],
                [0, 10, 20, 30]
            ]
        },
        {
            type: "Carrier",
            length: 5,
            hull: [0, 0, 0, 0, 0],
            hit: function(segment) {
                this.hull[segment] = 1 
            },
            isSunk: function() {
                return this.hull.every(segment => segment === 1)
            },
            orientation: [
                [0, 1, 2, 3, 4],
                [0, 10, 20, 30, 40]
            ]
        },
    ]

    return {
        fleet
    }

} 

export default shipFactory