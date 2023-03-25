import React from 'react';
import { PlayerDashboardStats } from './PlayerDashboardStats';
import bricksIcon from '../../assets/images/dashboard-icons/bricks.png';
import buildersIcon from '../../assets/images/dashboard-icons/builders.png';
import crystalsIcon from '../../assets/images/dashboard-icons/crystals.png';
import magesIcon from '../../assets/images/dashboard-icons/mages.png';
import soldiersIcon from '../../assets/images/dashboard-icons/soldiers.png';
import weaponsIcon from '../../assets/images/dashboard-icons/weapons.png';
import { PlayerDashboardCastleStats } from './PlayerDashboardCastleStats';
import { Player } from './Player';
import { PlayerBadge } from './PlayerBadge';

interface Props {
    player: Player;
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
    player,
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
        <div className={'playerDashboard'}>
            <PlayerBadge player={player} isOnTurn={isOnTurn} />
            <PlayerDashboardStats
                resourceType={'bricks'}
                creatorsLabel="Stavitelé"
                creatorsIcon={buildersIcon}
                creators={builders}
                amountLabel="Cihly"
                amountIcon={bricksIcon}
                amount={bricks}
            />
            <PlayerDashboardStats
                resourceType={'weapons'}
                creatorsLabel="Vojáci"
                creatorsIcon={soldiersIcon}
                creators={soldiers}
                amountLabel="Zbraně"
                amountIcon={weaponsIcon}
                amount={weapons}
            />
            <PlayerDashboardStats
                resourceType={'crystals'}
                creatorsLabel="Mágové"
                creatorsIcon={magesIcon}
                creators={mages}
                amountLabel="Krystaly"
                amountIcon={crystalsIcon}
                amount={crystals}
            />
            <br />
            <PlayerDashboardCastleStats castle={castle} wall={wall} />
        </div>
    );
};
