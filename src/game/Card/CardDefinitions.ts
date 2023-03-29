import wallImage from '../../assets/images/cards/wall.png';
import foundationsImage from '../../assets/images/cards/foundations.png';
import defenseImage from '../../assets/images/cards/defense.png';
import reserveImage from '../../assets/images/cards/reserve.png';
import towerImage from '../../assets/images/cards/tower.png';
import schoolImage from '../../assets/images/cards/school.png';
import wainImage from '../../assets/images/cards/wain.png';
import fenceImage from '../../assets/images/cards/fence.png';
import fortImage from '../../assets/images/cards/fort.png';
import babylonImage from '../../assets/images/cards/babylon.png';
import archerImage from '../../assets/images/cards/archer.png';
import knightImage from '../../assets/images/cards/knight.png';
import riderImage from '../../assets/images/cards/rider.png';
import platoonImage from '../../assets/images/cards/platoon.png';
import recruitImage from '../../assets/images/cards/recruit.png';
import attackImage from '../../assets/images/cards/attack.png';
import saboteurImage from '../../assets/images/cards/saboteur.png';
import thiefImage from '../../assets/images/cards/thief.png';
import SWATImage from '../../assets/images/cards/swat.png';
import BansheeImage from '../../assets/images/cards/Banshee.png';
import conjureBricksImage from '../../assets/images/cards/conjureBricks.png';
import destroyBricksImage from '../../assets/images/cards/destroyBricks.png';
import conjureWeaponsImage from '../../assets/images/cards/conjureWeapons.png';
import destroyWeaponsImage from '../../assets/images/cards/destroyWeapons.png';
import conjureCrystalsImage from '../../assets/images/cards/conjureCrystals.png';
import destroyCrystalsImage from '../../assets/images/cards/destroyCrystals.png';
import sorcererImage from '../../assets/images/cards/sorcerer.png';
import dragonImage from '../../assets/images/cards/dragon.png';
import pixiesImage from '../../assets/images/cards/pixies.png';
import curseImage from '../../assets/images/cards/curse.png';
import { Sound } from '../../sounds/Sounds';

export type CardBuilding =
    | 'wall'
    | 'foundations'
    | 'defense'
    | 'reserve'
    | 'tower'
    | 'school'
    | 'wain'
    | 'fence'
    | 'fort'
    | 'babylon';
export type CardFighting =
    | 'archer'
    | 'knight'
    | 'rider'
    | 'platoon'
    | 'recruit'
    | 'attack'
    | 'saboteur'
    | 'thief'
    | 'SWAT'
    | 'Banshee';
export type CardMagic =
    | 'conjureBricks'
    | 'destroyBricks'
    | 'conjureWeapons'
    | 'destroyWeapons'
    | 'conjureCrystals'
    | 'destroyCrystals'
    | 'sorcerer'
    | 'dragon'
    | 'pixies'
    | 'curse';

export type CardId = CardBuilding | CardFighting | CardMagic;

