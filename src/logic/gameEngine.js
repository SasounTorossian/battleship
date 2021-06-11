import playerFactory from "./factories/playerFactory/playerFactory"

const gameEngine = (() => {
    let setPlayersInternal
    let players = []
    let currentPlayer = 0
    
    // Allows App.js to pass handler function to gameEngine. 
    // Similar to how App.js would pass a handler function down to a child component.
    const initializeSetPlayers = (setPlayers) => {
        setPlayersInternal = setPlayers
    }

    const updateHumanPlayer = (player) => {
        players[0] = player
    }
    
    // Call passed App.js handler function.
    const updatePlayersState = () => {
        const tempPlayers = [...players]
        setPlayersInternal(tempPlayers)
    }

    // Initialized player and AI with chosen player name.
    const initializePlayers = (playerName, AIName) => {
        players.push(
            playerFactory(playerName), 
            playerFactory(AIName)
        )
    }

    // Initialized gameboard for both players.
    const initializePlayersGameboard = () => {
        players.forEach(player => player.gameboard.initGameboard())
    }   

    // places AI ships randomly on previously initialized gameboard. 
    const placeAIShips = () => {
        players[1].gameboard.placeAllShips(players[1].fleet.ships)
    }

    // Returns the players as an array.
    const getPlayers = () => { return players }

    // Shows who the current player is.
    const getCurrentPlayer = () => { return currentPlayer }

    // Switches to the next player.
    const nextPlayerTurn = () => { currentPlayer ^= 1 }

    // TODO: Should combine both into single function.
    // Check if game is finished
    const checkGameOver = () => {
        return players.some(player => {
            player.fleet.checkIfAllShipsSunk()
        })
    }

    // If game is finished, check who won.
    const checkWhoWon = () => {
        if(players[0].fleet.checkIfAllShipsSunk()) return 0
        else if(players[1].fleet.checkIfAllShipsSunk()) return 1
    }

    return {
        updateHumanPlayer,
        initializeSetPlayers,
        updatePlayersState,
        initializePlayers,
        initializePlayersGameboard,
        placeAIShips,
        getPlayers,
        getCurrentPlayer,
        nextPlayerTurn,
        checkGameOver,
        checkWhoWon,
    }
})()

export default gameEngine