import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import Profile from './Profile';
import EventsSettings from './EventsSettings';
import DeletePlayer from './DeletePlayer';
import SettingsIcon from '../assets/settings-1.png';


export default class SettingsMain extends React.Component {

    render() {
        let userRole = localStorage.getItem('userRole')
        if (userRole === 'Coach') {
            return(
                <div style={{backgroundColor:"#001927",paddingBottom:"30px"}}>
                    <div style={{width:"90%",margin:"auto",padding:"90px 0 10px 0"}}>
                        <div style={{display:"inline-block"}}>
                            <img alt="settings" src={SettingsIcon} style={{height:"30px",float:"left"}}/>
                            <h3 style={{float:"left",verticalAlign:"middle"}}>&nbsp;Settings</h3>
                        </div>
                    </div>
                    <div style={{width:"90%",margin:"auto"}}>
                        <Tabs defaultActiveKey="my-profile" id="uncontrolled-tab-example"
                            style={{width:"80%"}}>
                            <Tab eventKey="my-profile" title="My Profile" style={{}}>
                                <Profile />
                            </Tab>
                            <Tab eventKey="events" title="Events" style={{}} disabled>
                                <EventsSettings />
                            </Tab>
                            <Tab eventKey="players-list" title="Players List">
                                <DeletePlayer />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            )
        } else {
            return( 
                <div style={{backgroundColor:"#001927",paddingBottom:"30px"}}>
                    <div style={{width:"90%",margin:"auto",padding:"90px 0 10px 0"}}>
                        <div style={{display:"inline-block"}}>
                            <img alt="settings" src={SettingsIcon} style={{height:"30px",float:"left"}}/>
                            <h3 style={{float:"left",verticalAlign:"middle",color:"#bdbdbd"}}>&nbsp;Settings</h3>
                        </div>
                    </div>
                    <div style={{width:"90%",margin:"auto"}}>
                        <Tabs defaultActiveKey="my-profile" id="uncontrolled-tab-example"
                            style={{width:"80%"}}>
                            <Tab eventKey="my-profile" title="My Profile">
                                <Profile />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            )
        }
    }
}