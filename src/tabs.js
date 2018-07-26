import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './index.css';
import Game from './games/tic-tac-toe-game';
import SubmarinesBoard from './games/submarines';

const GameTabs = () => (
    <Tabs >
        <TabList>
            <Tab>Tic-Tac-Toe</Tab>
            <Tab>Submarines</Tab>
            <Tab>Scrable</Tab>
        </TabList>

        <TabPanel>
            <Game />
        </TabPanel>
        <TabPanel>
            <SubmarinesBoard />
        </TabPanel>
        <TabPanel>
            <h3>Scrable Game</h3>
        </TabPanel>
    </Tabs>
);

export default GameTabs;