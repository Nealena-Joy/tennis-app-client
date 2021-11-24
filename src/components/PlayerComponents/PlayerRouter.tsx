import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PlayerHome from './PlayerHome';
import Plan from './Plan/Plan';
import PlayerEvents from './PlayerEvents';
import PlayerMatches from './PlayerMatches';
import Logo from '../assets/Untitled_Artwork.png';

export default class PlayerRouter extends React.Component {

    clearLocalStorage() {
        localStorage.clear();
        window.location.href = `${process.env.BASE_URL}`;
    }

    render() {
    return(
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#">
                        <img alt="" src={Logo} width="100"  className="d-inline-block align-top"
                            style={{}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav>
                                <Link to="/home-coach" className="site-link">Home</Link>
                            </Nav>
                            <Nav>
                                <Link to="/my-matches" className="site-link">My Matches</Link>
                                <Link to="/plan" className="site-link">Improvement Plan</Link>
                                <Link to="/player-events" className="site-link" style={{pointerEvents:"none",color:"grey"}}>
                                Events</Link>
                            </Nav>
                        </Nav>
                        <Nav><Button onClick={this.clearLocalStorage}
                            style={{borderRadius:"50px",margin:"0 10px",width:"90px",textAlign:"center"}}>
                            Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/home-coach"><PlayerHome /></Route>
                <Route exact path="/my-matches"><PlayerMatches /></Route>
                <Route exact path="/plan"><Plan /></Route>
                <Route exact path="/player-events"><PlayerEvents /></Route>
            </Switch>
        </Router>
    )}
}