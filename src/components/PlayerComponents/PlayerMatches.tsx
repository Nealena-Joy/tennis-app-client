import React from 'react';
import {Button, Table} from 'react-bootstrap';

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

export default class PlayerMatches extends React.Component<{},Match> {
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            matchList: [],
            matches: [],
        }
    }

    //!  GET ALL MATCHES OF CURRENT USER
    fetchMatches() {
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/matches/my-matches`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                matches: response.All_My_Matches
            })
            console.log("Matches:", response.All_My_Matches)
        })
        .catch((error) => console.log("Matches Error:", error))
    }

    componentDidMount(){
        this.fetchMatches()
    }


    render() {
    return(
        <div style={{margin:"30px"}}>
            <h4>My Matches</h4>
            <br/>
            <Table responsive>
                <thead>
                    <tr style={{textAlign:"center"}}>
                        <th>#</th>
                        <th>Match</th>
                        <th>Score</th>
                        <th>Winner</th>
                        <th>Comments</th>
                        <th>Match Details</th>
                    </tr>
                </thead>
                <tbody>
                  
                { this.state.matches.map((match: MatchDetails, index) => (
                    <tr style={{verticalAlign:"middle",textAlign:"center"}}>
                        <td>{1+index}</td>
                        <td>{match.matchTitle}</td>
                        <td>{match.matchScore}</td>
                        <td>Joy</td>
                        <td>Good job overall. You executed what we practiced last week.</td>
                        <td><Button>View Details</Button></td>
                    </tr>
                ))}
                    
                </tbody>
            </Table>
        </div>
    )}
}