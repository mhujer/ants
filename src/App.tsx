import React from 'react';
import { ResourceIcon } from './game/Resource/ResourceIcon';
import { Castle } from './game/Castle/Castle';
import './global.scss';
import { Wall } from './game/Castle/Wall';
import { CastleWithWall } from './game/Castle/CastleWithWall';
import { PlayerDashboard } from './game/Player/PlayerDashboard';
import { PlayerDashboardStats } from './game/Player/PlayerDashboardStats';
import buildersIcon from './assets/images/dashboard-icons/builders.png';
import bricksIcon from './assets/images/dashboard-icons/bricks.png';

export const App: React.FC = () => {
    return (
        <>
            <PlayerDashboardStats
                resourceType={'bricks'}
                creatorsLabel="Stavitelé"
                creatorsIcon={buildersIcon}
                creators={2}
                amountLabel="Cihly"
                amountIcon={bricksIcon}
                amount={8}
            />

            <hr />

            <PlayerDashboard builders={2} bricks={10} soldiers={2} weapons={10} mages={2} crystals={10} />

            <hr />

            <ResourceIcon resourceType={'bricks'} />
            <ResourceIcon resourceType={'weapons'} />
            <ResourceIcon resourceType={'crystals'} />

            <hr />

            <CastleWithWall player={'black'} castleHeight={0} wallHeight={0} />
            <CastleWithWall player={'black'} castleHeight={50} wallHeight={50} />
            <CastleWithWall player={'black'} castleHeight={100} wallHeight={100} />
            <CastleWithWall player={'black'} castleHeight={150} wallHeight={200} />

            <CastleWithWall player={'red'} castleHeight={0} wallHeight={0} />
            <CastleWithWall player={'red'} castleHeight={50} wallHeight={50} />
            <CastleWithWall player={'red'} castleHeight={100} wallHeight={100} />

            <hr />

            <Wall height={0} />
            <Wall height={50} />
            <Wall height={100} />

            <Castle player={'black'} height={0} />
            <Castle player={'black'} height={50} />
            <Castle player={'black'} height={100} />
            <Castle player={'red'} height={50} />
        </>
    );
};
