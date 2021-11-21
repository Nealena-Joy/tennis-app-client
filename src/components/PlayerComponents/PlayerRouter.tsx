import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PlayerHome from './PlayerHome';
import Plan from './Plan/Plan';
import PlayerEvents from './PlayerEvents';
import PlayerMatches from './PlayerMatches';

export default class PlayerRouter extends React.Component {
    render() {
    return(
        <Router>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">TennisLab</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link>
                                <Link to="/matches" className="site-link">My Matches</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/player-analysis" className="site-link">Improvement Plan</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/events" className="site-link" style={{pointerEvents:"none",color:"grey"}}>Events</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            Log out
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/home-coach"><PlayerHome /></Route>
                <Route exact path="/home-coach"><PlayerMatches /></Route>
                <Route exact path="/home-coach"><Plan /></Route>
                <Route exact path="/home-coach"><PlayerEvents /></Route>
            </Switch>
            <h1 style={{textAlign:"center"}}>Player Home</h1>
        </Router>
    )}
}