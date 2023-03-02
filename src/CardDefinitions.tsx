import wallImage from './assets/images/cards/wall.png';
import foundationsImage from './assets/images/cards/foundations.png';
import defenseImage from './assets/images/cards/defense.png';
import reserveImage from './assets/images/cards/reserve.png';
import towerImage from './assets/images/cards/tower.png';
import schoolImage from './assets/images/cards/school.png';
import wainImage from './assets/images/cards/wain.png';
import fenceImage from './assets/images/cards/fence.png';
import fortImage from './assets/images/cards/fort.png';
import babylonImage from './assets/images/cards/babylon.png';
import archerImage from './assets/images/cards/archer.png';
import knightImage from './assets/images/cards/knight.png';
import riderImage from './assets/images/cards/rider.png';
import platoonImage from './assets/images/cards/platoon.png';
import recruitImage from './assets/images/cards/recruit.png';
import attackImage from './assets/images/cards/attack.png';
import saboteurImage from './assets/images/cards/saboteur.png';
import thiefImage from './assets/images/cards/thief.png';
import SWATImage from './assets/images/cards/SWAT.png';
import BansheeImage from './assets/images/cards/Banshee.png';
import conjureBricksImage from './assets/images/cards/conjureBricks.png';
import destroyBricksImage from './assets/images/cards/destroyBricks.png';
import conjureWeaponsImage from './assets/images/cards/conjureWeapons.png';
import destroyWeaponsImage from './assets/images/cards/destroyWeapons.png';
import conjureCrystalsImage from './assets/images/cards/conjureCrystals.png';
import destroyCrystalsImage from './assets/images/cards/destroyCrystals.png';
import sorcererImage from './assets/images/cards/sorcerer.png';
import dragonImage from './assets/images/cards/dragon.png';
import pixiesImage from './assets/images/cards/pixies.png';
import curseImage from './assets/images/cards/curse.png';
import { Sound } from './Sounds';

export interface CardDefinition {
    id: string;
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

export const cardDefinitions: CardDefinition[] = [
    // type "building"
    {
        id: 'wall',
        name: 'Zeď',
        description: 'Zeď +3',
        imageUrl: wallImage,
        sound: Sound.BUILD_WALL,
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
        imageUrl: foundationsImage,
        sound: Sound.BUILD_CASTLE,
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
        imageUrl: defenseImage,
        sound: Sound.BUILD_WALL,
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
        imageUrl: reserveImage,
        sound: Sound.BUILD_CASTLE,
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
        imageUrl: towerImage,
        sound: Sound.BUILD_CASTLE,
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
        imageUrl: schoolImage,
        sound: Sound.BOOST_POWER,
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
        imageUrl: wainImage,
        sound: Sound.BUILD_CASTLE,
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
        imageUrl: fenceImage,
        sound: Sound.BUILD_WALL,
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
        imageUrl: fortImage,
        sound: Sound.BUILD_CASTLE,
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
        imageUrl: babylonImage,
        sound: Sound.BUILD_CASTLE,
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
        imageUrl: archerImage,
        sound: Sound.DESTROY_WALL,
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
        imageUrl: knightImage,
        sound: Sound.DESTROY_WALL,
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
        imageUrl: riderImage,
        sound: Sound.DESTROY_WALL,
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
        imageUrl: platoonImage,
        sound: Sound.DESTROY_WALL,
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
        imageUrl: recruitImage,
        sound: Sound.BOOST_POWER,
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
        imageUrl: attackImage,
        sound: Sound.DESTROY_WALL,
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
        imageUrl: saboteurImage,
        sound: Sound.DESTROY_STOCK,
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
        imageUrl: thiefImage,
        sound: Sound.INCREASE_STOCK,
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
        imageUrl: SWATImage,
        sound: Sound.DESTROY_CASTLE,
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
        imageUrl: BansheeImage,
        sound: Sound.DESTROY_WALL,
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
        imageUrl: conjureBricksImage,
        sound: Sound.INCREASE_STOCK,
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
        imageUrl: destroyBricksImage,
        sound: Sound.DESTROY_STOCK,
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
        imageUrl: conjureWeaponsImage,
        sound: Sound.INCREASE_STOCK,
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
        imageUrl: destroyWeaponsImage,
        sound: Sound.DESTROY_STOCK,
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
        imageUrl: conjureCrystalsImage,
        sound: Sound.INCREASE_STOCK,
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
        imageUrl: destroyCrystalsImage,
        sound: Sound.DESTROY_STOCK,
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
        imageUrl: sorcererImage,
        sound: Sound.BOOST_POWER,
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
        imageUrl: dragonImage,
        sound: Sound.DESTROY_WALL,
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
        imageUrl: pixiesImage,
        sound: Sound.BUILD_CASTLE,
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
        imageUrl: curseImage,
        sound: Sound.CURSE,
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
