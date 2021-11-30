import React from 'react';
import '../assets/styles.css';
import Slide from '../assets/tennis_players_5.png';
import SignUpIMG from '../assets/sign_up.jpg';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import NavbarLanding from './NavbarLanding';

export default class GuestLandingPage extends React.Component {

    render() {
        return (            
            <div className="landing">
                <NavbarLanding />
                <div className="header" style={{padding:"6em 3em"}}>
                    <h1 className="header-text" style={{textAlign:"left"}}>
                        The platform for <br/>tennis athletes, enthusiasts, and coaches.
                    </h1>
                </div>

                <Carousel>
                    <Carousel.Item interval={2500}>
                        <img 
                        className="d-block w-100 slide"
                        src={Slide}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>ARE YOU READY?</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={Slide}
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>SIGN UP TODAY!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={Slide}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>ANALYZE * LEARN * IMPROVE</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>




                <Container>
                    <Row>
                    <Col style={{margin:"4em"}}>
                            <img alt="sign-up-info" src={SignUpIMG} 
                            style={{height:"100px"}}/>

                        </Col>
                        <Col style={{margin:"4em"}}>
                            <h1>Sign up to have one of our coaches analyze your matches.</h1>
                            <h4>Already have a coach? Ask him/her to sign up to TennisLab to start recording your results!</h4>
                        </Col>
                    </Row>
                </Container>

            </div>
        ) 
    }
}