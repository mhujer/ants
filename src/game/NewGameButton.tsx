import React from 'react';
import styles from './NewGameButton.module.scss';
import { useAppDispatch } from '../store/hooks';
import { startNewGame } from '../store/gameSlice';

export const NewGameButton: React.FC = () => {
    const dispatch = useAppDispatch();

    function handleNewGame() {
        dispatch(startNewGame());
    }

    return (
        <button className={styles.newGame} onClick={handleNewGame}>
            Začít novou hru
        </button>
    );
};
