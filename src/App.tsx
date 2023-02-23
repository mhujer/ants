import React from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css';
import { CardComponent } from './CardComponent';
import { useImmerReducer } from 'use-immer';
import { Draft } from 'immer';

enum Player {
    BLACK_ANTS,
    RED_ANTS,
}

export enum ResourceType {
    BRICKS,
    WEAPONS,
    CRYSTALS,
}

interface CardDefinition {
    id: string;
    name: string;
    description: string,
    requiredResources: {
        bricks?: number;
        weapons?: number;
        crystals?: number;
    },
    impact: {
        player?: {
            builders?: number;
            bricks?: number;
            soldiers?: number;
            weapons?: number;
            mages?: number;
            crystals?: number;
            castle?: number;
            wall?: number;
        },
        opponent?: {
            attack?: number,
            builders?: number;
            bricks?: number;
            soldiers?: number;
            weapons?: number;
            mages?: number;
            crystals?: number;
            castle?: number;
            wall?: number;
        },
    }
}

const cardDefinitions: CardDefinition[] = [
    {
        id: 'foundations',
        name: 'Základy',
        description: 'Hrad +2',
        requiredResources: {
            bricks: 1,
        },
        impact: {
            player: {
                castle: 2,
            },
        },
    },
    {
        id: 'wall',
        name: 'Zeď',
        description: 'Hradba +3',
        requiredResources: {
            bricks: 1,
        },
        impact: {
            player: {
                wall: 3,
            },
        },
    },
    {
        id: 'archer',
        name: 'Střelec',
        description: 'Útok 2',
        requiredResources: {
            weapons: 1,
        },
        impact: {
            opponent: {
                attack: 2,
            },
        },
    },
    {
        id: 'platoon',
        name: 'Četa',
        description: 'Útok 6',
        requiredResources: {
            weapons: 4,
        },
        impact: {
            opponent: {
                attack: 6,
            },
        },
    },
];

export class Card {
    private readonly id: string;
    private readonly type: CardDefinition;

    constructor(type: CardDefinition) {
        this.id = crypto.randomUUID();
        this.type = type;
    }

    getId(): string {
        return this.id;
    }

