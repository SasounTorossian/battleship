const gameboardFactory = () => {

    let gameboard = []

    // Initialize gameboard as 1D array of 100 objects.
    const initGameboard = () => {
        for(let i=0; i<100; i++) {
            let gameSquare = { 
                id: i, 
                occupied: false, // NOTE: Could use ship{} as bool indicator of occupied?
                hit: false,
                ship: {}
            }
            gameboard.push(gameSquare)
        }

        return gameboard
    }

    // Handles oncoming clicks on the gameboard.
    const clickHandler = (e, ships, squareID) => {
        //NOTE: based on e.target.ship.type, have different sound effects play?
        console.log(e.target);
        console.log(ships);
        console.log(squareID);
        receiveAttack(ships, squareID)
    }

    // Displays gameboard 1D array as 2D array of hits. 
    // Used for debugging with console.table().
    const displayArrayHit = () => {
        let displayArray = []
        let displayGameboard = gameboard.map(el => +el["hit"])

        while(displayGameboard.length) {
            displayArray.push( displayGameboard.splice(0, 10) )
        }

        return displayArray
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

    // NOTE: Replace testPosition and testOrientation with mock functions in Jest.
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
            currentShipOrientation.forEach(index => {
                gameboard[randomPosition + index].occupied = true // Populate gameboard occupied variable.
                gameboard[randomPosition + index].ship = ship // Populate gameboard ship variable.
                ship.position.push(randomPosition + index) // Populates position variable in ship.
            }) 
        }
    }

    // Find which ship is occupying a particular position. 
    const findShipFromPosition = (ships, pos) => {
        return ships.find(ship => {
            return ship.position.indexOf(pos) !== -1
        })
    }

    // NOTE: Could possible move this to hit() function in ship objects.
    // Find which ship index corresponds to particular position. 
    const findIndexFromPosition = (ship, pos) => {
        return ship.position.indexOf(pos)
    }

    // Takes gameboard square as an ID, and passes hit to ship if it exists.
    const receiveAttack = (ships, hitPosition) => {
        
        if(gameboard[hitPosition].hit) {
            return
        }
        else if(!gameboard[hitPosition].occupied) {
            gameboard[hitPosition].hit = true
            return
        }
        else {
            gameboard[hitPosition].hit = true
            let ship = findShipFromPosition(ships, hitPosition)
            let index = findIndexFromPosition(ship, hitPosition)
            ship.hit(index)
            //TODO: Need to call gameEngine here to progress game.
        }
    }

    return {
        gameboard,
        initGameboard,
        clickHandler,
        displayArrayHit,
        displayArrayId,
        displayArrayOccupied,
        displayArray,
        placeAllShips,
        placeShip,
        receiveAttack
    }
}

export default gameboardFactory