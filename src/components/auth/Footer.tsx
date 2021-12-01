import React from 'react';
import {Card} from 'react-bootstrap';
import phone from '../assets/phone-round.png';
import email from '../assets/email-round.png';
import linkedin from '../assets/linkedin.png';
import github from '../assets/github.png';

export default class Footer extends React.Component {
    render() {
    return(
        <div className="footer" style={{textAlign:"center",color:"#008EC3"}}>
            <div style={{display:"inline-flex"}}>
                <Card style={{width:"3em",background:"transparent",margin:"10px"}}>
                    <Card.Img variant="top" src={phone} style={{height:"40px",width:"40px",margin:"auto"}}/>
                </Card>
                <Card style={{width:"3em",background:"transparent",margin:"10px"}}>
                    <Card.Img variant="top" src={email} style={{height:"40px",width:"40px",margin:"auto"}}/>
                </Card>
                <Card style={{width:"3em",background:"transparent",margin:"10px"}}>
                    <a href="https://www.linkedin.com/in/nealena-joy-r-486113b2/" >
                    <Card.Img variant="top" src={linkedin} style={{height:"40px",width:"40px",margin:"auto"}}/>
                    </a>
                </Card>
                <Card style={{width:"3em",background:"transparent",margin:"10px"}}>
                    <a href="https://www.linkedin.com/in/nealena-joy-r-486113b2/" >
                    <Card.Img variant="top" src={github} style={{height:"40px",width:"40px",margin:"auto"}}/>
                    </a>
                </Card>
            </div>
            <p>
                317-123-4567<br/>
                NealenaRas@gmail.com<br/>
                1234 Tennis Lane, Suite 5678, Indianapolis, IN 46234
            </p>
            <hr style={{width:"90%",margin:"10px auto"}}/>
            <p>Copyright &copy; 2021 TennisLab, Inc. All Rights Reserved</p>
            
        </div>
    )}
}