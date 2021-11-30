import React from 'react';
import { Form, Row, FloatingLabel, Col, Button } from 'react-bootstrap';
import MatchList from './MatchList';
import '../../assets/styles.css';
import APIURL from '../../../helpers/environment';

type Player = {
    token: string,
    players: [],
    playerID: string,
    id: string,
    playersList: [],
    name: string,
    value: string,
    match: [],
    matchFormat: string,
    matchScore: string,
    matchTitle: string,
    matchWinner: string,
}
type PlayerDetails = {
    username: string,
    id: string,
    firstName: string,
    lastName: string,
    playerID: string
}

export default class MatchesCreate extends React.Component<{},Player> {
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            playersList: [],
            players: [],
            playerID: '',
            id: '',
            value: '',
            name: '',
            matchFormat: '',
            matchScore: '',
            matchTitle: '',
            matchWinner: '',
            match: [],
        }
        this.formSubmit = this.formSubmit.bind(this);
    }

    //!  FETCH LIST OF PLAYERS & THEIR INFO
    fetchPlayers() {
        let token = localStorage.getItem('token')

        fetch(`${APIURL}/auth/all-players`,{
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                players: response.PlayerDetails});
            console.log("Players:",response.PlayerDetails);
        })
        .catch((error) => console.log("Player Error:", error))
    }

    //!  SHOW PLAYERS ON FORM DROP DOWN
    componentDidMount(){
        this.fetchPlayers();
    }

    //! CREAT MATCH
    formSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submit", this.state)
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/matches/creatematch`,{
            method: 'POST',
            body: JSON.stringify({match: 
                {
                    matchTitle: this.state.matchTitle,
                    matchFormat: this.state.matchFormat,
                    matchScore: this.state.matchScore,
                    matchWinner: this.state.matchWinner,
                    playerID: this.state.playerID,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("Match Created:",response);
        })
        .catch((error) => console.log("Match Error:", error));
    }

    render() {
    return(
        <div className="CMatchCreate" style={{paddingTop:"50px"}}>
            <Form onSubmit={this.formSubmit} className="MatchCreateForm"
            style={{paddingTop:"30px",width:"80%",margin:"auto"}}>
                <h3 style={{color:"whitesmoke"}}>Create a match</h3>
                <p style={{color:"#697d82",lineHeight:"0.9",fontStyle:"italic",margin:"30px 0"}}>
                    * Match Title Example: Player 1 vs Player 2 [2021-12-01]<br/>
                    * Final Score Example: 8-6 <br/>
                    * Player 1 or the first player mentioned is always the one being evaluated
                </p>
            <Row className="g-2"> 
                <Col sm style={{marginRight:"10px"}}>
                    <FloatingLabel controlId="floatingSelectGrid" label="Select a player">
                        <Form.Select aria-label="Floating label select example" 
                            required  
                            name="playerID" 
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>this.setState({playerID: event.target.value})}>
                            <option>Open this select menu</option>

                            {this.state.players.map((player: PlayerDetails, index) => (
                                <option key={1+index} value={player.id} >
                                   {player.firstName} {player.lastName}&nbsp;&nbsp;({player.username})
                                </option>
                            ))}

                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm>
                    <FloatingLabel controlId="floatingInputGrid" label="Match Format">
                        <Form.Select aria-label="Floating label select example" 
                            required name="matchFormat" value={this.state.matchFormat}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>this.setState({matchFormat: event.target.value})} >

                            <option>Open this select menu</option>
                            <option value="Short Set (1st to 4 games)" >Short Set (1st to 4 games)</option>
                            <option value="Pro-Set (8 game)" >Pro-Set (8 game)</option>
                            <option value="Pro-Set (10 game)<" >Pro-Set (10 game)</option>
                            <option value="Best of 3 sets" >Best of 3 sets</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            
            <Row className="g-2" style={{marginTop:"1em"}}>
                <Col sm>
                    <FloatingLabel controlId="floatingInputGrid" label="Match Title">
                        <Form.Control type="text" placeholder="Ex: Player 1 vs Player 2" 
                            value={this.state.matchTitle} name="matchTitle" required
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchTitle: event.target.value})} />
                    </FloatingLabel>
                </Col>
                <Col sm>
                    <FloatingLabel controlId="floatingInputGrid" label="Winner">
                            <Form.Control type="text" placeholder="8-3" required name="matchWinner"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchWinner: event.target.value})} />
                    </FloatingLabel>
                </Col>
                <Col sm>
                    <FloatingLabel controlId="floatingInputGrid" label="Final Score">
                        <Form.Control type="text" placeholder="8-3" required name="matchScore"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchScore: event.target.value})} />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <hr style={{color:"transparent"}}/>
                <Button type="submit"
                style={{border:"none",borderRadius:"50px",margin:"30px 10px",
                width:"110px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#008EC3"}}>
                    Add Match
                </Button>
                <hr style={{color:"whitesmoke"}}/>
            </Row>
            </Form>

            <MatchList />
         
        </div>
    )
    }
}