import React from 'react';
import { PlayerStats } from './PlayerStats';
import { CastleStats } from './CastleStats';

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
            <PlayerStats creatorsLabel="Stavitelé" creators={builders} amountLabel="Cihly" amount={bricks} />
            <PlayerStats creatorsLabel="Vojáci" creators={soldiers} amountLabel="Zbraně" amount={weapons} />
            <PlayerStats creatorsLabel="Mágové" creators={mages} amountLabel="Krystaly" amount={crystals} />
            <CastleStats castle={castle} wall={wall} />
        </div>
    );
};
