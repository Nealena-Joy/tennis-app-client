import React, {useState} from 'react';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Registration';

const NavbarLanding = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return (
        <div>
            <div>
                <Navbar bg="light" expand="lg">
                    <Container >
                        <Navbar.Brand href="#home">TennisLab</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="#link">About</Nav.Link>
                            <Nav.Link href="#link" onClick={handleShow}>Log In</Nav.Link>
                            <Nav.Link href="#link" onClick={handleShow2}>Sign Up</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div>
                <Modal show={show} onHide={handleClose}>
                    <Login />
                </Modal>
            </div>

            <div>
                <Modal show={show2} onHide={handleClose2}>
                    <Signup />
                </Modal>
            </div>
        </div>
    );
};

export default NavbarLanding;

//  Replace p text with:  <Link to="#" className="site-link">Register</Link>