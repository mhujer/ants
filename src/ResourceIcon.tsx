import React from 'react';
import { ResourceType } from './App';

interface Props {
    resourceType: ResourceType;
}

export const ResourceIcon: React.FC<Props> = ({ resourceType }) => {

    let icon = '';
    if (resourceType === ResourceType.BRICKS) {
        icon = '🧱';
    } else if (resourceType === ResourceType.WEAPONS) {
        icon = '🗡️';
    } else if (resourceType === ResourceType.CRYSTALS) {
        icon = '✨';
    }

    return (
        <div>
            {icon}
        </div>
    );
};
