import React, { useEffect } from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css';
import { CardComponent } from './CardComponent';
import { useImmerReducer } from 'use-immer';
import { gameStateReducer, getInitialState } from './GameStateReducer';
import { Card } from './Card';
import { Player } from './Player';
import { Cards } from './Cards';
import { cardDefinitions } from './CardDefinitions';
import { playSound, Sound } from './Sounds';

const App: React.FC = () => {
    const [gameState, dispatch] = useImmerReducer(gameStateReducer, getInitialState());

    // play sound
    useEffect(() => {
        setTimeout(() => {
            if (gameState.playSound !== null) {
                playSound(gameState.playSound);
                dispatch({
                    type: 'SOUND_PLAYED',
                });
                // deal new card
                //setTimeout(() => {
                //    playSound(Sound.CARD_PLAYED);
                //}, 500);
            }
        }, 500);
    }, [gameState.playSound]);

    // play card sound
    useEffect(() => {
        if (gameState.lastPlayedCard !== undefined) {
            playSound(Sound.CARD_PLAYED);
        }
    }, [gameState.lastPlayedCard]);

    function playCard(card: Card) {
        dispatch({
            type: 'playCard',
            card: card,
        });
    }

    function discardCard(card: Card) {
        dispatch({
            type: 'discardCard',
            card: card,
        });
    }

    let playerWonContent = null;
    if (gameState.playerWon !== undefined) {
        if (gameState.playerWon === Player.BLACK_ANTS) {
            playerWonContent = <h1>Černí mravenci vyhráli!</h1>;
        }
        if (gameState.playerWon === Player.RED_ANTS) {
            playerWonContent = <h1>Červení mravenci vyhráli!</h1>;
        }
    }

    const playerOnTurnData = gameState.playerOnTurn === Player.BLACK_ANTS ? gameState.playerBlack : gameState.playerRed;

    //const allCards = cardDefinitions.map((cardDefinition) => new Card(cardDefinition));
    //const allCardsComponents = allCards.map((card) => <CardComponent card={card} key={card.getId()} />);

    return (
        <>
            {playerWonContent}
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
                {gameState.lastPlayedCard !== undefined ? (
                    <CardComponent key={gameState.lastPlayedCard.getId()} card={gameState.lastPlayedCard} />
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
                discardCardHandler={(card: Card) => discardCard(card)}
            />
            {/*<div style={{ display: 'flex', flexDirection: 'row' }}>{allCardsComponents}</div>*/}
        </>
    );
};

export default App;
