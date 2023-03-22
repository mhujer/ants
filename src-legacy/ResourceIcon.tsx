import React from 'react';
import { ResourceType } from './ResourceType';

import bricksIcon from './assets/images/dashboard-icons/bricks.png';
import crystalsIcon from './assets/images/dashboard-icons/crystals.png';
import weaponsIcon from './assets/images/dashboard-icons/weapons.png';

interface Props {
    resourceType: ResourceType;
}

export const ResourceIcon: React.FC<Props> = ({ resourceType }) => {
    let icon = null;
    if (resourceType === ResourceType.BRICKS) {
        icon = bricksIcon;
    } else if (resourceType === ResourceType.WEAPONS) {
        icon = weaponsIcon;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (resourceType === ResourceType.CRYSTALS) {
        icon = crystalsIcon;
    } else {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Invalid resourceType "${resourceType}"!`);
    }

    return (
        <div>
            <img src={icon} />
        </div>
    );
};
