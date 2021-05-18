import playerFactory from "./factories/playerFactory/playerFactory"

const gameEngine = () => {
    let players = []
    let currentPlayer = 0
    // let assignCurrentPlayer

    const instantiatePlayers = (playerName) => {
        let player = playerFactory(playerName)
        let playerAI = playerFactory("Admiral AI")

        players.push(player, playerAI)
    }

    const initializePlayersGameboard = () => {
        players.forEach(player => player.gameboard.initGameboard())
    }   

    const InitializeAIGameboard = () => {
        player[1].gameboard.placeAllShips()
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
        if(player[0].fleet.CheckIfFleetSunk()) return 1
        else if(player[1].fleet.CheckIfFleetSunk()) return 0
    }

    return {
        players,
        instantiatePlayers,
        initializePlayersGameboard,
        InitializeAIGameboard,
    }
}

export default gameEngine