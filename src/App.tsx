import React, { useState } from 'react';
import { Player } from './Player';

export type Players = 'player1' | 'player2';

const App: React.FC = () => {
    const initialPlayer: Players = 'player1';

    const [currentPlayer, setCurrentPlayer] = useState<Players>(initialPlayer);
    const [player1WallHeight, setPlayer1WallHeight] = useState(20);
    const [player2WallHeight, setPlayer2WallHeight] = useState(20);

    const playHandler = () => {
        if (currentPlayer === 'player1') {
            setPlayer1WallHeight((wallHeight) => wallHeight + 1);
            setCurrentPlayer('player2');
        } else {
            setPlayer2WallHeight((wallHeight) => wallHeight + 2);
            setCurrentPlayer('player1');
        }
    };

    return (
        <>
            <Player
                player="player1"
                currentPlayer={currentPlayer}
                playHandler={playHandler}
                wallHeight={player1WallHeight}
            />
            <Player
                player="player2"
                currentPlayer={currentPlayer}
                playHandler={playHandler}
                wallHeight={player2WallHeight}
            />
        </>
    );
};

export default App;
