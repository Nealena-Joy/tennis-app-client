import React from 'react';
import '../assets/styles.css';
import Slide from '../assets/tennis_players_5.png';
import signup from '../assets/sign-up-page.jpg';
import Banner2 from '../assets/players_2.png';
import Banner3 from '../assets/players-3.png';
import {Container, Row, Col, Carousel, Card, Form, Button} from 'react-bootstrap';
import NavbarLanding from './NavbarLanding';
import targetArea from '../assets/target_areas.jpg';
import matches from '../assets/matches.jpg';

export default class GuestLandingPage extends React.Component {

    render() {
        return (            
            <div className="landing">
                <NavbarLanding />
                <div className="header" style={{padding:"6em 3em 2em 3em"}}>
                    <h1 className="header-text" style={{textAlign:"left",fontSize:"45pt",color:"#AF8165",textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>
                        The platform for <br/>tennis athletes, enthusiasts, and coaches
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
                            <h1 style={{color:"#AF8165",fontWeight:"bolder"}}>ARE YOU READY?</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100 slide" 
                        src={Banner2}
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h1 style={{color:"#AF8165",fontWeight:"bolder"}}>SIGN UP TODAY!</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100 slide"
                        src={Banner3}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h1 style={{color:"#AF8165",fontWeight:"bolder"}}>ANALYZE * LEARN * IMPROVE</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <Container id="about" style={{paddingTop:"6em"}}>
                <div>
                    <h1 id="about" style={{fontSize:"45px",textAlign:"center",color:"#AF8165"}}>
                        <u>ABOUT</u>
                    </h1>
                </div>
                <Row style={{width:"90%",margin:"auto"}}>
                    <Col>
                        <Card style={{backgroundColor:"transparent"}}>
                            <Card.Img variant="top" src={signup} />
                            <Card.Body>
                            <Card.Text>
                            <h1 style={{color:"#F8F9F8"}}>Sign up to have one of our coaches analyze your matches.</h1>
                            <h5 style={{color:"#F8F9F8"}}><i>Already have a coach? Ask him/her to sign up to TennisLab to start recording your results!</i></h5>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor:"transparent"}}>
                            <Card.Img variant="top" src={matches} />
                            <Card.Body>
                            <Card.Text>
                            <h1 style={{color:"#F8F9F8"}}>Get a point by point analysis for specific match.</h1>
                            <h5 style={{color:"#F8F9F8"}}><i>Coaches will watch your match and give feedback on what could have been done.</i></h5>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor:"transparent"}}>
                            <Card.Img variant="top" src={targetArea} />
                            <Card.Body>
                            <Card.Text>
                            <h1 style={{color:"#F8F9F8"}}>Use the "Target Area" feature to keep you on track.</h1>
                            <h5 style={{color:"#F8F9F8"}}><i>Turn a coach's feedback into "Target Item" so that you know what you need to focus on.</i></h5>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </Container>

                <div id="contact" style={{paddingTop:"5em"}}>
                    <h1 style={{fontSize:"45px",textAlign:"center",color:"#AF8165"}}>
                        <u>CONTACT US</u>
                    </h1>
                </div>
                <Row style={{width:"50%",margin:"5em auto",color:"whitesmoke"}}>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" placeholder="Your message here" />
                            </Form.Group>

                            <Button variant="primary" type="submit"
                            style={{border:"none",borderRadius:"50px",marginTop:"30px",
                            width:"110px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#008EC3"}}>
                                SEND
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <h1>Let's Connect!</h1>
                        <p>Got questions or want to meet up? Contact me directly or fill out the form to send me an email.</p>
                    </Col>
                </Row>

            </div>
        ) 
    }
}