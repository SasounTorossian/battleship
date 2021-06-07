import React from 'react'
import './Dock.css'

const Dock = React.forwardRef((props, shipRef) => {
    return (
        <div className="FleetDock" ref={shipRef}>
            <div className={`ship destroyer-container`} draggable={true}>
                <div className="ship-segment" id="destroyer-0"></div>
                <div className="ship-segment" id="destroyer-1"></div>
            </div>

            <div className={`ship submarine-container`} draggable={true}>
                <div className="ship-segment" id="submarine-0"></div>
                <div className="ship-segment" id="submarine-1"></div>
                <div className="ship-segment" id="submarine-2"></div>
            </div>

            <div className={`ship cruiser-container`} draggable={true}>
                <div className="ship-segment" id="cruiser-0"></div>
                <div className="ship-segment" id="cruiser-1"></div>
                <div className="ship-segment" id="cruiser-2"></div>
            </div>

            <div className={`ship battleship-container`} draggable={true}>
                <div className="ship-segment" id="battleship-0"></div>
                <div className="ship-segment" id="battleship-1"></div>
                <div className="ship-segment" id="battleship-2"></div>
                <div className="ship-segment" id="battleship-3"></div>
            </div>

            <div className={`ship carrier-container`} draggable={true}>
                <div className="ship-segment" id="carrier-0"></div>
                <div className="ship-segment" id="carrier-1"></div>
                <div className="ship-segment" id="carrier-2"></div>
                <div className="ship-segment" id="carrier-3"></div>
                <div className="ship-segment" id="carrier-5"></div>
            </div>
        </div>
    )
})

export default Dock
