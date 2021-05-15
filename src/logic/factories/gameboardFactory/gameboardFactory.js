const gameboardFactory = () => {

    let gameboard = []

    const initGameboard = () => {
        for(let i=0; i<100; i++) {
            let gameSquare = {
                id: i,
                occupied: false,
                hit: false,
            }
            gameboard.push(gameSquare)
        }

        return gameboard
    }

    // Displays gameboard 1D array as 2D array of IDs. 
    // Used for debugging with console.table().
    const displayArrayId = () => {
        let displayArray = []
        let displayGameboard = gameboard.map(el => el["id"])

        while(displayGameboard.length) {
            displayArray.push( displayGameboard.splice(0, 10) )
        }

        return displayArray
    }

    // Displays gameboard 1D array as 2D array of occupied spaces. 
    // Used for debugging with console.table().
    const displayArrayOccupied = () => {
        let displayArray = []
        let displayGameboard = gameboard.map(el => +el["occupied"])

        while(displayGameboard.length) {
            displayArray.push( displayGameboard.splice(0, 10) )
        }

        return displayArray
    }

    // Displays gameboard 1D array as 2D array of objects. 
    // Used for debugging with console.table().
    const displayArray = () => {
        let displayArray = []

        while(gameboard.length) {
            displayArray.push( gameboard.splice(0, 10) )
        }

        return displayArray
    }

    // Checks if ship has collided with other ships.
    // FIXME: Possibility of accessing out of bounds array.
    const checkShipCollision = (position, orientation) => {
        return orientation.some(index => gameboard[position + index].occupied === true)
    }

    // Check if ship is out of bounds on horizontal axis.
    const checkHorizontalOutOfBounds = (position, orientation) => {
        return orientation.some(index => (position % 10) + index >= 10)
    }

    // Check if ship is out of bounds on vertical axis.
    const checkVerticalOutOfBounds = (position, orientation) => {
        return orientation.some(index => (position + index >= 100))
    }


    // Places each ship object on the gameboard according to its parameters.
    const placeShip = (ship) => {
        let direction
        let invalidPlacement

        // Randomly select horizontal or vertical orientation of ship.
        let randomOrientation = Math.floor(Math.random() * ship.orientation.length)
        let currentShipOrientation = ship.orientation[randomOrientation]
        
        // Randomly select starting positition of ship.  
        let randomPosition = Math.floor(Math.random() * gameboard.length)
        let currentShipPosition = gameboard[randomPosition]

        //Check if ship collides with other ships.
        invalidPlacement = checkShipCollision(currentShipPosition, currentShipOrientation)

        //TODO: Better way that using randomOrientation === 0 || 1
        // If ship is horizontal, check horizontal bounds.
        if(randomOrientation === 0) {
            invalidPlacement = checkHorizontalOutOfBounds(currentShipPosition, currentShipOrientation)
        }

        // If ship is vertical, check vertical bounds.
        if(randomOrientation === 1) {
            invalidPlacement = checkVerticalOutOfBounds(currentShipPosition, currentShipOrientation)
        }

        if (invalidPlacement) { 
            // recursively call function to properly place ship.
            placeShip(ship) 
        }
        else {
            // Populate gameboard.
            currentShipOrientation.forEach(index => gameboard[currentShipPosition + index].occupied = true)
        }
    }

    return {
        gameboard,
        initGameboard,
        displayArrayId,
        displayArrayOccupied,
        displayArray,
        placeShip
    }
}

export default gameboardFactory