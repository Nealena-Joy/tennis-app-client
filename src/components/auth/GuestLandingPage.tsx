import React from 'react';
import NavbarLanding from './NavbarLanding';

export default class GuestLandingPage extends React.Component {

    render() {
        return (            
            <div className="landing">
                <NavbarLanding />
                <h1 style={{textAlign:"center"}}>Guest Landing Page</h1>
            </div>
        ) 
    }
}