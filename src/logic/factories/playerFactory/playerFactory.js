import shipFactory from "../shipFactory/shipFactory"
import gameboardFactory from "../gameboardFactory/gameboardFactory"

const playerFactory = (playerName) => {
    let name = playerName
    let fleet = shipFactory()
    let gameboard = gameboardFactory()

    return {
        name, 
        fleet,
        gameboard
    }
}

export default playerFactory