import React from 'react';
import {Card, Row, Col, Button, Table} from 'react-bootstrap';

type Match = {
    token: string,
    matches: [],
    match: [],
    matchList: [],
    PlayerDetails: []
}
type MatchDetails = {
    id: string,
    matchTitle: string,
    matchScore: string,
    matchWinner: string,
    playerID: string
}
type PlayerDetails = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    userRole: string,
    matches: matches,
}
type matches = {
    match: match,
    id: string,
    matchTitle: string,
    matchScore: string,
    matchWinner: string,
    playerID: string
}
type match = {
    id: string,
    matchTitle: string,
    matchScore: string,
    matchWinner: string,
    playerID: string
}

export default class MatchListTrial extends React.Component<{},Match>{
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            matchList: [],
            matches: [],
            match: [],
            PlayerDetails: []
        }
    }

    //!  GET ALL MATCHES
    fetchMatches() {
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/auth/all-players`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                PlayerDetails: response.PlayerDetails
            })
            console.log("Matches:", response.PlayerDetails)
        })
        .catch((error) => console.log("Matches Error:", error))
    }

    componentDidMount(){
        this.fetchMatches()
    }

    // componentDidUpdate(){
    //     this.fetchMatches()
    // }

    //!  DELETE MATCH
    handleDelete(match: MatchDetails) {
        let token = localStorage.getItem('token');
        if(window.confirm('Are you sure?'))
        {
            fetch(`https://tennis-app-njr.herokuapp.com/matches/delete/${match.id}`, { 
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                })
            })
            .catch(err => {console.log("Delete:",err)});
        }}


    render() {

        return(
        <div style={{textAlign:"center",margin:"0 90px"}}>
            <h4>List of Matches</h4>
            <br/>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Player</th>
                        <th>Match</th>
                        <th>Score</th>
                        <th>Winner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  
                { this.state.PlayerDetails.map((player: PlayerDetails, index) => (
                    <tr style={{verticalAlign:"middle"}} key={1+index}>
                        <td>{1+index}</td>
                        <td>{player.username}</td>
                        {/* <td>{player.matchTitle}</td> */}
                        <td>{player.matches.matchScore}</td>
                        <td>{player.matches.matchWinner}</td>
                        <td>{player.matches.matchWinner}</td>
                        <td>
                            <Button /*onClick={()=> this.handleDelete()}*/>Delete</Button>
                            &nbsp;&nbsp;
                            <Button>Edit</Button>
                        </td>
                    </tr>
                ))}
                    
                </tbody>
            </Table>
        </div>
    )}
}