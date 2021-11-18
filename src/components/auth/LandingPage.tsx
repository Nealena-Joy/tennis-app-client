import React, {Component} from 'react';
import NavbarLanding from './NavbarLanding';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <NavbarLanding />
                <div>
                    This is the landing page, where users can sign up or login.
                </div>
            </div>
        )
    }
}

export default LandingPage;