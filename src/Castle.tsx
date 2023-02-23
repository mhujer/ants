import React from 'react';

interface Props {
    castle: number;
    wall: number;
}

export const Castle: React.FC<Props> = ({ castle, wall }) => {
    const castleCss = {
        border: '1px solid gray',
        background: 'silver',
        width: '8em',
    };
    const castleHeight = castle * 5;
    const wallCss = {
        border: '1px solid black',
        background: 'brown',
        width: '1em',
    };
    const wallHeight = wall * 5;

    return (
        <div>
            <div style={{ ...castleCss, height: castleHeight.toString() + 'px' }}>Hrad {castle}</div>
            <div style={{ ...wallCss, height: wallHeight.toString() + 'px' }}>Hradba {wall}</div>
        </div>
    );
};
