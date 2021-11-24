import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CoachHome from './CoachHome';
import MatchCreate from './Match/MatchCreate';
import Events from './EventsCreate/Events';
import Points from './Points/Points';
import Logo from '../assets/Untitled_Artwork.png';


interface userProps {
    token: string,
    userRole: string
}

export default class CoachRouter extends React.Component<userProps> {
    constructor(props: userProps){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            userRole: localStorage.getItem('userRole')
        }
    }

    clearLocalStorage() {
        localStorage.clear();
        window.location.href = `${process.env.BASE_URL}`;
    }

    render() {
    return(
        <Router>

            <Navbar fixed="top" bg="light" expand="lg" style={{backgroundColor:"rgba(240, 255, 255, 0.502)"}}>
                <Container>
                    <Navbar.Brand href="#">
                        <img alt="" src={Logo} width="100"  className="d-inline-block align-top"
                            style={{}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Link to="/home-coach" className="site-link">Home</Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Link to="/match-list" className="site-link">Matches</Link>
                            <Link to="/match-analysis" className="site-link">Match Analysis</Link>
                            <Link to="/events" className="site-link" style={{pointerEvents:"none",color:"grey"}} >Events</Link>
                        </Nav>
                        <Nav><Button onClick={this.clearLocalStorage}
                            style={{borderRadius:"50px",margin:"0 10px",width:"90px",textAlign:"center"}}>
                            Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/home-coach"><CoachHome /></Route>
                <Route exact path="/match-list"><MatchCreate /></Route>
                <Route exact path="/match-analysis"><Points /></Route>
                <Route exact path="/events"><Events /></Route>
            </Switch>
        </Router>
    )}
}