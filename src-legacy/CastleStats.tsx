import React from 'react';
import castleIcon from './assets/images/dashboard-icons/castle.png';
import wallIcon from './assets/images/dashboard-icons/wall.png';

interface Props {
    castle: number;
    wall: number;
}

export const CastleStats: React.FC<Props> = ({ castle, wall }) => {
    return (
        <div className="castleStats">
            <dl>
                <dt>
                    <img src={castleIcon} /> Hrad
                </dt>
                <dd>{castle}</dd>
            </dl>
            <dl>
                <dt>
                    <img src={wallIcon} /> Zeď
                </dt>
                <dd>{wall}</dd>
            </dl>
        </div>
    );
};
