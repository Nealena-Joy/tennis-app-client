import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PlayerHome from './PlayerHome';
import Plan from './Plan/Plan';
import PlayerMatches from './PlayerMatches';
import Logo from '../assets/logo_3.png';
import SettingsMain from '../Settings/SettingsMain';

export default class PlayerRouter extends React.Component {

    clearLocalStorage() {
        localStorage.clear();
        window.location.href = `https://tennis-app-client-njr.herokuapp.com/`;
    }

    render() {
    const firstName = localStorage.getItem('firstName');
    return(
        <Router>
            <Navbar fixed="top" expand="lg" style={{backgroundColor:"transparent"}}>
                <Container>
                    <Navbar.Brand href="/home">
                        <img alt="" src={Logo} height="32"  className="d-inline-block align-top" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav>
                                <Link to="/home" className="site-link" style={{color:"#F8F9F8",borderLeft:"3px solid #556C71",paddingLeft:"15px"}}>
                                    Home
                                </Link>
                            </Nav> 
                            <Nav>
                                <Link to="/my-matches" className="site-link" style={{color:"#F8F9F8"}}>
                                    Matches
                                </Link>
                                <Link to="/plan" className="site-link" style={{color:"#F8F9F8"}}>
                                    Target Areas
                                </Link>
                            </Nav>
                        </Nav>
                        <Nav>
                        <NavDropdown id="nav-dropdown-custom" title={<span style={{color:"whitesmoke"}}>Hi, {firstName}</span>} align="end" style={{color:"whitesmoke"}}>
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
                <Route path="/home"><PlayerHome /></Route>
                <Route path="/my-matches"><PlayerMatches /></Route>
                <Route path="/plan"><Plan /></Route>
                <Route path="/settings"><SettingsMain /></Route>
            </Switch>

        </Router>
    )}
}