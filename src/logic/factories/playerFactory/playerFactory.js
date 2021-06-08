import fleetFactory from "../fleetFactory/fleetFactory"
import gameboardFactory from "../gameboardFactory/gameboardFactory"

const playerFactory = (playerName) => {
    // NOTE: Have current player true: false as variable?
    let name = playerName
    let fleet = fleetFactory()
    let gameboard = gameboardFactory()

    return {
        name, 
        fleet,
        gameboard
    }
}

export default playerFactory