export interface CardDefinition {
    id: CardId;
    name: string;
    description: string;
    imageUrl: string;
    sound: Sound;
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

export type CardDefinitions = Record<CardId, CardDefinition>;

export const cardDefinitions: CardDefinitions = {
    // type "building"
    wall: {
        id: 'wall',
        name: 'Zeď',
        description: 'Zeď +3',
        imageUrl: wallImage,
        sound: 'buildWall',
        requiredResources: {
            bricks: 1,
        },
        impact: {
            player: {
                wall: 3,
            },
        },
    },
    foundations: {
        id: 'foundations', // original "base"
        name: 'Základy',
        description: 'Hrad +2',
        imageUrl: foundationsImage,
        sound: 'buildCastle',
        requiredResources: {
            bricks: 1,
        },
        impact: {
            player: {
                castle: 2,
            },
        },
    },
    defense: {
        id: 'defense',
        name: 'Obrana',
        description: 'Zeď +6',
        imageUrl: defenseImage,
        sound: 'buildWall',
        requiredResources: {
            bricks: 3,
        },
        impact: {
            player: {
                wall: 6,
            },
        },
    },
    reserve: {
        id: 'reserve',
        name: 'Rezervy',
        description: 'Hrad +8, Zeď -4',
        imageUrl: reserveImage,
        sound: 'buildCastle',
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
    tower: {
        id: 'tower',
        name: 'Věž',
        description: 'Hrad +5',
        imageUrl: towerImage,
        sound: 'buildCastle',
        requiredResources: {
            bricks: 5,
        },
        impact: {
            player: {
                castle: 5,
            },
        },
    },
    school: {
        id: 'school',
        name: 'Škola',
        description: 'Stavitelé +1',
        imageUrl: schoolImage,
        sound: 'boostPower',
        requiredResources: {
            bricks: 8,
        },
        impact: {
            player: {
                builders: 1,
            },
        },
    },
    wain: {
        id: 'wain',
        name: 'Povoz',
        description: 'Hrad +8, hrad soupeře -4',
        imageUrl: wainImage,
        sound: 'buildCastle',
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
    fence: {
        id: 'fence',
        name: 'Hradba',
        description: 'Zeď +22',
        imageUrl: fenceImage,
        sound: 'buildWall',
        requiredResources: {
            bricks: 12,
        },
        impact: {
            player: {
                wall: 22,
            },
        },
    },
    fort: {
        id: 'fort',
        name: 'Pevnost',
        description: 'Hrad +20',
        imageUrl: fortImage,
        sound: 'buildCastle',
        requiredResources: {
            bricks: 18,
        },
        impact: {
            player: {
                castle: 20,
            },
        },
    },
    babylon: {
        id: 'babylon',
        name: 'Babylon',
        description: 'Hrad +32',
        imageUrl: babylonImage,
        sound: 'buildCastle',
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
    archer: {
        id: 'archer',
        name: 'Střelec',
        description: 'Útok 2',
        imageUrl: archerImage,
        sound: 'destroyWall',
        requiredResources: {
            weapons: 1,
        },
        impact: {
            opponent: {
                attack: 2,
            },
        },
    },
    knight: {
        id: 'knight',
        name: 'Rytíř',
        description: 'Útok 3',
        imageUrl: knightImage,
        sound: 'destroyWall',
        requiredResources: {
            weapons: 2,
        },
        impact: {
            opponent: {
                attack: 3,
            },
        },
    },
    rider: {
        id: 'rider',
        name: 'Jezdec',
        description: 'Útok 4',
        imageUrl: riderImage,
        sound: 'destroyWall',
        requiredResources: {
            weapons: 2,
        },
        impact: {
            opponent: {
                attack: 4,
            },
        },
    },
    platoon: {
        id: 'platoon',
        name: 'Četa',
        description: 'Útok 6',
        imageUrl: platoonImage,
        sound: 'destroyWall',
        requiredResources: {
            weapons: 4,
        },
        impact: {
            opponent: {
                attack: 6,
            },
        },
    },
    recruit: {
        id: 'recruit',
        name: 'Nábor',
        description: 'Vojáci +1',
        imageUrl: recruitImage,
        sound: 'boostPower',
        requiredResources: {
            weapons: 8,
        },
        impact: {
            player: {
                soldiers: 1,
            },
        },
    },
    attack: {
        id: 'attack',
        name: 'Zteč',
        description: 'Útok 12',
        imageUrl: attackImage,
        sound: 'destroyWall',
        requiredResources: {
            weapons: 10,
        },
        impact: {
            opponent: {
                attack: 12,
            },
        },
    },
    saboteur: {
        id: 'saboteur',
        name: 'Sabotér',
        description: 'Zásoby soupeře -4',
        imageUrl: saboteurImage,
        sound: 'destroyStock',
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
    thief: {
        id: 'thief',
        name: 'Zloděj',
        description: 'Převod zásob soupeře 5',
        imageUrl: thiefImage,
        sound: 'increaseStock',
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
    SWAT: {
        id: 'SWAT',
        name: 'SWAT',
        description: 'Hrad soupeře -10',
        imageUrl: SWATImage,
        sound: 'destroyCastle',
        requiredResources: {
            weapons: 18,
        },
        impact: {
            opponent: {
                castle: -10,
            },
        },
    },
    Banshee: {
        id: 'Banshee',
        name: 'Smrtka',
        description: 'Útok 32',
        imageUrl: BansheeImage,
        sound: 'destroyWall',
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
    conjureBricks: {
        id: 'conjureBricks',
        name: 'Čaruj cihly',
        description: 'Cihly +8',
        imageUrl: conjureBricksImage,
        sound: 'increaseStock',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            player: {
                bricks: 8,
            },
        },
    },
    destroyBricks: {
        id: 'destroyBricks', // original "crush bricks"
        name: 'Znič cihly',
        description: 'Cihly soupeře -8',
        imageUrl: destroyBricksImage,
        sound: 'destroyStock',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            opponent: {
                bricks: -8,
            },
        },
    },
    conjureWeapons: {
        id: 'conjureWeapons',
        name: 'Čaruj zbraně',
        description: 'Zbraně +8',
        imageUrl: conjureWeaponsImage,
        sound: 'increaseStock',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            player: {
                weapons: 8,
            },
        },
    },
    destroyWeapons: {
        id: 'destroyWeapons', // original "crush weapons"
        name: 'Znič zbraně',
        description: 'Zbraně soupeře -8',
        imageUrl: destroyWeaponsImage,
        sound: 'destroyStock',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            opponent: {
                weapons: -8,
            },
        },
    },
    conjureCrystals: {
        id: 'conjureCrystals',
        name: 'Čaruj krystaly',
        description: 'Krystaly +8',
        imageUrl: conjureCrystalsImage,
        sound: 'increaseStock',
        requiredResources: {
            crystals: 4,
        },
        impact: {
            player: {
                crystals: 8,
            },
        },
    },
    destroyCrystals: {
        id: 'destroyCrystals', // original "crush crystals"
        name: 'Znič krystaly',
        description: 'Krystaly soupeře -8',
        imageUrl: destroyCrystalsImage,
        sound: 'destroyStock',
        requiredResources: {
            crystals: 4,
        },
        impact: {
            opponent: {
                crystals: -8,
            },
        },
    },
    sorcerer: {
        id: 'sorcerer',
        name: 'Čaroděj',
        description: 'Mágové +1',
        imageUrl: sorcererImage,
        sound: 'boostPower',
        requiredResources: {
            crystals: 8,
        },
        impact: {
            player: {
                mages: 1,
            },
        },
    },
    dragon: {
        id: 'dragon',
        name: 'Drak',
        description: 'Útok 25',
        imageUrl: dragonImage,
        sound: 'destroyWall',
        requiredResources: {
            crystals: 21,
        },
        impact: {
            opponent: {
                attack: 25,
            },
        },
    },
    pixies: {
        id: 'pixies',
        name: 'Skřítci',
        description: 'Hrad +22',
        imageUrl: pixiesImage,
        sound: 'buildCastle',
        requiredResources: {
            crystals: 22,
        },
        impact: {
            player: {
                castle: 22,
            },
        },
    },
    curse: {
        id: 'curse',
        name: 'Kletba',
        description: 'Vše +1, vše soupeře -1',
        imageUrl: curseImage,
        sound: 'curse',
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
};