    getType(): CardDefinition {
        return this.type;
    }
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function generateCard(): Card {
    const randomCardDefinitionIndex = getRandomInt(cardDefinitions.length);

    const randomCardDefinition = cardDefinitions[randomCardDefinitionIndex];
    if (randomCardDefinition === undefined) {
        throw new Error(`Card definition "${randomCardDefinitionIndex}" not found!`);
    }
    return new Card(
        randomCardDefinition,
    );
}

interface PlayerGameState {
    readonly builders: number;
    readonly bricks: number;
    readonly soldiers: number;
    readonly weapons: number;
    readonly mages: number;
    readonly crystals: number;
    readonly castle: number;
    readonly wall: number;
    readonly cards: Card[],
}

interface GameState {
    readonly playerOnTurn: Player;
    readonly playerBlack: PlayerGameState,
    readonly playerRed: PlayerGameState,
}

interface PlayCardAction {
    type: 'playCard';
    card: Card;
}

type GameAction = PlayCardAction;

const gameStateReducer = (gameState: Draft<GameState>, action: GameAction): void => {
    switch (action.type) {
        case 'playCard': {
            const card = action.card;
            const cardDefinition = card.getType();

            const playerState = gameState.playerOnTurn === Player.BLACK_ANTS ? gameState.playerBlack : gameState.playerRed;
            const opponentState = gameState.playerOnTurn === Player.BLACK_ANTS ? gameState.playerRed : gameState.playerBlack;

            if (cardDefinition.requiredResources.bricks !== undefined) {
                // @todo check, že jde zahrát
                playerState.bricks -= cardDefinition.requiredResources.bricks;
            } else if (cardDefinition.requiredResources.weapons !== undefined) {
                // @todo check, že jde zahrát
                playerState.weapons -= cardDefinition.requiredResources.weapons;
            } else if (cardDefinition.requiredResources.crystals !== undefined) {
                // @todo check, že jde zahrát
                playerState.crystals -= cardDefinition.requiredResources.crystals;
            }

            if (cardDefinition.impact.player !== undefined) {
                if (cardDefinition.impact.player.castle !== undefined) {
                    playerState.castle += cardDefinition.impact.player.castle;
                }
                if (cardDefinition.impact.player.wall !== undefined) {
                    playerState.wall += cardDefinition.impact.player.wall;
                }
                if (cardDefinition.impact.player.builders !== undefined) {
                    playerState.builders += cardDefinition.impact.player.builders;
                }
                if (cardDefinition.impact.player.bricks !== undefined) {
                    playerState.bricks += cardDefinition.impact.player.bricks;
                }
                if (cardDefinition.impact.player.soldiers !== undefined) {
                    playerState.soldiers += cardDefinition.impact.player.soldiers;
                }
                if (cardDefinition.impact.player.weapons !== undefined) {
                    playerState.weapons += cardDefinition.impact.player.weapons;
                }
                if (cardDefinition.impact.player.mages !== undefined) {
                    playerState.mages += cardDefinition.impact.player.mages;
                }
                if (cardDefinition.impact.player.crystals !== undefined) {
                    playerState.crystals += cardDefinition.impact.player.crystals;
                }
            }

            if (cardDefinition.impact.opponent !== undefined) {
                if (cardDefinition.impact.opponent.attack !== undefined) {
                    const attack = cardDefinition.impact.opponent.attack;
                    const attackEffectOnWall = opponentState.wall >= attack ? attack : opponentState.wall;
                    let attackEffectOnCastle = 0;
                    if (attackEffectOnWall < attack) {
                        attackEffectOnCastle = attack - attackEffectOnWall;
                    }
                    opponentState.wall -= attackEffectOnWall;
                    opponentState.castle -= attackEffectOnCastle;
                }
                if (cardDefinition.impact.opponent.castle !== undefined) {
                    opponentState.castle += cardDefinition.impact.opponent.castle;
                }
                if (cardDefinition.impact.opponent.wall !== undefined) {
                    opponentState.wall += cardDefinition.impact.opponent.wall;
                }
                if (cardDefinition.impact.opponent.builders !== undefined) {
                    opponentState.builders += cardDefinition.impact.opponent.builders;
                }
                if (cardDefinition.impact.opponent.bricks !== undefined) {
                    opponentState.bricks += cardDefinition.impact.opponent.bricks;
                }
                if (cardDefinition.impact.opponent.soldiers !== undefined) {
                    opponentState.soldiers += cardDefinition.impact.opponent.soldiers;
                }
                if (cardDefinition.impact.opponent.weapons !== undefined) {
                    opponentState.weapons += cardDefinition.impact.opponent.weapons;
                }
                if (cardDefinition.impact.opponent.mages !== undefined) {
                    opponentState.mages += cardDefinition.impact.opponent.mages;
                }
                if (cardDefinition.impact.opponent.crystals !== undefined) {
                    opponentState.crystals += cardDefinition.impact.opponent.crystals;
                }
            }

            const nextPlayerState = gameState.playerOnTurn === Player.BLACK_ANTS ? gameState.playerRed : gameState.playerBlack;
            nextPlayerState.bricks += nextPlayerState.builders;
            nextPlayerState.weapons += nextPlayerState.soldiers;
            nextPlayerState.crystals += nextPlayerState.mages;

            gameState.playerOnTurn = gameState.playerOnTurn === Player.BLACK_ANTS ?  Player.RED_ANTS : Player.BLACK_ANTS;

            break;
        }

        default: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Uhandled "${(action.type)}"!`);
        }
    }
};

const App: React.FC = () => {
    const [gameState, dispatch] = useImmerReducer(gameStateReducer, {
        playerOnTurn: Player.BLACK_ANTS,
        playerBlack: {
            builders: 2,
            bricks: 8,
            soldiers: 2,
            weapons: 7,
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
            bricks: 8,
            soldiers: 2,
            weapons: 7,
            mages: 2,
            crystals: 5,
            castle: 20,
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
    });

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
            <div className='game'>
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
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                opacity: gameState.playerOnTurn !== Player.BLACK_ANTS ? 0.3 : 1,
            }}>
                {playerBlackCards}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                opacity: gameState.playerOnTurn !== Player.RED_ANTS ? 0.3 : 1,
            }}>
                {playerRedCards}
            </div>
        </>
    );
};

export default App;
