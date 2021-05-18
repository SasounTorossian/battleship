import playerFactory from "./playerFactory"
import shipFactory from "../shipFactory/shipFactory"
import gameboardFactory from "../gameboardFactory/gameboardFactory"

test('test player object created correctly', () => {
    const player = playerFactory("John Doe")

    let testPlayer ={
        name: "John Doe",
        fleet: shipFactory(),
        gameBoard: gameboardFactory()
    }
    const expectedName = "John Doe"
    const expectedFleet = shipFactory()
    const expectedGameboard = gameboardFactory()

    expect(player.name).toBe(expectedName)
    expect(player.fleet).toStrictEqual(expectedFleet)
    expect(player.gameboard).toStrictEqual(expectedGameboard)
})
