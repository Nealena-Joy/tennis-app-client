import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CoachHome from './CoachHome';
import MatchCreate from './Match/MatchCreate';
import Events from './EventsCreate/Events';
import PointsMain from './Points/PointsMain';
import SettingsMain from '../Settings/SettingsMain';
import Logo from '../assets/logo_3.png';

export default class CoachRouter extends React.Component {

    clearLocalStorage() {
        localStorage.clear();
        window.location.href = `${process.env.BASE_URL}`;
    }

    render() {
    const firstName = localStorage.getItem('firstName');
    return(
        <Router>

            <Navbar fixed="top" expand="lg" style={{backgroundColor:"transparent"}} >
                <Container>
                    <Navbar.Brand href="#">
                        <img alt="" src={Logo} height="32"  className="d-inline-block align-top" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav style={{borderLeft:"3px solid #556C71"}}>
                            <Link to="/home" className="site-link" style={{color:"#F8F9F8"}}>
                                Home
                            </Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Link to="/match-list" className="site-link" style={{color:"#F8F9F8"}}>
                                Matches
                            </Link>
                            <Link to="/match-analysis" className="site-link" style={{color:"#F8F9F8"}}>
                                Player Analysis
                            </Link>
                        </Nav>

                        <Nav>
                        <NavDropdown id="nav-dropdown-custom" title={<span style={{color:"whitesmoke"}}>Hi, Coach {firstName}</span>} align="end" style={{color:"whitesmoke"}}>
                            <NavDropdown.Item href="#action/3.1">
                                <button style={{backgroundColor:"transparent",border:"none"}}>
                                    <Link to="/settings" style={{textDecoration:"none"}}>Settings</Link>
                                </button>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <button disabled style={{backgroundColor:"transparent",border:"none",pointerEvents:"none"}}>
                                    Send A Feedback 
                                </button>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                <button style={{backgroundColor:"transparent",border:"none"}}
                                    onClick={this.clearLocalStorage}>
                                    Log Out
                                </button>
                            </NavDropdown.Item>
                        </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/home"><CoachHome /></Route>
                <Route exact path="/match-list"><MatchCreate /></Route>
                <Route exact path="/match-analysis"><PointsMain /></Route>
                <Route exact path="/settings"><SettingsMain /></Route>
            </Switch>
        </Router>
    )}
}