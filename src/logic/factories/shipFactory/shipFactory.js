const shipFactory = () => {
    const fleet = [
        {
            type: "Destroyer",
            length: 2,
            orientation: [
                [0, 1],
                [0, 10]
            ]
        },
        {
            type: "Submarine",
            length: 3,
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ]
        },
        {
            type: "Cruiser",
            length: 3,
            orientation: [
                [0, 1, 2],
                [0, 10, 20]
            ]
        },
        {
            type: "Battleship",
            length: 4,
            orientation: [
                [0, 1, 2, 3],
                [0, 10, 20, 30]
            ]
        },
        {
            type: "Carrier",
            length: 5,
            orientation: [
                [0, 1, 2, 3, 4],
                [0, 10, 20, 30, 40]
            ]
        },
    ]

    return {
        fleet
    }

} 

export default fleetFactory