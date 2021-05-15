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
    const checkShipCollision = (position, orientation) => {
        return orientation.some(index => {
            if (gameboard[position + index] === undefined) return true
            else gameboard[position + index].occupied === true
        })
    }

    // Check if ship is out of bounds on horizontal axis.
    const checkHorizontalOutOfBounds = (position, orientation) => {
        return orientation.some(index => (position % 10) + index >= 10)
    }

    // Check if ship is out of bounds on vertical axis.
    const checkVerticalOutOfBounds = (position, orientation) => {
        return orientation.some(index => (position + index >= 100))
    }

    // Places all fleet ships onto gameboard
    const placeAllShips = (fleet) => {
        fleet.forEach(ship => placeShip(ship))
    }


    // Places each ship object on the gameboard according to its parameters.
    const placeShip = (ship, testPosition = false, testOrientation = false) => {
        let invalidPlacement

        // Randomly select (or test select) horizontal or vertical orientation of ship.
        let randomOrientation
        let currentShipOrientation
        if(testOrientation !== false) {
            randomOrientation = testOrientation
            currentShipOrientation = ship.orientation[randomOrientation]
        }
        else {
            randomOrientation = Math.floor(Math.random() * ship.orientation.length)
            currentShipOrientation = ship.orientation[randomOrientation]
        }
        
        // Randomly select (or test select) starting positition of ship.  
        let randomPosition
        if(testPosition !== false) { randomPosition = testPosition }
        else { randomPosition = Math.floor(Math.random() * gameboard.length) }

        //Check if ship collides with other ships.
        invalidPlacement = checkShipCollision(randomPosition, currentShipOrientation)

        // If ship is horizontal, check horizontal bounds.
        if(randomOrientation === 0) {
            invalidPlacement = checkHorizontalOutOfBounds(randomPosition, currentShipOrientation)
        }

        // If ship is vertical, check vertical bounds.
        if(randomOrientation === 1) {
            invalidPlacement = checkVerticalOutOfBounds(randomPosition, currentShipOrientation)
        }

        if (invalidPlacement) { 
            placeShip(ship) // recursively call function to properly place ship.
        }
        else {
            // Populate gameboard.
            console.log(`${ship.type} being placed ${randomOrientation ? "vertically" : "horizontally"} at ${randomPosition}`);
            currentShipOrientation.forEach(index => gameboard[randomPosition + index].occupied = true)
        }
    }

    return {
        gameboard,
        initGameboard,
        displayArrayId,
        displayArrayOccupied,
        displayArray,
        placeAllShips,
        placeShip
    }
}

export default gameboardFactory