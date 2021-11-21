import React from 'react';
import {Card, Row, Col, Button, Table} from 'react-bootstrap';

type Match = {
    token: string,
    matches: [],
    matchList: [],
}
type MatchDetails = {
    id: string,
    matchTitle: string,
    matchScore: string,
    playerID: string
}

export default class MatchList extends React.Component<{},Match>{
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            matchList: [],
            matches: []
        }
    }
    
    fetchMatches() {
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/matches/all-matches`, {
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
        this.fetchMatches()
       
    }


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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  
                { this.state.matches.map((match: MatchDetails, index) => (
                    <tr style={{verticalAlign:"middle"}}>
                        <td>{1+index}</td>
                        <td>{match.matchTitle}</td>
                        <td>{match.matchTitle}</td>
                        <td>{match.matchScore}</td>
                        <td>
                            <Button>Delete</Button>
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