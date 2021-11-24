import React from 'react';
import { Form, Row, FloatingLabel, Col, Button } from 'react-bootstrap';
import MatchList from './MatchList';

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
type MatchDetails = {
    playerID: string,
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

    fetchPlayers() {
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/auth/all-players`,{
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

    componentDidMount(){
        this.fetchPlayers();
    }

    // componentWillUnmount(){
    //     this.formSubmit();
    // }

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
        .catch((error) => console.log("Match Error:", error))
    }



    render() {
    return(
        <div>
            <Form onSubmit={this.formSubmit}>
            <Row className="g-2" style={{width:"80%",margin:"40px auto",padding:"15px",backgroundColor:"lightskyblue"}}>
                <h4>Matches</h4>
 
                <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Select a player">
                        <Form.Select aria-label="Floating label select example" 
                            required  
                            name="playerID" 
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>this.setState({playerID: event.target.value})}>
                            <option>Open this select menu</option>

                            {this.state.players.map((player: PlayerDetails, index) => (
                                <option key={1+index} value={player.id} >
                                   {player.username}
                                </option>
                            ))}

                        </Form.Select>
                    </FloatingLabel>
                    <br/>
                    <FloatingLabel controlId="floatingInputGrid" label="Match Title">
                        <Form.Control type="text" placeholder="Ex: Player 1 vs Player 2" 
                            value={this.state.matchTitle} name="matchTitle" required
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchTitle: event.target.value})} />
                    </FloatingLabel>
                    <br/>
                    <FloatingLabel controlId="floatingInputGrid" label="Winner">
                            <Form.Control type="text" placeholder="8-3" required name="matchWinner"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchWinner: event.target.value})} />
                    </FloatingLabel>
                </Col>
 
                <Col>
                    <FloatingLabel controlId="floatingInputGrid" label="Match Format">
                        <Form.Select aria-label="Floating label select example" 
                            required name="matchFormat" value={this.state.matchFormat}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>this.setState({matchFormat: event.target.value})} >

                            <option>Open this select menu</option>
                            <option value="Short Set (1st to 4 games)" >Short Set (1st to 4 games)</option>
                            <option value="Pro-Set (8 game)" disabled>Pro-Set (8 game)</option>
                            <option value="Pro-Set (10 game)<" disabled>Pro-Set (10 game)</option>
                            <option value="Best of 3 sets" disabled>Best of 3 sets</option>
                        </Form.Select>
                    </FloatingLabel>
                    <br/>
                    <FloatingLabel controlId="floatingInputGrid" label="Final Score">
                        <Form.Control type="text" placeholder="8-3" required name="matchScore"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchScore: event.target.value})} />
                    </FloatingLabel>
                </Col>

                <hr style={{color:"transparent"}}/>
                <Button style={{width:"150px",margin:"10px"}} type="submit">Add Match</Button>
                <hr/>

                <p style={{color:"grey",lineHeight:"0.9",fontStyle:"italic"}}>
                    Note: <br/>
                    * Match Title Example: Player 1 vs Player 2 <br/>
                    * Final Score Example: 8-6 <br/>
                    * Player 1 or the first player mentioned is always the one being evaluated
                </p>
            </Row>
            </Form>
            <div>
                <MatchList />
            </div>
        </div>
    )
    }
}