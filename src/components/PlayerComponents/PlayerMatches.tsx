import React from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import MatchPoints from './MatchDetails';
import APIURL from '../../helpers/environment';

type Match = {
    token: string,
    matches: [],
    matchList: [],
    show: string,
    matchID: string,
    text: string,
}
type MatchDetails = {
    id: string,
    matchTitle: string,
    matchFormat: string,
    matchScore: string,
    playerID: string,
    matchWinner: string
}

export default class PlayerMatches extends React.Component<{},Match> {
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            matchList: [],
            matches: [],
            show: '0',
            matchID: '',
            text: '',
            
        }
    }

    //!  GET ALL MATCHES OF CURRENT USER
    fetchMatches() {
        let token = localStorage.getItem('token')

        fetch(`${APIURL}/matches/my-matches`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("Matches:", response.All_My_Matches);
            this.setState({matches: response.All_My_Matches})
        })
        .catch((error) => console.log("Matches Error:", error))
    }

    componentDidMount(){
        this.fetchMatches()
    }

    //!  TOGGLE MODAL TO EDIT ITEM
    handleShow = (value: string) => {
        this.setState({show: value})
    }
    handleClose = (value: string) => {
        this.setState({show: '0'})
    }

    render() {
    return(
        <div className="playerMatches" style={{padding:"80px 30px"}}>
            <h4>My Matches</h4>

            <Table responsive style={{backgroundColor:"#F8F9F8",borderRadius:"5px"}}>
                <thead>
                    <tr style={{textAlign:"center"}}>
                        <th>#</th>
                        <th>Match</th>
                        <th>Format</th>
                        <th>Score</th>
                        <th>Winner</th>
                        <th>Overall Comments</th>
                        <th>Match Analysis</th>
                    </tr>
                </thead>
                <tbody>
                  
                { this.state.matches.map((match: MatchDetails, index) => (
                    <tr style={{verticalAlign:"middle",textAlign:"center"}}>
                        <td>{1+index}</td>
                        <td>{match.matchTitle}</td>
                        <td>{match.matchFormat}</td>
                        <td>{match.matchScore}</td>
                        <td>{match.matchWinner}</td>
                        <td>Good job overall. You executed what we practiced last week.</td>
                        <td>
                            <Button onClick={() => this.handleShow(match.id)}>
                                View
                            </Button>

                            <Modal fullscreen={true} key={index} show={this.state.show === match.id} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Match Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <MatchPoints matchID={match.id} matchTitle={match.matchTitle} matchScore={match.matchScore} matchFormat={match.matchFormat} matchWinner={match.matchWinner}/>
                                </Modal.Body>
                            </Modal>                            


                        </td>
                    </tr>
                ))}
                    
                </tbody>
            </Table>
        </div>
    )}
}