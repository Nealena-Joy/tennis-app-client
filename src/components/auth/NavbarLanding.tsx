import React, {useState} from 'react';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/Untitled_Artwork.png';
import Login from './Login';
import Signup from './SignUp';

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
                <Navbar fixed="top" bg="light" expand="lg" style={{backgroundColor:"rgba(240, 255, 255, 0.502)"}}>
                    <Container >
                        <Navbar.Brand href="#">
                            <img alt="" src={Logo} width="100"  className="d-inline-block align-top"
                                style={{}}/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="#link">About</Nav.Link>
                            <Nav.Link href="#link">Contact Us</Nav.Link>
                            <Nav.Link href="#link" onClick={handleShow}
                                style={{border:"1px lightgrey solid",borderRadius:"50px",margin:"0 10px",width:"80px",textAlign:"center"}}>
                                Log In
                            </Nav.Link>
                            <Nav.Link href="#link" onClick={handleShow2}
                                style={{borderRadius:"50px",margin:"0 10px",backgroundColor:"#008EC3",color:"whitesmoke",width:"80px",textAlign:"center"}}>
                                Sign Up
                            </Nav.Link>
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