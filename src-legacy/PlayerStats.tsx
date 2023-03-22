import React from 'react';

interface Props {
    creatorsLabel: string;
    creatorsIcon: string;
    creators: number;
    amountLabel: string;
    amountIcon: string;
    amount: number;
}

export const PlayerStats: React.FC<Props> = ({
    creatorsLabel,
    creatorsIcon,
    creators,
    amountLabel,
    amountIcon,
    amount,
}) => {
    return (
        <div className="playerStats">
            <dl>
                <dt>
                    <img src={creatorsIcon} /> {creatorsLabel}
                </dt>
                <dd>{creators}</dd>
            </dl>
            <dl>
                <dt>
                    <img src={amountIcon} /> {amountLabel}
                </dt>
                <dd>{amount}</dd>
            </dl>
        </div>
    );
};
