import "./Gameboard.css"

const Gameboard = ({ player, humanPlayer, handleClick, dragEnter, dragOver, dragLeave, dragDrop }) => {
    
    let gameboard = player.gameboard
    return (
        <div className="Gameboard">
            {
                gameboard.gameboard.map(square => {
                    return (
                        <div 
                            className={`gamesquare gamesquare-${square.ship.type || "empty"} ${humanPlayer ? "user-gamesquare" : ""}`} 
                            data-id={square.id}
                            key={square.id}
                            onClick={() => handleClick(player, square.id)}
                            onDragEnter={dragEnter}
                            onDragOver={dragOver}
                            onDragLeave={dragLeave}
                            onDrop={dragDrop}
                        >

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Gameboard