import React from 'react';
import { PlayerStats } from './PlayerStats';
import { CastleStats } from './CastleStats';
import bricksIcon from './assets/images/dashboard-icons/bricks.png';
import buildersIcon from './assets/images/dashboard-icons/builders.png';
import crystalsIcon from './assets/images/dashboard-icons/crystals.png';
import magesIcon from './assets/images/dashboard-icons/mages.png';
import soldiersIcon from './assets/images/dashboard-icons/soldiers.png';
import weaponsIcon from './assets/images/dashboard-icons/weapons.png';

interface Props {
    isOnTurn: boolean;
    builders: number;
    bricks: number;
    soldiers: number;
    weapons: number;
    mages: number;
    crystals: number;
    castle: number;
    wall: number;
}

export const PlayerDashboard: React.FC<Props> = ({
    isOnTurn,
    builders,
    bricks,
    soldiers,
    weapons,
    mages,
    crystals,
    castle,
    wall,
}) => {
    return (
        <div className={'playerDashboard' + (isOnTurn ? ' is-on-turn' : '')}>
            <PlayerStats
                creatorsLabel="Stavitelé"
                creatorsIcon={buildersIcon}
                creators={builders}
                amountLabel="Cihly"
                amountIcon={bricksIcon}
                amount={bricks}
            />
            <PlayerStats
                creatorsLabel="Vojáci"
                creatorsIcon={soldiersIcon}
                creators={soldiers}
                amountLabel="Zbraně"
                amountIcon={weaponsIcon}
                amount={weapons}
            />
            <PlayerStats
                creatorsLabel="Mágové"
                creatorsIcon={magesIcon}
                creators={mages}
                amountLabel="Krystaly"
                amountIcon={crystalsIcon}
                amount={crystals}
            />
            <CastleStats castle={castle} wall={wall} />
        </div>
    );
};
