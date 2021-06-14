import gameboardFactory from "../factories/gameboardFactory/gameboardFactory"

const gameboardFactoryHelpers = () => {

 // Displays gameboard 1D array as 2D array of hits. 
    // Used for debugging with console.table().
    const displayArrayHit = (gameboard) => {
        let displayArray = []
        let displayGameboard = gameboard.map(el => +el["hit"])

        while(displayGameboard.length) {
            displayArray.push( displayGameboard.splice(0, 10) )
        }

        return displayArray
    }

    // Displays gameboard 1D array as 2D array of IDs. 
    // Used for debugging with console.table().
    const displayArrayId = (gameboard) => {
        let displayArray = []
        let displayGameboard = gameboard.map(el => el["id"])

        while(displayGameboard.length) {
            displayArray.push( displayGameboard.splice(0, 10) )
        }

        return displayArray
    }

    // Displays gameboard 1D array as 2D array of occupied spaces. 
    // Used for debugging with console.table().
    const displayArrayOccupied = (gameboard) => {
        let displayArray = []
        let displayGameboard = gameboard.map(el => +el["occupied"])

        while(displayGameboard.length) {
            displayArray.push( displayGameboard.splice(0, 10) )
        }

        return displayArray
    }

    // Displays gameboard 1D array as 2D array of objects. 
    // Used for debugging with console.table().
    const displayArray = (gameboard) => {
        let displayArray = []

        while(gameboard.length) {
            displayArray.push( gameboard.splice(0, 10) )
        }

        return displayArray
    }

    return {
        displayArrayHit,
        displayArrayId,
        displayArrayOccupied,
        displayArray
    }
}

export default gameboardFactoryHelpers