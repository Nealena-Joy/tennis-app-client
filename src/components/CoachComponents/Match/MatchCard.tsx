import React from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';


export default class MatchCard extends React.Component {
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            matchList: [],
            matches: []
        }}
   

    render() {
    return(
        <Card style={{marginBottom:"10px",marginRight:"20px"}}>
            <Row>
                
            </Row>
        </Card>
    )}   
}