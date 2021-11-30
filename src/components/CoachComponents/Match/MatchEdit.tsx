import React, { ReactNode } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';

type MatchProps = {
    matchID?: string,
    matchTitle?: string,
    matchFormat?: string,
    matchScore?: string,
    matchWinner?: string,
    playerID?: string,
}
type States = {
    players: [],
    playerID: string,
    matchFormat: string,
    matchScore: string,
    matchTitle: string,
    matchWinner: string,
    playersList: [],
    updateStatus: string,
}
type PlayerDetails = {
    username: string,
    id: string,
    firstName: string,
    lastName: string,
    playerID: string
}

export default class MatchEdit extends React.Component<MatchProps,States> {
    constructor(props: MatchProps){
        super(props)
        this.state = {
            playersList: [],
            players: [],
            playerID: `${this.props.playerID}`,
            matchTitle: `${this.props.matchTitle}`,
            matchFormat: `${this.props.matchFormat}`,
            matchScore: `${this.props.matchScore}`,
            matchWinner: `${this.props.matchWinner}`,
            updateStatus: '',
        }
        this.formSubmit = this.formSubmit.bind(this);

    }

    //!  FETCH LIST OF PLAYERS & THEIR INFO
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

    //!  SHOW PLAYERS ON FORM DROP DOWN
    componentDidMount(){
        this.fetchPlayers();
    }

    //! UPDATE MATCH INFO
    formSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log("Submit", this.state)
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/matches/update/${this.props.matchID}`,{
            method: 'PUT',
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
            
            let success = response.ok;
            if(!success){
                this.setState({
                    updateStatus: 'Oops! Match not updated. Please check for required fields.'
                })
            } else {
                this.setState({
                    updateStatus: 'Match successfully updated!'
                })
            }

        })
        .catch((error) => console.log("Match Error:", error));
    }

    render(){
    return(
        <div>
            <p style={{color:"red",textAlign:"center",verticalAlign:"middle",height:"30px"}}>
                {this.state.updateStatus}
            </p>
            <Form className="MatchCreateForm"
            style={{paddingTop:"30px",margin:"auto"}}>
                <FloatingLabel controlId="floatingInputGrid" label="Match ID*">
                    <Form.Control type="text" required name="matchID"
                        readOnly={true} placeholder="" value={this.props.matchID} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelectGrid" label="Select a player*">
                    <Form.Select aria-label="Floating label select example" 
                        required name="playerID"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>this.setState({playerID: e.target.value})}>
                        <option>Open this select menu</option>

                        {this.state.players.map((player: PlayerDetails, index) => (
                            <option key={1+index} value={player.id} >
                                {player.firstName} {player.lastName}&nbsp;&nbsp;({player.username})
                            </option>
                        ))}

                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputGrid" label="Match Format*">
                    <Form.Select aria-label="Floating label select example" 
                        required name="matchFormat" value={this.state.matchFormat}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>this.setState({matchFormat: e.target.value})} >

                        <option>Open this select menu</option>
                        <option value="Short Set (1st to 4 games)" >Short Set (1st to 4 games)</option>
                        <option value="Pro-Set (8 game)" disabled>Pro-Set (8 game)</option>
                        <option value="Pro-Set (10 game)<" disabled>Pro-Set (10 game)</option>
                        <option value="Best of 3 sets" disabled>Best of 3 sets</option>
                        
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputGrid" label="Match Title*">
                    <Form.Control type="text" placeholder="Ex: Player 1 vs Player 2" 
                        name="matchTitle" required 
                        value={this.state.matchTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchTitle: e.target.value})} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputGrid" label="Winner*">
                    <Form.Control type="text" placeholder="8-3" required name="matchWinner" 
                        value={this.state.matchWinner}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchWinner: e.target.value})} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInputGrid" label="Final Score*">
                    <Form.Control type="text" placeholder="8-3" required name="matchScore"
                        value={this.state.matchScore}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({matchScore: e.target.value})} />
                </FloatingLabel>
                <Button
                    onClick={(e) => this.formSubmit(e)}
                    style={{border:"none",borderRadius:"50px",margin:"0 0",
                    width:"110px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#008EC3"}}>
                    Update
                </Button>
            </Form>


        </div>
    )}
}