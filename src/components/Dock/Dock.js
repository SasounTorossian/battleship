import './Dock.css'

const Dock = ({ players, horizontal, mouseDown,  dragStart, dragEnd}) => {
    let humanPlayerShips = players[0].fleet.ships
    return (
        <div className={`Dock ${horizontal ? "dock-horizontal" : "dock-vertical"}`}>
            {humanPlayerShips.map(ship => {
                if(ship.position.length === 0) {
                    return (
                        <div 
                            className={`ship ${ship.type}-container-${horizontal ? "horizontal" : "vertical"}`} 
                            draggable={true} 
                            onMouseDown={mouseDown} 
                            onDragStart={dragStart}
                            onDragEnd={dragEnd}
                        >
                            {ship.orientation[0].map(idx => {
                                return (
                                    <div className="ship-segment" id={`${ship.type}-${idx}`}></div>
                                )
                            })}
                        </div>
                    )
                }
                else {
                    return(<div></div>)
                }
            })}
        </div>
    )
}

export default Dock
