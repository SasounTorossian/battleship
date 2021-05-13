const initGameBoard = require("./gameboardFactory")
// const placeShip = require("./gameboardFactory")

test("initializes game boad", () => {
    expect(initGameBoard).toBe("")
})