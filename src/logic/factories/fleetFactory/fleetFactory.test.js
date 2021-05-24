import fleetFactory from "./fleetFactory"

test('test entire fleet is composed of 5 ships', () => {
    let fleet = fleetFactory()
    expect(fleet.ships.length).toBe(5)
})

test('test ship starts with empty position variable', () => {
    let fleet = fleetFactory()
    expect(fleet.ships[0].position).toStrictEqual([])
})

test('test ship position variable can be populated', () => {
    let fleet = fleetFactory()
    let carrier = fleet.ships[4]
    carrier.position = [5, 15, 25, 35, 45]
    expect(carrier.position).toStrictEqual([5, 15, 25, 35, 45])
})

test('test ship isSunk() function reports false if ship hasnt been hit and position variable hasnt been initialized', () => {
    let fleet = fleetFactory()
    let carrier = fleet.ships[4]
    expect(carrier.isSunk()).toBe(false)
})

test('test ship isSunk() function reports false if ship hasnt been hit and position variable has been initialized', () => {
    let fleet = fleetFactory()
    let carrier = fleet.ships[4]
    carrier.position = [5, 15, 25, 35, 45]
    expect(carrier.isSunk()).toBe(false)
})

test('test hit() function damages ship', () => {
    let fleet = fleetFactory()
    let carrier = fleet.ships[4]
    carrier.position = [5, 15, 25, 35, 45]
    carrier.hit(3) 
    expect(carrier.position).toStrictEqual([5, 15, 25, "X", 45])
})

test('test if ship is partially damaged, isSunk() function returns false', () => {
    let fleet = fleetFactory()
    let carrier = fleet.ships[4]
    carrier.position = [5, 15, 25, 35, 45]
    carrier.hit(3) 
    expect(fleet.ships[0].isSunk()).toBe(false)
})

test('test if entire ship is damaged, isSunk() function returns true', () => {
    let fleet = fleetFactory()
    let carrier = fleet.ships[4]
    carrier.position = [5, 15, 25, 35, 45]
    carrier.hit(0) 
    carrier.hit(1) 
    carrier.hit(2) 
    carrier.hit(3) 
    carrier.hit(4) 
    expect(carrier.position).toStrictEqual(["X", "X", "X", "X", "X"])
    expect(carrier.isSunk()).toBe(true)
})