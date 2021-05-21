import playerFactory from "./playerFactory"
import fleetFactory from "../fleetFactory/fleetFactory"
import gameboardFactory from "../gameboardFactory/gameboardFactory"

test('test player object created correctly', () => {
    const player = playerFactory("John Doe")

    let testPlayer ={
        name: "John Doe",
        fleet: fleetFactory(),
        gameBoard: gameboardFactory()
    }
    
    const expectedName = "John Doe"
    const expectedFleet = fleetFactory()
    const expectedGameboard = gameboardFactory()

    expect(player.name).toBe(expectedName)
    expect(JSON.stringify(player.fleet)).toStrictEqual(JSON.stringify(expectedFleet))
    expect(JSON.stringify(player.gameboard)).toStrictEqual(JSON.stringify(expectedGameboard))
})
