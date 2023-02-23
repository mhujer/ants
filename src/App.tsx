import React, { useReducer } from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css';
import { CardComponent } from './CardComponent';

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
    private id: string;
    private type: CardDefinition;

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
    return Math.floor(Math.random() * max) + 1;
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


// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const cardFoundations = cardDefinitions[0]!;

interface PlayerGameState {
    castle: number,
    bricks: number,
}

interface GameState {
    playerOnTurn: Player;
    playerBlack: PlayerGameState,
    playerRed: PlayerGameState,
}

interface PlayCardAction {
    type: 'playCard';
    card: CardDefinition;
}

type GameAction = PlayCardAction;

const gameStateReducer = (gameState: GameState, action: GameAction): GameState => {
    console.dir(gameState);
    console.dir(action);

    switch (action.type) {
        case 'playCard': {
            const card = action.card;

            if (card.id === 'foundations') {

                if (gameState.playerOnTurn === Player.BLACK_ANTS) {
                    const newState = {
                        ...gameState,
                        playerBlack: {
                            ...gameState.playerBlack,
                            castle: gameState.playerBlack.castle + 1,
                            // @todo použít resource type
                            bricks: gameState.playerBlack.bricks - card.resourceRequiredAmount,
                        },
                        playerOnTurn: Player.RED_ANTS,
                    };

                    const extraNewState = {
                        ...newState,
                        playerRed: {
                            ...newState.playerRed,
                            bricks: newState.playerRed.bricks + 3,
                        },
                    };

                    return extraNewState;
                }

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (gameState.playerOnTurn === Player.RED_ANTS) {
                    const newState = {
                        ...gameState,
                        playerRed: {
                            ...gameState.playerRed,
                            castle: gameState.playerRed.castle + 1,
                            // @todo použít resource type
                            bricks: gameState.playerRed.bricks - card.resourceRequiredAmount,
                        },
                        playerOnTurn: Player.BLACK_ANTS,
                    };

                    const extraNewState = {
                        ...newState,
                        playerBlack: {
                            ...newState.playerBlack,
                            bricks: newState.playerBlack.bricks + 3,
                        },
                    };

                    return extraNewState;
                }
            }

            throw new Error(`Unhandled "${card.id}"!`);
        }
        default: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Uhandled "${(action.type)}"!`);
        }

    }
};

const App: React.FC = () => {
    const [gameState, dispatch] = useReducer(gameStateReducer, {
        playerOnTurn: Player.BLACK_ANTS,
        playerBlack: {
            castle: 30,
            bricks: 8,
        },
        playerRed: {
            castle: 30,
            bricks: 8,
        },
    });

    function playCard(card: CardDefinition) {
        dispatch({
            type: 'playCard',
            card: card,
        });
    }

    const cards = cardDefinitions.map((cardDefinition) => {
        const card = new Card(cardDefinition);
        return <CardComponent key={card.getId()} card={card} />;
    });

    return (
        <>
            <div className='game'>
                <button disabled={gameState.playerOnTurn !== Player.BLACK_ANTS}
                        onClick={() => playCard(cardFoundations)}>
                    Black build
                </button>
                <PlayerDashboard
                    builders={3}
                    bricks={gameState.playerBlack.bricks}
                    soldiers={2}
                    weapons={6}
                    mages={2}
                    crystals={7}
                    castle={gameState.playerBlack.castle}
                    wall={20}
                />
                <Castle castle={gameState.playerBlack.castle} wall={20} />
                <Castle castle={gameState.playerRed.castle} wall={8} />
                <PlayerDashboard
                    builders={3}
                    bricks={gameState.playerRed.bricks}
                    soldiers={3}
                    weapons={7}
                    mages={3}
                    crystals={8}
                    castle={gameState.playerRed.castle}
                    wall={8}
                />
                <button disabled={gameState.playerOnTurn !== Player.RED_ANTS} onClick={() => playCard(cardFoundations)}>
                    Red build
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {cards}
            </div>
        </>
    );
};

export default App;
