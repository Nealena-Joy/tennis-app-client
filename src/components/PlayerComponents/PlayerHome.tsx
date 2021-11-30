import React from 'react';
import '../assets/styles.css';
import {Card, Button, Row, Col} from 'react-bootstrap';
import PlayerIMG from '../assets/tennis_clay2.png';
import NetIMG from '../assets/racket.png';
import ProfileIMG from '../assets/profiles.png';

export default class PlayerHome extends React.Component {
    render() {
    return(
        <div className="player-home" style={{paddingTop:"100px",color:"#F8F9F8"}}>
            <div style={{width:"80%",margin:"auto"}}>
                <h1>Welcome to TennisLab!</h1>
            </div>
            <Row style={{width:"80%",margin:"auto"}}>
            <Col style={{marginTop:"1em",alignItems:"center"}}>
            <Card style={{ width: '18rem',margin:"auto",backgroundColor:"transparent"}}>
                <Card.Img variant="top" src={PlayerIMG} />
                <Card.Body>
                    <Card.Title>My Matches</Card.Title>
                    <Card.Text>
                    This is where you can view matches that you have played. If you don't see a particular match here,
                    please contact your coach.
                    </Card.Text>
                </Card.Body> 
                <Card.Footer>
                    <Button style={{backgroundColor:"#0083c3",borderRadius:"50px",
                    color:"whitesmoke",border:"none",width:"100px"}}>View</Button>
                </Card.Footer>
            </Card>
            </Col>
            <Col style={{marginTop:"1em"}}>
            <Card style={{ width: '18rem',margin:"auto",backgroundColor:"transparent"}}>
                <Card.Img variant="top" src={NetIMG} />
                <Card.Body>
                    <Card.Title>My Target Areas</Card.Title>
                    <Card.Text>
                    Your "Focus Areas" are specific tasks to do to improve your tennis game.
                    Work together with coaches to create these "Focus Areas".
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{backgroundColor:"transparent"}}>
                    <Button style={{backgroundColor:"#0083c3",borderRadius:"50px",
                    color:"whitesmoke",border:"none",width:"100px"}}>View</Button>
                </Card.Footer>
            </Card>
            </Col>
            <Col style={{marginTop:"1em"}}>
            <Card style={{ width: '18rem',margin:"auto",backgroundColor:"transparent"}}>
                <Card.Img variant="top" src={ProfileIMG}/>
                <Card.Body>
                    <Card.Title>Settings</Card.Title>
                    <Card.Text>
                    Need to change your email? Change it here, in settings.
                    You can also change your profile details here.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button style={{backgroundColor:"#0083c3",borderRadius:"50px",
                    color:"whitesmoke",border:"none",width:"100px"}}>View</Button>
                </Card.Footer>
            </Card>
            </Col>
            </Row>

        </div>
    )
    }
}