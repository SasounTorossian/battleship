import shipFactory from "./shipFactory"

test('test entire fleet is composed of 5 ships', () => {
    let ships = shipFactory()
    expect(ships.fleet.length).toBe(5)
})

test('test ship starts with undamaged hull', () => {
    let ships = shipFactory()
    expect(ships.fleet[0].hull).toStrictEqual([0, 0])
})

test('test ship isSunk() function reports false if hull intact', () => {
    let ships = shipFactory()
    expect(ships.fleet[0].isSunk()).toBe(false)
})

test('test ship hit() function damages hull', () => {
    let ships = shipFactory()
    ships.fleet[0].hit(1)
    expect(ships.fleet[0].hull).toStrictEqual([0, 1])
})

test('test if hull is partially damaged, isSunk() function returns false', () => {
    let ships = shipFactory()
    ships.fleet[0].hit(0)
    expect(ships.fleet[0].isSunk()).toBe(false)
})

test('test if entire hull is damaged, isSunk() function returns true', () => {
    let ships = shipFactory()
    ships.fleet[0].hit(0)
    ships.fleet[0].hit(1)
    expect(ships.fleet[0].isSunk()).toBe(true)
})
