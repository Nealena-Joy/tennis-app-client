import React, {useState} from 'react';
import { Navbar, Nav, Container, Modal } from 'react-bootstrap';
import Logo from '../assets/logo_3.png';
import '../assets/styles.css';
import Login from './Login';
import Signup from './SignUp';

const NavbarLanding = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const toggleSignup = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShow(false);
        setShow2(true);
    }

    const toggleLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShow(true);
        setShow2(false);
    } 

    return (
        <div>
            <div>
                <Navbar fixed="top" expand="lg" style={{backgroundColor:"transparent"}}>
                    <Container >
                        <Navbar.Brand href="#">
                            <img alt="" src={Logo} height="32"  className="d-inline-block align-top" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" style={{color:"#F8F9F8",borderLeft:"3px solid #556C71",paddingLeft:"15px"}}>
                                Home
                            </Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="#link" style={{color:"#F8F9F8"}}>About</Nav.Link>
                            <Nav.Link href="#link" style={{color:"#F8F9F8"}}>Contact Us</Nav.Link>
                            <Nav.Link href="#link" onClick={handleShow}
                                style={{border:"1px lightgrey solid",borderRadius:"50px",margin:"0 10px",width:"80px",textAlign:"center",color:"#F8F9F8"}}>
                                Log In
                            </Nav.Link>
                            <Nav.Link href="#link" onClick={handleShow2}
                                style={{border:"1px #AF8165 solid",borderRadius:"50px",margin:"0 10px",width:"80px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#AF8165"}}>
                                Sign Up
                            </Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div>
                <Modal show={show} onHide={handleClose} className="my-modal">
                    <Login />
                    <Modal.Footer style={{justifyContent:"center"}}>
                        <p style={{textAlign:"center",color:"gray"}}>
                        Don't have an account? <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>toggleSignup(e)}
                        style={{backgroundColor:"transparent",border:"none",color:"blue",textDecoration:"underline"}}>
                        Sign Up</button>
                        </p>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal show={show2} onHide={handleClose2}>
                    <Signup />
                    <Modal.Footer style={{justifyContent:"center"}}>
                        <p style={{color:"gray"}}>
                        Already have an account? 
                        <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>toggleLogin(e)}
                        style={{backgroundColor:"transparent",border:"none",color:"blue",textDecoration:"underline"}}>
                        Log In</button>
                        </p>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default NavbarLanding;

//  Replace p text with:  <Link to="#" className="site-link">Register</Link>