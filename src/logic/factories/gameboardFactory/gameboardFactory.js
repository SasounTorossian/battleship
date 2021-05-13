const gameBoardFactory = () => {

    let gameBoard = []

    const initGameBoard = () => {
        let gameBoard = []

        for(let i=0; i<100; i++) {
            let gameSquare = {
                occupied: false,
                hit: false,
                id: i
            }
            gameBoard.push(gameSquare)
        }
    }

    // Checks if ship has collided with other ships.
    // FIXME: Possibility of accessing out of bounds array.
    const checkShipCollision = (position, orientation) => {
        return orientation.some(index => gameBoard[position + index].occupied === true)
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
        let randomPosition = Math.floor(Math.random() * gameBoard.length)
        let currentShipPosition = gameBoard[randomPosition]

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
            currentShipOrientation.forEach(index => gameBoard[currentShipPosition + index].occupied = true)
        }
    }

    return gameBoard
}

export default gameBoardFactory

// module.exports = gameBoardFactory.initGameBoard