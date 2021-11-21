import React from 'react';
import { Form, Row, FloatingLabel, Col, Button } from 'react-bootstrap';
import MatchList from './MatchList';

type Player = {
    token: string,
    players: [],
    playerID: string,
    playersList: [],
    name: string,
    value: string,
    match: [],
    matchFormat: string,
    matchScore: string,
    matchTitle: string,
}
type MatchDetails = {
    playerID: string,
    matchFormat: string,
    matchScore: string,
    matchTitle: string,
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
            value: '',
            name: '',
            matchFormat: '',
            matchScore: '',
            matchTitle: '',
            match: []
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    fetchPlayers() {
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/auth/players`,{
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({players: response.Players});
            console.log("Players:",response.Players);
        })
        .catch((error) => console.log("Player Error:", error))
    }

componentDidMount(){
        this.fetchPlayers()
        
        
    }

    // CREAT MATCH
    handleChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            value: event.target.value
        });
    }

    handleOptions(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            playerID: event.target.value,
            matchFormat: event.target.value,
            matchTitle: event.target.value,
            matchScore: event.target.value
        })
    }

    formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(this.state)
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/matches/creatematch`,{
            method: 'POST',
            body: JSON.stringify({match: 
                this.state

            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        // .then((response) => {
        //     this.setState({players: response.Players});
        //     console.log("Match Created:",response.Players);
        // })
        .catch((error) => console.log("Player Error:", error))
    }



    render() {
    return(
        <div>
            <Form onClick={this.formSubmit}>
            <Row className="g-2" style={{width:"80%",margin:"40px auto",padding:"15px",backgroundColor:"lightskyblue"}}>
                <h4>Matches</h4>
                <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Select a player">
                        <Form.Select aria-label="Floating label select example" 
                        required onChange={this.handleOptions} name="playerIDname" value={this.state.playerID}>
                            <option>Open this select menu</option>
                            {this.state.players.map((player: PlayerDetails) => (
                                <option key={player.playerID} value={player.playerID}>
                                    ({player.username})
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                    <br/>
                    <FloatingLabel controlId="floatingInputGrid" label="Match Title">
                        <Form.Control type="text" placeholder="Ex: Player 1 vs Player 2" 
                            required onChange={this.handleChange} name="matchTitle"/>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Match Format">
                        <Form.Select aria-label="Floating label select example" 
                            required onChange={this.handleOptions} name="matchFormat" value={FormData.name || ''}>
                            <option>Open this select menu</option>
                            <option value="Short Set (1st to 4 games)" >Short Set (1st to 4 games)</option>
                            <option value="Pro-Set (8 game)" disabled>Pro-Set (8 game)</option>
                            <option value="Pro-Set (10 game)<" disabled>Pro-Set (10 game)</option>
                            <option value="Best of 3 sets" disabled>Best of 3 sets</option>
                        </Form.Select>
                    </FloatingLabel>
                    <br/>
                    <FloatingLabel controlId="floatingInputGrid" label="Final Score">
                        <Form.Control type="text" placeholder="8-3" required 
                        onChange={this.handleChange} name="matchScore"/>
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