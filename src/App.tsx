import React from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css';
import { CardComponent } from './CardComponent';
import { useImmerReducer } from 'use-immer';
import { gameStateReducer, getInitialState } from './GameStateReducer';
import { Card } from './Card';
import { Player } from './Player';

const App: React.FC = () => {
    const [gameState, dispatch] = useImmerReducer(gameStateReducer, getInitialState());

    function playCard(card: Card) {
        dispatch({
            type: 'playCard',
            card: card,
        });
    }

    const playerBlackCards = gameState.playerBlack.cards.map((card) => {
        return <CardComponent key={card.getId()} card={card} playCardHandler={() => playCard(card)} />;
    });

    const playerRedCards = gameState.playerRed.cards.map((card) => {
        return <CardComponent key={card.getId()} card={card} playCardHandler={() => playCard(card)} />;
    });

    return (
        <>
            <div className="game">
                <PlayerDashboard
                    builders={gameState.playerBlack.builders}
                    bricks={gameState.playerBlack.bricks}
                    soldiers={gameState.playerBlack.soldiers}
                    weapons={gameState.playerBlack.weapons}
                    mages={gameState.playerBlack.mages}
                    crystals={gameState.playerBlack.crystals}
                    castle={gameState.playerBlack.castle}
                    wall={gameState.playerBlack.wall}
                />
                <Castle castle={gameState.playerBlack.castle} wall={gameState.playerBlack.wall} />
                <Castle castle={gameState.playerRed.castle} wall={gameState.playerRed.wall} />
                <PlayerDashboard
                    builders={gameState.playerRed.builders}
                    bricks={gameState.playerRed.bricks}
                    soldiers={gameState.playerRed.soldiers}
                    weapons={gameState.playerRed.weapons}
                    mages={gameState.playerRed.mages}
                    crystals={gameState.playerRed.crystals}
                    castle={gameState.playerRed.castle}
                    wall={gameState.playerRed.wall}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    opacity: gameState.playerOnTurn !== Player.BLACK_ANTS ? 0.3 : 1,
                }}
            >
                {playerBlackCards}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    opacity: gameState.playerOnTurn !== Player.RED_ANTS ? 0.3 : 1,
                }}
            >
                {playerRedCards}
            </div>
        </>
    );
};

export default App;
