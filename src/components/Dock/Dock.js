import React from 'react'
import './Dock.css'

const Dock = () => {
    return (
        <div className="FleetDock">
            <div className={`ship destroyer-container`} draggable={true}>
                <div id="destroyer-0"></div>
                <div id="destroyer-1"></div>
            </div>

            <div className={`ship submarine-container`} draggable={true}>
                <div id="submarine-0"></div>
                <div id="submarine-1"></div>
                <div id="submarine-2"></div>
            </div>

            <div className={`ship cruiser-container`} draggable={true}>
                <div id="cruiser-0"></div>
                <div id="cruiser-1"></div>
                <div id="cruiser-2"></div>
            </div>

            <div className={`ship battleship-container`} draggable={true}>
                <div id="battleship-0"></div>
                <div id="battleship-1"></div>
                <div id="battleship-2"></div>
                <div id="battleship-3"></div>
            </div>

            <div className={`ship carrier-container`} draggable={true}>
                <div id="carrier-0"></div>
                <div id="carrier-1"></div>
                <div id="carrier-2"></div>
                <div id="carrier-3"></div>
                <div id="carrier-5"></div>
            </div>
        </div>
    )
}

export default Dock
