import React from 'react';
import { ResourceIcon } from './game/Resource/ResourceIcon';
import './global.scss';
import { CastleWithWall } from './game/Castle/CastleWithWall';
import { PlayerDashboardStats } from './game/Player/PlayerDashboardStats';
import buildersIcon from './assets/images/dashboard-icons/builders.png';
import bricksIcon from './assets/images/dashboard-icons/bricks.png';
import { PlayerDashboard } from './game/Player/PlayerDashboard';
import { CardDefinitions, cardDefinitions } from './game/Card/CardDefinitions';
import { CardComponent } from './game/Card/CardComponent';
import { NewCardsDeck } from './game/Card/NewCardsDeck';
import { CardDiscarded } from './game/Card/CardDiscarded';
import { PlayerBadge } from './game/Player/PlayerBadge';
import { Flag } from './game/Castle/Flag';

export const Demo: React.FC = () => {
    const cardsIds = Object.keys(cardDefinitions) as [keyof CardDefinitions];
    const cards = cardsIds.map((cardId) => {
        return (
            <div key={cardId} style={{ display: 'inline-block' }}>
                <CardComponent key={cardId} cardId={cardId} />
            </div>
        );
    });

    return (
        <>
            <PlayerDashboardStats
                resourceType={'bricks'}
                creatorsLabel="Stavitelé"
                creatorsIcon={buildersIcon}
                creators={2}
                creatorsChange={1}
                amountLabel="Cihly"
                amountIcon={bricksIcon}
                amount={8}
                amountChange={-5}
            />

            <PlayerDashboard
                player={'black'}
                isOnTurn={false}
                builders={2}
                bricks={10}
                soldiers={2}
                weapons={10}
                mages={2}
                crystals={10}
                castle={30}
                wall={20}
                resourceChange={null}
            />

            <hr />

            <Flag color={'black'} />
            <Flag color={'red'} />
            <PlayerBadge player={'black'} isOnTurn={true} />
            <PlayerBadge player={'red'} isOnTurn={true} />

            <hr />

            <CardDiscarded cardId={'babylon'} />

            <hr />

            <NewCardsDeck />
            <hr />

            {cards}
            <hr />

            <PlayerDashboardStats
                resourceType={'bricks'}
                creatorsLabel="Stavitelé"
                creatorsIcon={buildersIcon}
                creators={2}
                creatorsChange={1}
                amountLabel="Cihly"
                amountIcon={bricksIcon}
                amount={8}
                amountChange={-8}
            />

            <hr />

            <PlayerDashboard
                player={'black'}
                isOnTurn={false}
                builders={2}
                bricks={10}
                soldiers={2}
                weapons={10}
                mages={2}
                crystals={10}
                castle={30}
                wall={20}
                resourceChange={null}
            />

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
            <CastleWithWall player={'red'} castleHeight={150} wallHeight={200} />
        </>
    );
};
