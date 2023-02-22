import React from 'react';
import './global.scss';
import { Game } from './game/Game';

export const App: React.FC = () => {
    return (
        <>
            <Game />
            {/*<hr /><hr /><Demo />*/}
        </>
    );
};
