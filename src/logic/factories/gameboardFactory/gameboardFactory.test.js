import gameboardFactory from "./gameboardFactory"

test("test gameboardFactory is valid", () => {
    expect(gameboardFactory).toBeTruthy()
})

test("test gameboardFactory starts with empty gameboard", () => {
    const newGameboardFactory = gameboardFactory()
    expect(newGameboardFactory.gameboard).toStrictEqual([])
})

test("test initGameboard creates full array", () => {
    let testArray = []
    for(let i=0; i<100; i++) {
        let gameSquare = {
            occupied: false,
            hit: false,
            id: i
        }
        testArray.push(gameSquare)
    }

    const newGameboardFactory = gameboardFactory()
    expect(newGameboardFactory.initGameboard()).toStrictEqual(testArray)
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

    const newGameboardFactory = gameboardFactory()
    newGameboardFactory.initGameboard()

    expect(newGameboardFactory.displayArrayId()).toStrictEqual(testArray)
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

    const newGameboardFactory = gameboardFactory()
    newGameboardFactory.initGameboard()

    expect(newGameboardFactory.displayArrayOccupied()).toStrictEqual(testArray)
})
