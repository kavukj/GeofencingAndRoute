
import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './Header.styles.css';
import { Route } from '../Pages/Route.js';

export const Header = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (index) => {
        setSelectedTab(index)
    }

    return (
        <>
            <div>
                <Tabs className="tabHeader" selectedIndex={selectedTab} onSelect={handleTabChange} >
                    <TabList>
                        <Tab className={`${selectedTab === 0 ? 'active' : ''} tabs`}>Create Route</Tab>
                        <Tab className={`${selectedTab === 1 ? 'active' : ''} tabs`}>Find a Route</Tab>
                        <Tab className={`${selectedTab === 2 ? 'active' : ''} tabs`}>Create Geofence</Tab>
                    </TabList>
                    <TabPanel className="tabPanel">
                        <Route />
                    </TabPanel>
                    <TabPanel className="tabPanel">
                        <h2>Any content 1</h2>
                    </TabPanel>

                    <TabPanel className="tabPanel">
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}