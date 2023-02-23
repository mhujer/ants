export interface CardDefinition {
    id: string;
    name: string;
    description: string;
    requiredResources: {
        bricks?: number;
        weapons?: number;
        crystals?: number;
    };
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
        };
        opponent?: {
            attack?: number;
            builders?: number;
            bricks?: number;
            soldiers?: number;
            weapons?: number;
            mages?: number;
            crystals?: number;
            castle?: number;
            wall?: number;
        };
    };
}

export const cardDefinitions: CardDefinition[] = [
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
