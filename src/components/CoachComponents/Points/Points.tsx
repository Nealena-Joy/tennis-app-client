import React from 'react';
import {Form, Row, Col, Button } from 'react-bootstrap';
import PointsList from './PointsList';

export default class Points extends React.Component {
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
           
        }
    }
    
    fetchPoints() {
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/points/point`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                Points: response.All_Matches
            })
            console.log("Points:", response.All_Matches)
        })
        .catch((error) => console.log("Matches Error:", error))
    }

    componentDidMount(){
        this.fetchPoints()
       
    }

    render() {
    return(
        <div>
            <h4>Match Analysis</h4>
            <Form style={{width:"80%",margin:"40px auto",backgroundColor:"lightblue",padding:"10px"}}>
                <h4>Add a point to a match</h4>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Match</Form.Label>
                    <Col sm={10}>
                    <Form.Select aria-label="Floating label select example">
                        <option>Select match</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Set Score</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Game Score Player 1</Form.Label>
                    <Col sm={10} style={{display:"inline"}}>
                        <Form.Check inline type="radio" label="0" name="formHorizontalRadios" id="formHorizontalRadios1" />
                        <Form.Check inline type="radio" label="15" name="formHorizontalRadios" id="formHorizontalRadios1" />
                        <Form.Check inline type="radio" label="30" name="formHorizontalRadios" id="formHorizontalRadios1" />
                        <Form.Check inline type="radio" label="40" name="formHorizontalRadios" id="formHorizontalRadios1" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Game Score Player 2</Form.Label>
                    <Col sm={10}>
                        <Form.Check inline type="radio" label="0" name="player2" id="player2" />
                        <Form.Check inline type="radio" label="15" name="player2" id="player2" />
                        <Form.Check inline type="radio" label="30" name="player2" id="player2" />
                        <Form.Check inline type="radio" label="40" name="player2" id="player2" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Player 1 Serve or Return</Form.Label>
                    <Col sm={10}>
                        <Form.Check inline type="radio" label="1st Serve" name="serve" id="player2" />
                        <Form.Check inline type="radio" label="2nd Serve" name="serve" id="player2" />
                        <Form.Check inline type="radio" label="Return" name="serve" id="player2" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Point Result</Form.Label>
                    <Col sm={10}>
                        <Form.Check inline type="radio" label="Winner" name="point" id="player2" />
                        <Form.Check inline type="radio" label="Forced Error On Opponent" name="point" id="player2" />
                        <Form.Check inline type="radio" label="Unforced Error" name="point" id="player2" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Coach's Comment</Form.Label>
                    <Col sm={10}>
                    <Form.Control as="textarea" rows={3} placeholder="" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>

            </Form>

            <PointsList />
        </div>
    )
    }
}