import React from 'react';

interface Props {
    castle: number;
    wall: number;
}

export const CastleStats: React.FC<Props> = (
    {
        castle,
        wall,
    }) => {
    return (
        <div className="castleStats">
            <dl>
                <dt>Hrad</dt>
                <dd>{castle}</dd>
            </dl>
            <dl>
                <dt>Zeď</dt>
                <dd>{wall}</dd>
            </dl>
        </div>
    );
};
