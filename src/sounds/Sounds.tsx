import applauseSound from './../assets/sounds/applause.mp3';
import birdsSound from './../assets/sounds/birds.mp3';
import boostPowerSound from './../assets/sounds/boost-power.mp3';
import buildCastleSound from './../assets/sounds/build-castle.mp3';
import buildWallSound from './../assets/sounds/build-wall.mp3';
import cardPlayedSound from './../assets/sounds/card-played.mp3';
import curseSound from './../assets/sounds/curse.mp3';
import destroyCastleSound from './../assets/sounds/destroy-castle.mp3';
import destroyStockSound from './../assets/sounds/destroy-stock.mp3';
import destroyWallSound from './../assets/sounds/destroy-wall.mp3';
import fanfareSound from './../assets/sounds/fanfare.mp3';
import increaseStockSound from './../assets/sounds/increase-stock.mp3';

export type Sound =
    | 'applause'
    | 'birds'
    | 'boostPower'
    | 'buildCastle'
    | 'buildWall'
    | 'cardPlayed'
    | 'curse'
    | 'destroyCastle'
    | 'destroyStock'
    | 'destroyWall'
    | 'fanfare'
    | 'increaseStock';

export const playSound = (sound: Sound, loop: boolean = false) => {
    let soundUrl;
    switch (sound) {
        case 'applause':
            soundUrl = applauseSound;
            break;
        case 'birds':
            soundUrl = birdsSound;
            break;
        case 'boostPower':
            soundUrl = boostPowerSound;
            break;
        case 'buildCastle':
            soundUrl = buildCastleSound;
            break;
        case 'buildWall':
            soundUrl = buildWallSound;
            break;
        case 'cardPlayed':
            soundUrl = cardPlayedSound;
            break;
        case 'curse':
            soundUrl = curseSound;
            break;
        case 'destroyCastle':
            soundUrl = destroyCastleSound;
            break;
        case 'destroyStock':
            soundUrl = destroyStockSound;
            break;
        case 'destroyWall':
            soundUrl = destroyWallSound;
            break;
        case 'fanfare':
            soundUrl = fanfareSound;
            break;
        case 'increaseStock':
            soundUrl = increaseStockSound;
            break;
        default:
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Unknown sound "${sound}"!`);
    }

    void (async () => {
        const myAudio = new Audio(soundUrl);
        if (loop) {
            myAudio.loop = true;
        }
        await myAudio.play();
    })();
};
