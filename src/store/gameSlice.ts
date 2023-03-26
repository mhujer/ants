import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../game/Player/Player';
import { RootState } from './store';
import { Card, generateCard } from '../game/Card/Card';
import { Sound } from '../sounds/Sounds';
import { cardDefinitions } from '../game/Card/CardDefinitions';

export interface PlayerGameState {
    readonly builders: number;
    readonly bricks: number;
    readonly soldiers: number;
    readonly weapons: number;
    readonly mages: number;
    readonly crystals: number;
    readonly castle: number;
    readonly wall: number;
    readonly cards: Card[];
}

export interface GameState {
    readonly playerOnTurn: Player;
    readonly playerWon?: Player;
    readonly lastPlayedCard?: Card;
    readonly playerBlack: PlayerGameState;
    readonly playerRed: PlayerGameState;
    readonly playSound: Sound | null;
}

function getInitialState(): GameState {
    return {
        playerOnTurn: 'black',
        playerBlack: {
            builders: 2,
            bricks: 5,
            soldiers: 2,
            weapons: 5,
            mages: 2,
            crystals: 5,
            castle: 30,
            wall: 10,
            cards: [
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
            ],
        },
        playerRed: {
            builders: 2,
            bricks: 5,
            soldiers: 2,
            weapons: 5,
            mages: 2,
            crystals: 5,
            castle: 30,
            wall: 10,
            cards: [
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
                generateCard(),
            ],
        },
        playSound: null,
    };
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: getInitialState(),
    reducers: {
        cardAnimationStarted: (state) => {
            state.playSound = 'cardPlayed';
        },
        cardPlayed: {
            prepare: (card: Card) => {
                return {
                    payload: {
                        cardPlayed: card,
                        newCard: generateCard(),
                    },
                };
            },
            reducer: (state, action: PayloadAction<{ cardPlayed: Card; newCard: Card }>) => {
                const card = action.payload.cardPlayed;

                const minimalGameStateValues = {
                    builders: 1,
                    bricks: 0,
                    soldiers: 1,
                    weapons: 0,
                    mages: 1,
                    crystals: 0,
                    castle: 0,
                    wall: 0,
                };

                if (state.playerWon !== undefined) {
                    console.error('Game is over!');
                    return;
                }

                const cardDefinition = cardDefinitions[card.type];

                const playerState = state.playerOnTurn === 'black' ? state.playerBlack : state.playerRed;
                const opponentState = state.playerOnTurn === 'black' ? state.playerRed : state.playerBlack;

                if (cardDefinition.requiredResources.bricks !== undefined) {
                    if (playerState.bricks < cardDefinition.requiredResources.bricks) {
                        throw new Error('Should not happen!');
                    }
                    playerState.bricks -= cardDefinition.requiredResources.bricks;
                } else if (cardDefinition.requiredResources.weapons !== undefined) {
                    if (playerState.weapons < cardDefinition.requiredResources.weapons) {
                        throw new Error('Should not happen!');
                    }
                    playerState.weapons -= cardDefinition.requiredResources.weapons;
                } else if (cardDefinition.requiredResources.crystals !== undefined) {
                    if (playerState.crystals < cardDefinition.requiredResources.crystals) {
                        throw new Error('Should not happen!');
                    }
                    playerState.crystals -= cardDefinition.requiredResources.crystals;
                }

                if (cardDefinition.impact.player !== undefined) {
                    if (cardDefinition.impact.player.castle !== undefined) {
                        playerState.castle += cardDefinition.impact.player.castle;
                        if (playerState.castle < minimalGameStateValues.castle) {
                            playerState.castle = minimalGameStateValues.castle;
                        }
                    }
                    if (cardDefinition.impact.player.wall !== undefined) {
                        playerState.wall += cardDefinition.impact.player.wall;
                        if (playerState.wall < minimalGameStateValues.wall) {
                            playerState.wall = minimalGameStateValues.wall;
                        }
                    }
                    if (cardDefinition.impact.player.builders !== undefined) {
                        playerState.builders += cardDefinition.impact.player.builders;
                        if (playerState.builders < minimalGameStateValues.builders) {
                            playerState.builders = minimalGameStateValues.builders;
                        }
                    }
                    if (cardDefinition.impact.player.bricks !== undefined) {
                        playerState.bricks += cardDefinition.impact.player.bricks;
                        if (playerState.bricks < minimalGameStateValues.bricks) {
                            playerState.bricks = minimalGameStateValues.bricks;
                        }
                    }
                    if (cardDefinition.impact.player.soldiers !== undefined) {
                        playerState.soldiers += cardDefinition.impact.player.soldiers;
                        if (playerState.soldiers < minimalGameStateValues.soldiers) {
                            playerState.soldiers = minimalGameStateValues.soldiers;
                        }
                    }
                    if (cardDefinition.impact.player.weapons !== undefined) {
                        playerState.weapons += cardDefinition.impact.player.weapons;
                        if (playerState.weapons < minimalGameStateValues.weapons) {
                            playerState.weapons = minimalGameStateValues.weapons;
                        }
                    }
                    if (cardDefinition.impact.player.mages !== undefined) {
                        playerState.mages += cardDefinition.impact.player.mages;
                        if (playerState.mages < minimalGameStateValues.mages) {
                            playerState.mages = minimalGameStateValues.mages;
                        }
                    }
                    if (cardDefinition.impact.player.crystals !== undefined) {
                        playerState.crystals += cardDefinition.impact.player.crystals;
                        if (playerState.crystals < minimalGameStateValues.crystals) {
                            playerState.crystals = minimalGameStateValues.crystals;
                        }
                    }
                }

                let wasCastleAttacked = false;

                if (cardDefinition.impact.opponent !== undefined) {
                    if (cardDefinition.impact.opponent.attack !== undefined) {
                        const attack = cardDefinition.impact.opponent.attack;
                        const attackEffectOnWall = opponentState.wall >= attack ? attack : opponentState.wall;
                        let attackEffectOnCastle = 0;
                        if (attackEffectOnWall < attack) {
                            attackEffectOnCastle = attack - attackEffectOnWall;
                            wasCastleAttacked = true;
                        }
                        opponentState.wall -= attackEffectOnWall;
                        opponentState.castle -= attackEffectOnCastle;
                    }
                    if (cardDefinition.impact.opponent.castle !== undefined) {
                        opponentState.castle += cardDefinition.impact.opponent.castle;
                        if (opponentState.castle < minimalGameStateValues.castle) {
                            opponentState.castle = minimalGameStateValues.castle;
                        }
                    }
                    if (cardDefinition.impact.opponent.wall !== undefined) {
                        opponentState.wall += cardDefinition.impact.opponent.wall;
                        if (opponentState.wall < minimalGameStateValues.wall) {
                            opponentState.wall = minimalGameStateValues.wall;
                        }
                    }
                    if (cardDefinition.impact.opponent.builders !== undefined) {
                        opponentState.builders += cardDefinition.impact.opponent.builders;
                        if (opponentState.builders < minimalGameStateValues.builders) {
                            opponentState.builders = minimalGameStateValues.builders;
                        }
                    }
                    if (cardDefinition.impact.opponent.bricks !== undefined) {
                        opponentState.bricks += cardDefinition.impact.opponent.bricks;
                        if (opponentState.bricks < minimalGameStateValues.bricks) {
                            opponentState.bricks = minimalGameStateValues.bricks;
                        }
                    }
                    if (cardDefinition.impact.opponent.soldiers !== undefined) {
                        opponentState.soldiers += cardDefinition.impact.opponent.soldiers;
                        if (opponentState.soldiers < minimalGameStateValues.soldiers) {
                            opponentState.soldiers = minimalGameStateValues.soldiers;
                        }
                    }
                    if (cardDefinition.impact.opponent.weapons !== undefined) {
                        opponentState.weapons += cardDefinition.impact.opponent.weapons;
                        if (opponentState.weapons < minimalGameStateValues.weapons) {
                            opponentState.weapons = minimalGameStateValues.weapons;
                        }
                    }
                    if (cardDefinition.impact.opponent.mages !== undefined) {
                        opponentState.mages += cardDefinition.impact.opponent.mages;
                        if (opponentState.mages < minimalGameStateValues.mages) {
                            opponentState.mages = minimalGameStateValues.mages;
                        }
                    }
                    if (cardDefinition.impact.opponent.crystals !== undefined) {
                        opponentState.crystals += cardDefinition.impact.opponent.crystals;
                        if (opponentState.crystals < minimalGameStateValues.crystals) {
                            opponentState.crystals = minimalGameStateValues.crystals;
                        }
                    }
                }

                // if the attack overflows from wall to castle, play sound of castle being destroyed
                if (cardDefinition.sound === 'destroyWall' && wasCastleAttacked) {
                    state.playSound = 'destroyCastle';
                } else {
                    state.playSound = cardDefinition.sound;
                }

                // draw a new card
                state.lastPlayedCard = card;
                const playedCardIndex = playerState.cards.findIndex((cardItem) => cardItem.id === card.id);
                playerState.cards[playedCardIndex] = action.payload.newCard;

                if (playerState.castle >= 100) {
                    state.playerWon = state.playerOnTurn;
                    state.playSound = 'fanfare';
                }
                if (opponentState.castle <= 0) {
                    state.playerWon = state.playerOnTurn;
                    state.playSound = 'fanfare';
                }

                // next turn
                const nextPlayerState = state.playerOnTurn === 'black' ? state.playerRed : state.playerBlack;
                nextPlayerState.bricks += nextPlayerState.builders;
                nextPlayerState.weapons += nextPlayerState.soldiers;
                nextPlayerState.crystals += nextPlayerState.mages;

                state.playerOnTurn = state.playerOnTurn === 'black' ? 'red' : 'black';
            },
        },
        soundPlayed: (state) => {
            state.playSound = null;
        },
    },
});

export const { cardAnimationStarted, cardPlayed, soundPlayed } = gameSlice.actions;

export const selectGame = (state: RootState): GameState => state.game;

export default gameSlice.reducer;
