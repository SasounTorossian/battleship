import gameEngine from "../../gameEngine"

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

    // NOTE: Should probably be handled from gameEngine. instead of calling gameEngine from gameboard.
    const shipDragAndDropHandler = (player) => {
        console.log(player.fleet.ships);
        gameEngine.updatePlayersState()
    }

    const clearBoard = () => { gameboard.length = 0 }

    const getBoard = () => { return gameboard }

    // Check if ship placement interferes with existing ships.
    const checkShipCollision = (orientation, position) => {
        return orientation.some(index => gameboard[position + index].occupied === true )
    }

    // Check if ship is out of bounds on horizontal axis.
    const checkHorizontalOutOfBounds = (orientation, position) => {
        return orientation.some(index => (position % 10) + index >= 10)
    }

    // Check if ship is out of bounds on vertical axis.
    const checkVerticalOutOfBounds = (orientation, position) => {
        return orientation.some(index => (position + index >= 100))
    }

    // Places all fleet ships onto gameboard
    const placeAllShips = (fleet) => {
        fleet.forEach(ship => placeShip(ship))
    }

    // Places each ship object on the gameboard according to its parameters.
    const placeShip = (ship) => {

        // Randomly select (or test select) horizontal or vertical orientation of ship.
        let currentShipOrientation
        let randomOrientation = Math.floor(Math.random() * ship.orientation.length)
        let horizontal = randomOrientation ? false : true
        currentShipOrientation = ship.orientation[randomOrientation]

        
        // Randomly select (or test select) starting positition of ship.  
        let randomPosition = Math.floor(Math.random() * gameboard.length)

        if((horizontal && checkHorizontalOutOfBounds(currentShipOrientation, randomPosition)) || 
            (!horizontal && checkVerticalOutOfBounds(currentShipOrientation, randomPosition)) ||
            (checkShipCollision(currentShipOrientation, randomPosition)))
            {
                placeShip(ship)
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

    // NOTE: Could move all of this handling into gameEngine.
    // Takes gameboard square as an ID, and passes hit to ship if it exists.
    const receiveAttack = (ships, hitPosition) => {
        
        if(gameboard[hitPosition].hit) { // If position already hit, don't do anything
            return
        }
        else if(!gameboard[hitPosition].occupied) { // If position is empty but not hit, mark it as hit
            gameboard[hitPosition].hit = true
            return
        }
        else { //If position is occupied and not hit, then attack ship.
            gameboard[hitPosition].hit = true
            let ship = findShipFromPosition(ships, hitPosition) // NOTE: Could maybe check the gameboard array instead to find which ship it is.
            let index = findIndexFromPosition(ship, hitPosition) 
            ship.hit(index)
        }
    }

    return {
        gameboard,
        clearBoard,
        getBoard,
        initGameboard,
        shipDragAndDropHandler,
        placeAllShips,
        placeShip,
        receiveAttack
    }
}

export default gameboardFactory