import React from 'react';
import {Form, Row, Col, Button } from 'react-bootstrap';
import '../../assets/styles.css';
import APIURL from '../../../helpers/environment';

type States = {
    All_Matches: [],
    matches: [],
    match: [],
    matchId: string,
    matchScore: string,
    gameScore1: string,
    gameScore2: string,
    Points: [],
    pointID: string,
    setScore: string,
    gameScore: string,
    serveResult: string,
    pointResult: string,
    coachComment: string,
    coachID: string,
}

type MatchDetails = {
    id: string,
    matchFormat: string,
    matchScore: string,
    matchTitle: string,
    matchWinner: string,
    playerID: string,
}

export default class Points extends React.Component<{}, States> {
    constructor(props: any){
        super(props)
        this.state = {
            All_Matches: [],
            matches: [],
            match: [],
            matchId: '',
            matchScore: '',
            
            Points: [],
            gameScore1: '',
            gameScore2: '',
            pointID: '',
            setScore: '',
            gameScore: '',
            serveResult: '',
            pointResult: '',
            coachComment: '',
            coachID: '',
            

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //!  GET LIST OF MATCHES
    fetchMatches() {
        let token = localStorage.getItem('token')

        fetch(`${APIURL}/matches/all-matches`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                matches: response.All_Matches
            })
            console.log("Matches:", response.All_Matches)
        })
        .catch((error) => console.log("Matches Error:", error))
    }

    componentDidMount(){
        this.fetchMatches();
    }

    //!  CREATE A POINT
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submit:", this.state)

        let token = localStorage.getItem('token');
        //let gameScore = `${this.state.gameScore1}-${this.state.gameScore2}`;

        fetch(`${APIURL}/points/point`,{
            method: 'POST',
            body: JSON.stringify({point: 
                {
                    setScore: this.state.setScore,
                    gameScore: `${this.state.gameScore1}-${this.state.gameScore2}`,
                    serveResult: this.state.serveResult,
                    pointResult: this.state.pointResult,
                    coachComment: this.state.coachComment,
                    matchId: this.state.matchId
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json()) 
        .then((response) => {
            console.log("Point Created:", response)
        })
        .catch(error => {console.log("Sign Up Error:", error)})
    };
    componenDidMount(event: React.FormEvent<HTMLFormElement>){
        this.handleSubmit(event);
    }

    render() {
    return(
        <div className="PointsCreate" style={{paddingTop:"50px"}}>
            <div style={{paddingTop:"30px",width:"80%",margin:"auto"}}>
                <h3 style={{color:"whitesmoke"}}>Player Analysis </h3>
                <a href="#points" style={{color:"yellow"}}>(View Points)</a>
                <p style={{color:"#697d82",lineHeight:"0.9",fontStyle:"italic",margin:"10px 0"}}>
                    * Select a match to analyze.<br/>
                    * Fill in the required fields.<br/>
                    * Add your analysis on the current point, if needed.
                </p>
            </div>
            <Form onSubmit={this.handleSubmit}
            style={{width:"80%",margin:"40px auto",backgroundColor:"lightblue",padding:"50px",borderRadius:"5px"}}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Match*</Form.Label>
                    <Col sm={10}>
                        <Form.Select aria-label="Floating label select example" 
                            required 
                            name="matchId"
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>this.setState({matchId: event.target.value})} >
                            <option>Select match</option>

                            {this.state.matches.map((match: MatchDetails, index) => (
                                <option key={1+index} value={match.id} >
                                    {match.matchTitle}
                                </option>
                            ))}
                            
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Set Score</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="" name="matchScore" required
                            value={this.state.setScore} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({setScore: event.target.value})}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Game Score Player 1*</Form.Label>
                    <Col sm={10} style={{display:"inline"}}>
                        <Form.Check inline type="radio" required
                            label="0" value="0" name="gameScore1" id="gameScore1"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore1: event.target.value})} />
                        <Form.Check inline type="radio" required
                            label="15" value="15" name="gameScore1" id="gameScore1"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore1: event.target.value})} />
                        <Form.Check inline type="radio" required
                            label="30" value="30" name="gameScore1" id="gameScore1"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore1: event.target.value})} />
                        <Form.Check inline type="radio" required
                            label="40" value="40" name="gameScore1" id="gameScore1"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore1: event.target.value})} />
                        <Form.Check inline type="radio" required
                            label="AD" value="AD" name="gameScore1" id="gameScore1"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore1: event.target.value})} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Game Score Player 2*</Form.Label>
                    <Col sm={10}>
                        <Form.Check inline type="radio" required
                            label="0" value="0" name="gameScore2" id="gameScore2" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore2: event.target.value})}/>
                        <Form.Check inline type="radio" required
                            label="15" value="15" name="gameScore2" id="gameScore2" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore2: event.target.value})}/>
                        <Form.Check inline type="radio" required
                            label="30" value="30" name="gameScore2" id="gameScore2" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore2: event.target.value})}/>
                        <Form.Check inline type="radio" required
                            label="40" value="40" name="gameScore2" id="gameScore2" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore2: event.target.value})}/>
                        <Form.Check inline type="radio" required
                            label="AD"  value="AD" name="gameScore2" id="gameScore2"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore2: event.target.value})} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Player 1 Serve or Return*</Form.Label>
                    <Col sm={10}>
                        <Form.Check inline type="radio" required
                            label="1st Serve" value="1st Serve" name="serveResult" id="serveResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({serveResult: event.target.value})}/>
                        <Form.Check inline type="radio" required
                            label="2nd Serve" value="2nd Serve" name="serveResult" id="serveResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({serveResult: event.target.value})}/>
                        <Form.Check inline type="radio" required
                            label="Return" value="Return" name="serveResult" id="serveResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({serveResult: event.target.value})}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>Point Result*</Form.Label>
                    <Col sm={10}>
                        <Form.Check inline type="radio" required
                            label="Winner" value="Winner" name="pointResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})} />
                        <Form.Check inline type="radio" required
                            label="Forced Error On Opponent" value="Forced Error On Opponent"  name="pointResult"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})} />
                        <Form.Check inline type="radio" required
                            label="Unforced Error" value="Unforced Error" name="pointResult"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})}/>
                        <Form.Check inline type="radio" required
                            label="Double Fault" value="Double Fault" name="pointResult"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})}/>
                    </Col>
                </Form.Group>
         
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Coach's Comment</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" rows={3} placeholder="" 
                        name="coachComment" value={this.state.coachComment}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({coachComment: event.target.value})}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit"
                        style={{border:"none",borderRadius:"50px",marginTop:"30px",
                        width:"110px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#008EC3"}}>
                            Submit</Button>
                    </Col>
                </Form.Group>

            </Form>
        </div>
    )}
}