import React from 'react';
import '../assets/styles.css';
import {Card, Button, Row, Col} from 'react-bootstrap';
import PlayerIMG from '../assets/tennis_clay2.png';
import NetIMG from '../assets/racket.png';
import ProfileIMG from '../assets/profiles.png';

export default class CoachHome extends React.Component {
    render() {
    return(
        <div className="CoachHome" style={{paddingTop:"100px",color:"#F8F9F8"}}>
            <div style={{width:"80%",margin:"auto"}}>
                <h1>Welcome to TennisLab!</h1>
            </div>
            <Row style={{width:"80%",margin:"auto"}}>
            <Col style={{marginTop:"1em",alignItems:"center"}}>
            <Card style={{ width: '18rem',margin:"auto",backgroundColor:"transparent"}}>
                <Card.Img variant="top" src={PlayerIMG} />
                <Card.Body>
                    <Card.Title>Matches</Card.Title>
                    <Card.Text>
                    As a coach, you can create a match for the registered player.
                    You can also view all match records.
                    </Card.Text>
                </Card.Body> 
                <Card.Footer>
                    <Button style={{backgroundColor:"#0083c3",borderRadius:"50px",
                    color:"whitesmoke",border:"none",width:"100px"}}
                    href="https://tennis-app-client-njr.herokuapp.com/match-list"
                    >View</Button>
                </Card.Footer>
            </Card>
            </Col>
            <Col style={{marginTop:"1em"}}>
            <Card style={{ width: '18rem',margin:"auto",backgroundColor:"transparent"}}>
                <Card.Img variant="top" src={NetIMG} />
                <Card.Body>
                    <Card.Title>Player Analysis</Card.Title>
                    <Card.Text>
                    Select a match and start your analysis, point by point.
                    You can also modify point details if needed.
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{backgroundColor:"transparent"}}>
                    <Button style={{backgroundColor:"#0083c3",borderRadius:"50px",
                    color:"whitesmoke",border:"none",width:"100px"}}
                    href="https://tennis-app-client-njr.herokuapp.com/match-analysis"
                    >View</Button>
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
                    color:"whitesmoke",border:"none",width:"100px"}}
                    href="https://tennis-app-client-njr.herokuapp.com/settings"
                    >View</Button>
                </Card.Footer>
            </Card>
            </Col>
            </Row>
        </div>
    )
    }
}