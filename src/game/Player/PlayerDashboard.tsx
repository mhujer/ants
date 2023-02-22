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
import { ResourceChangeForPlayer } from '../../store/gameSlice';

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
    resourceChange: ResourceChangeForPlayer | null;
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
    resourceChange,
}) => {
    return (
        <div className={'playerDashboard'}>
            <PlayerBadge player={player} isOnTurn={isOnTurn} />
            <PlayerDashboardStats
                resourceType={'bricks'}
                creatorsLabel="Stavitelé"
                creatorsIcon={buildersIcon}
                creators={builders}
                creatorsChange={resourceChange !== null ? resourceChange.builders : 0}
                amountLabel="Cihly"
                amountIcon={bricksIcon}
                amount={bricks}
                amountChange={resourceChange !== null ? resourceChange.bricks : 0}
            />
            <PlayerDashboardStats
                resourceType={'weapons'}
                creatorsLabel="Vojáci"
                creatorsIcon={soldiersIcon}
                creators={soldiers}
                creatorsChange={resourceChange !== null ? resourceChange.soldiers : 0}
                amountLabel="Zbraně"
                amountIcon={weaponsIcon}
                amount={weapons}
                amountChange={resourceChange !== null ? resourceChange.weapons : 0}
            />
            <PlayerDashboardStats
                resourceType={'crystals'}
                creatorsLabel="Mágové"
                creatorsIcon={magesIcon}
                creators={mages}
                creatorsChange={resourceChange !== null ? resourceChange.mages : 0}
                amountLabel="Krystaly"
                amountIcon={crystalsIcon}
                amount={crystals}
                amountChange={resourceChange !== null ? resourceChange.crystals : 0}
            />
            <br />
            <PlayerDashboardCastleStats
                castle={castle}
                castleChange={resourceChange !== null ? resourceChange.castle : 0}
                wall={wall}
                wallChange={resourceChange !== null ? resourceChange.wall : 0}
            />
        </div>
    );
};
