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
    carrier.position = [5, 15, 25, 35, 45] // Indicates vertical positioning starting from 5
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
    carrier.position = [5, 15, 25, 35, 45] // Indicates vertical positioning starting from 5
    expect(carrier.isSunk()).toBe(false)
})

test('test ship findShipFromPosition()', () => {
    let fleet = fleetFactory()
    let carrier = fleet.ships[4]
    carrier.position = [5, 15, 25, 35, 45] // Indicates vertical positioning starting from 5
    console.log(fleet.findShipFromPosition(25));
    console.log(fleet.findIndexFromPosition(carrier, 15));
    // expect(carrier.isSunk()).toBe(false)
})

// test('test hit() function damages ship', () => {
//     let fleet = fleetFactory()
//     let carrier = fleet.ships[4]
//     carrier.position = [5, 15, 25, 35, 45] // Indicates vertical positioning starting from 5
//     carrier.hit(5) 
//     expect(fleet.ships[0].hull).toStrictEqual([0, 1])
// })

// test('test if hull is partially damaged, isSunk() function returns false', () => {
//     let fleet = fleetFactory()
//     fleet.ships[0].hit(0)
//     expect(fleet.ships[0].isSunk()).toBe(false)
// })

// test('test if entire hull is damaged, isSunk() function returns true', () => {
//     let fleet = fleetFactory()
//     fleet.ships[0].hit(0)
//     fleet.ships[0].hit(1)
//     expect(fleet.ships[0].isSunk()).toBe(true)
// })
