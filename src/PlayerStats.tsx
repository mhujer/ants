import React from 'react';

interface Props {
    creatorsLabel: string;
    creators: number;
    amountLabel: string;
    amount: number;
}

export const PlayerStats: React.FC<Props> = ({ creatorsLabel, creators, amountLabel, amount }) => {
    return (
        <div className="playerStats">
            <dl>
                <dt>{creatorsLabel}</dt>
                <dd>{creators}</dd>
            </dl>
            <dl>
                <dt>{amountLabel}</dt>
                <dd>{amount}</dd>
            </dl>
        </div>
    );
};
