import gameboardFactory from "./gameboardFactory"
import fleetFactory from "../fleetFactory/fleetFactory"

test("test gameboardFactory is valid", () => {
    expect(gameboardFactory).toBeTruthy()
})

test("test gameboardFactory starts with empty gameboard", () => {
    const newGameboard = gameboardFactory()
    expect(newGameboard.gameboard).toStrictEqual([])
})

test("test initGameboard creates full array", () => {
    let testArray = []
    for(let i=0; i<100; i++) {
        let gameSquare = {
            id: i, 
            occupied: false,
            hit: false,
            ship: {}
        }
        testArray.push(gameSquare)
    }

    const newGameboard = gameboardFactory()
    expect(newGameboard.initGameboard()).toStrictEqual(testArray)
})

test('test ID array formatting console.table() debugging', () => {
    let testArray = [
        [0,   1,  2,  3,  4,  5,  6,  7,  8,  9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
        [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
        [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
        [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
        [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
    ]

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()

    expect(newGameboard.displayArrayId()).toStrictEqual(testArray)
})

test('test occupied array formatting console.table() debugging', () => {
    let testArray = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()

    expect(newGameboard.displayArrayOccupied()).toStrictEqual(testArray)
})

test('test horizontal destroyer placement in correct area', () => {
    let testArray = [
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const newFleet = fleetFactory()
    const destroyer = newFleet.ships[0]

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()

    const placeShipSpy = jest.spyOn(newGameboard, "placeShip")
    placeShipSpy.mockImplementation(() => testArray)

    newGameboard.placeShip(destroyer)

    expect(newGameboard.displayArrayOccupied()).toMatchSnapshot()
})

test('test vertical destroyer placement in correct area', () => {
    let testArray = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const newFleet = fleetFactory()
    const destroyer = newFleet.ships[0]

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()

    const placeShipSpy = jest.spyOn(newGameboard, "placeShip")
    placeShipSpy.mockImplementation(() => testArray)

    newGameboard.placeShip(destroyer)

    expect(newGameboard.displayArrayOccupied()).toMatchSnapshot()
})

test('test horizontal destroyer placement in incorrect area', () => {
    let testArray = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const newFleet = fleetFactory()
    const destroyer = newFleet.ships[0]

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()

    const placeShipSpy = jest.spyOn(newGameboard, "placeShip")
    placeShipSpy.mockImplementation(() => testArray)

    newGameboard.placeShip(destroyer)

    expect(newGameboard.displayArrayOccupied()).not.toStrictEqual(testArray)
})

test('test horizontal destroyer placement in array out of bounds', () => {
    let testArray = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    ]

    const newFleet = fleetFactory()
    const destroyer = newFleet.ships[0]

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()

    const placeShipSpy = jest.spyOn(newGameboard, "placeShip")
    placeShipSpy.mockImplementation(() => testArray)

    newGameboard.placeShip(destroyer)

    expect(newGameboard.displayArrayOccupied()).not.toStrictEqual(testArray)
})


test('test vertical destroyer placement in incorrect area and array out of array bounds', () => {
    let testArray = [
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ]

    const newFleet = fleetFactory()
    const destroyer = newFleet.ships[0]

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()

    const placeShipSpy = jest.spyOn(newGameboard, "placeShip")
    placeShipSpy.mockImplementation(() => testArray)

    newGameboard.placeShip(destroyer)

    expect(newGameboard.displayArrayOccupied()).not.toStrictEqual(testArray)
})

test('test placing all ships on gameboard with no collisions', () => {
    let testArray = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    
    const newFleet = fleetFactory()
    const ships = newFleet.ships

    const newGameboard = gameboardFactory()
    newGameboard.initGameboard()
    newGameboard.placeAllShips(ships)

    let occupyArray = newGameboard.gameboard.map(square => +square.occupied)
    let totalShips = occupyArray.reduce((a, b) => a + b)

    expect(newGameboard.displayArrayOccupied()).not.toStrictEqual(testArray) // Array should not be empty after placements
    expect(totalShips).toBe(17) // If no collisions, there should be 17 spots occupied by the ships
})

// test('test carrier has position variable populated when placed vertically at position 57', () => {
//     let testArray = [
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
//     ]
    
//     const newFleet = fleetFactory()
//     const ships = newFleet.ships
//     let carrier = ships[4]

//     const newGameboard = gameboardFactory()
//     newGameboard.initGameboard()
//     newGameboard.placeShip(carrier, 57, 1)

//     expect(newGameboard.displayArrayOccupied()).toStrictEqual(testArray) // Array should not be empty after placements
//     expect(carrier.position).toStrictEqual([57, 67, 77, 87, 97]) // Array should not be empty after placements
// })

// test('test receiveAttack() correctly damages ship.', () => {    
//     let testHitArray = [
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     ]

//     const newFleet = fleetFactory()
//     const ships = newFleet.ships
//     let carrier = ships[4]

//     const newGameboard = gameboardFactory()
//     newGameboard.initGameboard()
//     newGameboard.placeShip(carrier, 57, 1) //carrier.position = [57, 67, 77, 87, 97]
//     newGameboard.receiveAttack(ships, 57)
//     newGameboard.receiveAttack(ships, 87)

//     expect(carrier.position).toStrictEqual(["X", 67, 77, "X", 97]) // Position should be updated
//     expect(newGameboard.displayArrayHit()).toStrictEqual(testHitArray) // Hit array should be updated
// }) 

// test('test receiveAttack() exits gracefully if no ship at position', () => {    
//     let testHitArray = [
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     ]

//     const newFleet = fleetFactory()
//     const ships = newFleet.ships
//     let carrier = ships[4]

//     const newGameboard = gameboardFactory()
//     newGameboard.initGameboard()
//     newGameboard.placeShip(carrier, 57, 1) //carrier.position = [57, 67, 77, 87, 97]
//     newGameboard.receiveAttack(ships, 98)
    
//     expect(carrier.position).toStrictEqual([57, 67, 77, 87, 97]) // Carrier should be undamaged
//     expect(newGameboard.displayArrayHit()).toStrictEqual(testHitArray) // Hit array should remain unchanged
// }) 

