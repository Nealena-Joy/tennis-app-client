import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import APIURL from '../../../helpers/environment';

type PointProps = {

    pointID: string,
    setScore: string,
    gameScore: string,
    serveResult: string,
    pointResult: string,
    coachComment: string,
    matchId: string,
}
type States = {
    All_Matches: [],
    matches: [],
    match: [],
    matchId: string,
    matchScore: string,
    Points: [],
    pointID: string,
    setScore: string,
    gameScore: string,
    serveResult: string,
    pointResult: string,
    coachComment: string,
    coachID: string,
    updateStatus: string,
}
type MatchDetails = {
    id: string,
    matchTitle: string,
    matchFormat: string,
    matchScore: string,
    matchWinner: string,
    playerID: string
}

export default class PointEdit extends React.Component<PointProps,States> {
    constructor(props: any){
        super(props)
        this.state = {
            All_Matches: [],
            matches: [],
            match: [],
            matchScore: '',
            Points: [],
            updateStatus: '',
            pointID: `${this.props.pointID}`,
            matchId: `${this.props.matchId}`,
            setScore: `${this.props.setScore}`,
            gameScore: `${this.props.gameScore}`,
            serveResult: `${this.props.serveResult}`,
            pointResult: `${this.props.pointResult}`,
            coachComment: `${this.props.coachComment}`,
            coachID: '',
        }
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

    //! UPDATE / EDIT  POINT DETAILS
    updatePoint(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log("Submit:", this.state)
        let token = localStorage.getItem('token');

        fetch(`${APIURL}/points/update/${this.props.pointID}`,{
            method: 'PUT',
            body: JSON.stringify({point: 
                {   
                    setScore: this.state.setScore,
                    gameScore: this.state.gameScore,
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
            console.log("Point Updated:", response)
            let success = response.ok;
            if(!success){
                this.setState({
                    updateStatus: 'Oops! Point not updated. Please check for required fields.'
                })
            } else {
                this.setState({
                    updateStatus: 'Point successfully updated!'
                })
            }
        })
        .catch(error => {console.log("Point Update Error:", error)})
    };


    render() {
    return(
        <div>
            <Form>
                <Form.Group style={{marginBottom:"15px"}}>
                    <Form.Label>Point ID</Form.Label>
                        <Form.Control type="text" placeholder="" readOnly={true}
                        name="coachComment" value={this.props.pointID}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointID: event.target.value})}/>
                </Form.Group>
                <Form.Group style={{marginBottom:"15px"}}>
                    <Form.Label>Match Title</Form.Label>
                    <Form.Select aria-label="Floating label select example" 
                        required 
                        name="matchId"
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>this.setState({matchId: event.target.value})} >
                        <option>Select match*</option>

                        {this.state.matches.map((match: MatchDetails, index) => (
                            <option key={1+index} value={match.id} >
                                {match.matchTitle}
                            </option>
                        ))}
                                
                    </Form.Select>
                </Form.Group>
                <Form.Group style={{marginBottom:"15px"}}>
                    <Form.Label>Set Score*</Form.Label>
                        <Form.Control type="text" placeholder="" name="matchScore" required
                            value={this.state.setScore} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({setScore: event.target.value})}/>
                </Form.Group>
                <Form.Group style={{marginBottom:"15px"}}>
                    <Form.Label>Game Score*</Form.Label>
                        <Form.Control type="text" placeholder="" name="gameScore" required
                            value={this.state.gameScore} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({gameScore: event.target.value})}/>
                </Form.Group>
                <Form.Group style={{marginBottom:"15px"}}>
                    <Form.Label>Player 1 Serve or Return*</Form.Label>
                        <Form.Check type="radio" required style={{marginLeft:"20px"}}
                            label="1st Serve" value="1st Serve" name="serveResult" id="serveResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({serveResult: event.target.value})}/>
                        <Form.Check type="radio" required style={{marginLeft:"20px"}}
                            label="2nd Serve" value="2nd Serve" name="serveResult" id="serveResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({serveResult: event.target.value})}/>
                        <Form.Check type="radio" required style={{marginLeft:"20px"}}
                            label="Return" value="Return" name="serveResult" id="serveResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({serveResult: event.target.value})}/>
                </Form.Group>
                <Form.Group style={{marginBottom:"15px"}}>
                    <Form.Label>Point Result*</Form.Label>
                        <Form.Check type="radio" required style={{marginLeft:"20px"}}
                            label="Winner" value="Winner" name="pointResult" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})} />
                        <Form.Check type="radio" required style={{marginLeft:"20px"}}
                            label="Forced Error On Opponent" value="Forced Error On Opponent"  name="pointResult"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})} />
                        <Form.Check type="radio" required style={{marginLeft:"20px"}}
                            label="Unforced Error" value="Unforced Error" name="pointResult"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})}/>
                        <Form.Check type="radio" required style={{marginLeft:"20px"}}
                            label="Double Fault" value="Double Fault" name="pointResult"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({pointResult: event.target.value})}/>
                </Form.Group>
                <Form.Group style={{marginBottom:"15px"}}>
                    <Form.Label>Coach's Comment</Form.Label>
                        <Form.Control as="textarea" placeholder="" 
                        name="coachComment" value={this.state.coachComment}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({coachComment: event.target.value})}/>
                </Form.Group>
                <Form.Group as={Row} style={{height:"100px"}}>
                    <Col sm={3} >
                        <Button onClick={(e)=>this.updatePoint(e)}
                        style={{border:"none",borderRadius:"50px",marginTop:"30px",
                        width:"110px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#008EC3"}}>
                            Update
                        </Button>
                    </Col>
                    <Col sm={9} >
                        <p style={{color:"red",textAlign:"center",verticalAlign:"middle",height:"30px"}}>
                            <i>{this.state.updateStatus}</i>
                        </p>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
    }
}