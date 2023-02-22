import React from 'react';
import { Resource } from './Resource';
import bricksIcon from '../../assets/images/dashboard-icons/bricks.png';
import crystalsIcon from '../../assets/images/dashboard-icons/crystals.png';
import weaponsIcon from '../../assets/images/dashboard-icons/weapons.png';

export const ResourceIcon: React.FC<{ resourceType: Resource }> = ({ resourceType }) => {
    let icon = null;
    switch (resourceType) {
        case 'bricks':
            icon = bricksIcon;
            break;
        case 'weapons':
            icon = weaponsIcon;
            break;
        case 'crystals':
            icon = crystalsIcon;
            break;
    }

    return <img src={icon} />;
};
