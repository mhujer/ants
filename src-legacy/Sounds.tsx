import applauseSound from './assets/sounds/applause.mp3';
import birdsSound from './assets/sounds/birds.mp3';
import boostPowerSound from './assets/sounds/boost-power.mp3';
import buildCastleSound from './assets/sounds/build-castle.mp3';
import buildWallSound from './assets/sounds/build-wall.mp3';
import cardPlayedSound from './assets/sounds/card-played.mp3';
import curseSound from './assets/sounds/curse.mp3';
import destroyCastleSound from './assets/sounds/destroy-castle.mp3';
import destroyStockSound from './assets/sounds/destroy-stock.mp3';
import destoryWallSound from './assets/sounds/destroy-wall.mp3';
import fanfareSound from './assets/sounds/fanfare.mp3';
import increaseStockSound from './assets/sounds/increase-stock.mp3';

export enum Sound {
    APPLAUSE,
    BIRDS,
    BOOST_POWER,
    BUILD_CASTLE,
    BUILD_WALL,
    CARD_PLAYED,
    CURSE,
    DESTROY_CASTLE,
    DESTROY_STOCK,
    DESTROY_WALL,
    FANFARE,
    INCREASE_STOCK,
}

export const playSound = (sound: Sound) => {
    let soundUrl;
    switch (sound) {
        case Sound.APPLAUSE:
            soundUrl = applauseSound;
            break;
        case Sound.BIRDS:
            soundUrl = birdsSound;
            break;
        case Sound.BOOST_POWER:
            soundUrl = boostPowerSound;
            break;
        case Sound.BUILD_CASTLE:
            soundUrl = buildCastleSound;
            break;
        case Sound.BUILD_WALL:
            soundUrl = buildWallSound;
            break;
        case Sound.CARD_PLAYED:
            soundUrl = cardPlayedSound;
            break;
        case Sound.CURSE:
            soundUrl = curseSound;
            break;
        case Sound.DESTROY_CASTLE:
            soundUrl = destroyCastleSound;
            break;
        case Sound.DESTROY_STOCK:
            soundUrl = destroyStockSound;
            break;
        case Sound.DESTROY_WALL:
            soundUrl = destoryWallSound;
            break;
        case Sound.FANFARE:
            soundUrl = fanfareSound;
            break;
        case Sound.INCREASE_STOCK:
            soundUrl = increaseStockSound;
            break;
        default:
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Unknown sound "${sound}"!`);
    }

    void (async () => {
        const myAudio = new Audio(soundUrl);
        await myAudio.play();
    })();
};
