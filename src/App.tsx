import React from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css';
import { CardComponent } from './CardComponent';
import { useImmerReducer } from 'use-immer';
import { gameStateReducer, getInitialState } from './GameStateReducer';
import { Card } from './Card';
import { Player } from './Player';
import { Cards } from './Cards';

const App: React.FC = () => {
    const [gameState, dispatch] = useImmerReducer(gameStateReducer, getInitialState());

    function playCard(card: Card) {
        dispatch({
            type: 'playCard',
            card: card,
        });
    }

    const playerOnTurnData = gameState.playerOnTurn === Player.BLACK_ANTS ? gameState.playerBlack : gameState.playerRed;

    return (
        <>
            <div className="game">
                <PlayerDashboard
                    isOnTurn={gameState.playerOnTurn === Player.BLACK_ANTS}
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
                {gameState.discardedCard !== undefined ? (
                    <CardComponent key={gameState.discardedCard.getId()} card={gameState.discardedCard} />
                ) : null}
                <Castle castle={gameState.playerRed.castle} wall={gameState.playerRed.wall} />
                <PlayerDashboard
                    isOnTurn={gameState.playerOnTurn === Player.RED_ANTS}
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
            <Cards
                playerResources={{
                    bricks: playerOnTurnData.bricks,
                    weapons: playerOnTurnData.weapons,
                    crystals: playerOnTurnData.crystals,
                }}
                cardsInHand={playerOnTurnData.cards}
                playCardHandler={(card: Card) => playCard(card)}
            />
        </>
    );
};

export default App;
