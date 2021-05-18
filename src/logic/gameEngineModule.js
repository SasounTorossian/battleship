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
        players[1].gameboard.placeAllShips(players[1].fleet.fleet)
    }

    const getPlayers = () => {
        return players
    }

    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const nextPlayerTurn = () => {
        currentPlayer ^= 1 
    }

    const checkGameOver = () => {
        return players.ever(player => {
            player.fleet.CheckIfFleetSunk()
        })
    }

    const checkWhoWon = () => {
        if(players[0].fleet.CheckIfFleetSunk()) return 1
        else if(players[1].fleet.CheckIfFleetSunk()) return 0
    }

    return {
        players,
        initializePlayers,
        initializePlayersGameboard,
        initializeAIGameboard,
        getPlayers
    }
}

export default gameEngineModule