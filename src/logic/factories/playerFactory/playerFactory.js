import shipFactory from "../shipFactory/shipFactory"
import gameboardFactory from "../gameboardFactory/gameboardFactory"

const playerFactory = (playerName) => {
    let name = playerName
    let fleet = shipFactory()
    let gameBoard = gameboardFactory()

    return {
        name, 
        fleet,
        gameBoard
    }
}

export default playerFactory