import playerFactory from "./factories/playerFactory/playerFactory"

const gameEngineModule = () => {
    let players = []
    let currentPlayer = 0

    const initializePlayers = (playerName) => {
        let player = playerFactory(playerName)
        let playerAI = playerFactory("Admiral AI")

        players.push(player, playerAI)
    }

    const initializePlayersGameboard = () => {
        players.forEach(player => player.gameboard.initGameboard())
    }   

    const initializeAIGameboard = () => {
        players[1].gameboard.placeAllShips(players[1].fleet.ships)
    }

    const getPlayers = () => { return players }

    const getCurrentPlayer = () => { return currentPlayer }

    const nextPlayerTurn = () => { currentPlayer ^= 1 }

    const checkGameOver = () => {
        return players.some(player => {
            player.fleet.checkIfAllShipsSunk()
        })
    }

    const checkWhoWon = () => {
        if(players[0].fleet.checkIfAllShipsSunk()) return 0
        else if(players[1].fleet.checkIfAllShipsSunk()) return 1
    }

    return {
        players,
        initializePlayers,
        initializePlayersGameboard,
        initializeAIGameboard,
        getPlayers,
        getCurrentPlayer,
        nextPlayerTurn,
        checkGameOver,
        checkWhoWon
    }
}

export default gameEngineModule