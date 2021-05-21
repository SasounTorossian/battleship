const gameboardFactory = () => {

    let gameboard = []

    // Initialize gameboard as 1D array of 100 objects.
    const initGameboard = () => {
        for(let i=0; i<100; i++) {
            let gameSquare = { 
                id: i, 
                occupied: false, 
                hit: false 
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

    // Check if ship placement interferes with existing ships.
    const checkShipCollision = (position, orientation) => {
        return orientation.some(index => gameboard[position + index].occupied === true )
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

        // Randomly select (or test select) horizontal or vertical orientation of ship.
        let randomOrientation
        let currentShipOrientation
        if(testOrientation !== false) { randomOrientation = testOrientation }
        else { randomOrientation = Math.floor(Math.random() * ship.orientation.length) }
        currentShipOrientation = ship.orientation[randomOrientation]
        
        // Randomly select (or test select) starting positition of ship.  
        let randomPosition
        if(testPosition !== false) { randomPosition = testPosition }
        else { randomPosition = Math.floor(Math.random() * gameboard.length) }

        if((randomOrientation ? 
            checkVerticalOutOfBounds(randomPosition, currentShipOrientation) :
            checkHorizontalOutOfBounds(randomPosition, currentShipOrientation)) || 
            checkShipCollision(randomPosition, currentShipOrientation))  
        { 
            placeShip(ship) // recursively call function to properly place ship.
        }
        else {
            currentShipOrientation.forEach(index => gameboard[randomPosition + index].occupied = true) // Populate gameboard.
            currentShipOrientation.forEach(index => ship.position.push(randomPosition + index)) // Populates position variable in ship.
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