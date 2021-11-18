import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavbarCoach = () => {
    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                Home
            </NavbarBrand>
            <Nav className="ml-auto">
                <NavItem>
                    <Link to="/matches" className="site-link">Matches</Link>
                </NavItem>
                <NavItem>
                    <Link to="/match-analysis" className="site-link">Match Analysis</Link>
                </NavItem>
                <NavItem>
                    <Link to="/events" className="site-link">Events</Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default NavbarCoach;