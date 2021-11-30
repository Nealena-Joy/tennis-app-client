import React from 'react';
import {Form, Col, Row} from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

export default class EventsSettings extends React.Component {
    
    render() {
    return(
        <div style={{padding:"10px",border:"1px solid lightgrey",borderTop:"0",backgroundColor:"white",height:"600px"}}>
            <div style={{margin:"30px"}}>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Col sm={5}>
                            <p>Show the "Events" link on the navigation bar?</p>
                        </Col>
                        <Col sm={5}>
                            <BootstrapSwitchButton checked={true} size="sm" onstyle="dark"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Col sm={5}>
                            <p>Allow players to access the "Events" page?</p>
                        </Col>
                        <Col sm={5}>
                            <BootstrapSwitchButton checked={true} size="sm" onstyle="dark" />
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            
        </div>
    )}
}