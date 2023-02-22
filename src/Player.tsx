import React from 'react';
import { Players } from './App';

interface Props {
    player: Players;
    currentPlayer: Players;
    playHandler: (player: Players) => void;
    wallHeight: number;
}

export const Player: React.FC<Props> = (props) => {
    const buildHandler = () => {
        props.playHandler(props.player);
    };

    const isActivePlayer = props.player === props.currentPlayer;

    return (
        <div style={{ border: isActivePlayer ? '2px solid green' : '' }}>
            <h1>{props.wallHeight}</h1>
            {isActivePlayer && <button onClick={buildHandler}>Build!</button>}
        </div>
    );
};
