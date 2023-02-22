import React from 'react';
import { PlayerDashboard } from './PlayerDashboard';
import { Castle } from './Castle';
import './App.css'

const App: React.FC = () => {
    return (
        <div className='game'>
            <PlayerDashboard
                builders={3}
                bricks={5}
                soldiers={2}
                weapons={6}
                mages={2}
                crystals={7}
                castle={30}
                wall={10}
            />
            <Castle castle={30} wall={10} />
            <Castle castle={25} wall={8} />
            <PlayerDashboard
                builders={3}
                bricks={6}
                soldiers={3}
                weapons={7}
                mages={3}
                crystals={8}
                castle={25}
                wall={8}
            />
        </div>
    );
};

export default App;
