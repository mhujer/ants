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
    // type "building"
    {
        id: 'wall',
        name: 'Zeď',
        description: 'Zeď +3',
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
        id: 'foundations', // original "base"
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
        id: 'defense',
        name: 'Obrana',
        description: 'Zeď +6',
        requiredResources: {
            bricks: 3,
        },
        impact: {
            player: {
                wall: 6,
            },
        },
    },
    {
        id: 'reserve',
        name: 'Rezervy',
        description: 'Hrad +8, Zeď -4',
        requiredResources: {
            bricks: 3,
        },
        impact: {
            player: {
                castle: 8,
                wall: -4,
            },
        },
    },
    {
        id: 'tower',
        name: 'Věž',
        description: 'Hrad +5',
        requiredResources: {
            bricks: 5,
        },
        impact: {
            player: {
                castle: 5,
            },
        },
    },
    {
        id: 'school',
        name: 'Škola',
        description: 'Stavitelé +1',
        requiredResources: {
            bricks: 8,
        },
        impact: {
            player: {
                builders: 1,
            },
        },
    },
    {
        id: 'wain',
        name: 'Povoz',
        description: 'Hrad +8, hrad soupeře -4',
        requiredResources: {
            bricks: 10,
        },
        impact: {
            player: {
                castle: 8,
            },
            opponent: {
                castle: -4,
            },
        },
    },
    {
        id: 'fence',
        name: 'Hradba',
        description: 'Zeď +22',
        requiredResources: {
            bricks: 12,
        },
        impact: {
            player: {
                wall: 22,
            },
        },
    },
    {
        id: 'fort',
        name: 'Pevnost',
        description: 'Hrad +20',
        requiredResources: {
            bricks: 18,
        },
        impact: {
            player: {
                castle: 20,
            },
        },
    },
    {
        id: 'babylon',
        name: 'Babylon',
        description: 'Hrad +32',
        requiredResources: {
            bricks: 39,
        },
        impact: {
            player: {
                castle: 32,
            },
        },
    },
    // type "army"
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
        id: 'knight',
        name: 'Rytíř',
        description: 'Útok 3',
        requiredResources: {
            weapons: 2,
        },
        impact: {
            opponent: {
                attack: 3,
            },
        },
    },
    {
        id: 'rider',
        name: 'Jezdec',
        description: 'Útok 4',
        requiredResources: {
            weapons: 2,
        },
        impact: {
            opponent: {
                attack: 4,
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
    {
        id: 'recruit',
        name: 'Nábor',
        description: 'Vojáci +1',
        requiredResources: {
            weapons: 8,
        },
        impact: {
            player: {
                soldiers: 1,
            },
        },
    },
    {
        id: 'attack',
        name: 'Zteč',
        description: 'Útok 12',
        requiredResources: {
            weapons: 10,
        },
        impact: {
            opponent: {
                attack: 12,
            },
        },
    },
    {
        id: 'saboteur',
        name: 'Sabotér',
        description: 'Zásoby soupeře -4',
        requiredResources: {
            weapons: 12,
        },
        impact: {
            opponent: {
                bricks: -4,
                weapons: -4,
                crystals: -4,
            },
        },
    },
    {
        id: 'thief',
        name: 'Zloděj',
        description: 'Převod zásob soupeře 5',
        requiredResources: {
            weapons: 15,
        },
        impact: {
            player: {
                bricks: 5,
                weapons: 5,
                crystals: 5,
            },
            opponent: {
                bricks: -5,
                weapons: -5,
                crystals: -5,
            },
        },
    },
    {
        id: 'SWAT',
        name: 'SWAT',
        description: 'Hrad soupeře -10',
        requiredResources: {
            weapons: 18,
        },
        impact: {
            opponent: {
                castle: -10,
            },
        },
    },
    {
        id: 'Banshee',
        name: 'Smrtka',
        description: 'Útok 32',
        requiredResources: {
            weapons: 28,
        },
        impact: {
            opponent: {
                attack: 32,
            },
        },
    },
    // type "magic"
    {
        id: 'conjureBricks',
        name: 'Čaruj cihly',
        description: 'Cihly +8',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            player: {
                bricks: 8,
            },
        },
    },
    {
        id: 'destroyBricks', // original "crush bricks"
        name: 'Znič cihly',
        description: 'Cihly soupeře -8',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            opponent: {
                bricks: -8,
            },
        },
    },
    {
        id: 'conjureWeapons',
        name: 'Čaruj zbraně',
        description: 'Zbraně +8',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            player: {
                weapons: 8,
            },
        },
    },
    {
        id: 'destroyWeapons', // original "crush weapons"
        name: 'Znič zbraně',
        description: 'Zbraně soupeře -8',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            opponent: {
                weapons: -8,
            },
        },
    },
    {
        id: 'conjureCrystals',
        name: 'Čaruj krystaly',
        description: 'Krystaly +8',
        requiredResources: {
            crystals: 4,
        },
        impact: {
            player: {
                crystals: 8,
            },
        },
    },
    {
        id: 'destroyCrystals', // original "crush crystals"
        name: 'Znič krystaly',
        description: 'Krystaly soupeře -8',
        requiredResources: {
            crystals: 4,
        },
        impact: {
            opponent: {
                crystals: -8,
            },
        },
    },
    {
        id: 'sorcerer',
        name: 'Čaroděj',
        description: 'Mágové +1',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            player: {
                mages: 1,
            },
        },
    },
    {
        id: 'dragon',
        name: 'Drak',
        description: 'Útok 25',
        requiredResources: {
            crystals: 21,
        },
        impact: {
            opponent: {
                attack: 25,
            },
        },
    },
    {
        id: 'pixies',
        name: 'Skřítci',
        description: 'Hrad +22',
        requiredResources: {
            crystals: 22,
        },
        impact: {
            player: {
                castle: 22,
            },
        },
    },
    {
        id: 'curse',
        name: 'Kletba',
        description: 'Vše +1, vše soupeře -1',
        requiredResources: {
            crystals: 25,
        },
        impact: {
            player: {
                builders: 1,
                bricks: 1,
                soldiers: 1,
                weapons: 1,
                mages: 1,
                crystals: 1,
                castle: 1,
                wall: 1,
            },
            opponent: {
                builders: -1,
                bricks: -1,
                soldiers: -1,
                weapons: -1,
                mages: -1,
                crystals: -1,
                castle: -1,
                wall: -1,
            },
        },
    },
];
