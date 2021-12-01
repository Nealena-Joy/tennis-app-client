import React from 'react';
import { Navbar, Nav, Container, Modal } from 'react-bootstrap';
import Logo from '../assets/logo_3.png';
import '../assets/styles.css';
import Login from './Login';
import Signup from './SignUp';

type States = {
    isLoggedIn: boolean,
    showLogin: boolean,
    showSignup: boolean,
}

export default class NavbarLanding extends React.Component<{},States> {
    constructor(props: any){
        super(props)
        this.state = {
           isLoggedIn: false,
           showLogin: false,
           showSignup: false
        }
        this.loggedIn = this.loggedIn.bind(this)
    }
    //!  TOGGLE MODAL SIGN UP OR LOGIN
    modalSignup = () => {
        this.setState({showSignup: true, showLogin: false});
    }
    modalLogin = () => {
        this.setState({showLogin: true, showSignup: false})
    } 
    handleClose = () => {
        this.setState({showSignup: false, showLogin: false})
    }

    loggedIn() {
        this.setState({isLoggedIn: true})
    }

    render(){
    return (
        <div>
            <div>
                <Navbar fixed="top" expand="lg" style={{backgroundColor:"transparent"}}>
                    <Container >
                        <Navbar.Brand href="/">
                            <img alt="" src={Logo} height="32"  className="d-inline-block align-top" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" style={{color:"#F8F9F8",borderLeft:"3px solid #556C71",paddingLeft:"15px"}}>
                                Home
                            </Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="#about" style={{color:"#F8F9F8"}}>About</Nav.Link>
                            <Nav.Link href="#contact" style={{color:"#F8F9F8"}}>Contact Us</Nav.Link>
                            <Nav.Link href="#login" onClick={this.modalLogin}
                                style={{border:"1px lightgrey solid",borderRadius:"50px",margin:"0 10px",width:"80px",textAlign:"center",color:"#F8F9F8"}}>
                                Log In
                            </Nav.Link>
                            <Nav.Link href="#signup" onClick={this.modalSignup}
                                style={{border:"1px #AF8165 solid",borderRadius:"50px",margin:"0 10px",width:"80px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#AF8165"}}>
                                Sign Up
                            </Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div>
                <Modal show={this.state.showLogin} onHide={this.handleClose} className="my-modal">
                    <Login />
                    <Modal.Footer style={{justifyContent:"center"}}>
                        <p style={{textAlign:"center",color:"gray"}}>
                        Don't have an account? <button onClick={this.modalSignup}
                        style={{backgroundColor:"transparent",border:"none",color:"blue",textDecoration:"underline"}}>
                        Sign Up</button>
                        </p>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal show={this.state.showSignup} onHide={this.handleClose}>
                    <Signup />
                    <Modal.Footer style={{justifyContent:"center"}}>
                        <p style={{color:"gray"}}>
                        Already have an account? 
                        <button onClick={this.modalLogin}
                        style={{backgroundColor:"transparent",border:"none",color:"blue",textDecoration:"underline"}}>
                        Log In</button>
                        </p>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )};
};