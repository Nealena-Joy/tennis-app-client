import React from 'react';
import {Button, Table, OverlayTrigger, Popover, Offcanvas} from 'react-bootstrap';
import Delete from '../../assets/delete.png';
import MatchEdit from './MatchEdit';
import APIURL from '../../../helpers/environment';

type Match = {
    token: string,
    All_Matches: [],
    matches: [],
    match: [],
    matchList: [],
    PlayerDetails: [],
    isHidden: string,
    show: string,
    matchID: string,
    text: string,
    Matches: [],
    didUpdate: boolean,
}
type MatchProps = {
    match?: object,
}
type MatchDetails = {
    id: string,
    matchTitle: string,
    matchFormat: string,
    matchScore: string,
    matchWinner: string,
    playerID: string
}

export default class MatchList extends React.Component<MatchProps,Match>{
    constructor(props: MatchProps){
        super(props)
        this.state = {
            token: '',
            matchList: [],
            matches: [],
            match: [],
            matchID: '',
            PlayerDetails: [],
            All_Matches: [],
            isHidden: '0', 
            show: '0',
            text: '',
            Matches: [], 
            didUpdate: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    //!  GET ALL MATCHES
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

     
            this.setState({All_Matches: response.All_Matches})
           
            console.log("Matches:", response.All_Matches)
        })
        .catch((error) => console.log("Matches Error:", error))
    }

    componentDidMount(){
        this.fetchMatches()
    }

    //!  TOGGLE DELETE CONFIRMATION
    showConfirmation = (value: string) => {
        this.setState({isHidden: value}) 
    }
    hideConfirmation = (value: string) => {
        this.setState({isHidden: '0'})
    }

    //!  DELETE MATCH
    handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        //console.log("Handle Delete", id)
        fetch(`${APIURL}/matches/delete/${id}`, { 
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then(response => {response.json(); this.setState({didUpdate: true})})
        .catch(error => {console.log("Delete:",error)});
    }
    componentDidUpdate() {
        if (this.state.didUpdate === true) {
            this.fetchMatches();
        }
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
        <div className="MatchList" style={{backgroundColor:"transparent",paddingTop:"5em"}}>
            <h3 style={{color:"whitesmoke"}}>
                List of Matches
            </h3> 
            <br/>
            <div style={{backgroundColor:"lightgrey",height:"500px",borderRadius:"5px",overflow:"hidden",overflowX:"hidden"}}>
            <Table responsive style={{}}>
                <thead>
                    <tr >
                        <th>#</th>
                        <th>Player</th>
                        <th>Match</th>
                        <th>Format</th>
                        <th>Score</th>
                        <th>Winner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  
                { this.state.All_Matches.map((match: MatchDetails, index) => (
                    <tr style={{verticalAlign:"top"}} key={1+index}>
                        <td>{1+index}</td>
                        <td>{match.playerID}</td>
                        <td>{match.matchTitle}</td>
                        <td>{match.matchFormat}</td>
                        <td>{match.matchScore}</td>
                        <td>{match.matchWinner}</td>
                        <td>
                   
                            <OverlayTrigger placement="top" trigger="click" key={match.id} rootClose={true}
                            overlay={(
                                <Popover style={{textAlign:"center",width:"200px",padding:"5px",boxShadow:"4px 4px 4px #303030e9",}}>
                                    <p>Are you sure you want to delete this match?</p>
                                    <p><i><b>{match.matchTitle}</b></i></p>
                                 
                                    <Button style={{backgroundColor:"#BD0000",borderRadius:"50px",margin:"5px",
                                        color:"whitesmoke",border:"none",height:"28px",width:"80px",padding:"0"}}
                                        onClick={(e) => this.handleDelete(e, match.id)}>
                                            Delete
                                    </Button>
                                    <Button style={{backgroundColor:"transparent",borderRadius:"50px",margin:"5px",
                                        color:"grey",border:"1px grey solid",height:"28px",width:"80px",padding:"0",}}
                                        onClick={() => document.body.click()}>
                                            Cancel
                                    </Button>
                                </Popover>
                            )}>
                                <button style={{backgroundColor:"transparent",border:"none",verticalAlign:"top"}}>
                                    <img alt="delete" src={Delete} style={{height:"25px"}}/>
                                </button>
                            </OverlayTrigger>
                               
                            &nbsp;&nbsp;
                            <button onClick={() => this.handleShow(match.id)}
                                style={{borderRadius:"50px",width:"60px",color:"#F8F9F8",backgroundColor:"#008EC3",border:"none",height:"30px"}}>
                                Edit
                            </button>

                            <Offcanvas key={index} show={this.state.show === match.id} placement="end" 
                                onHide={this.handleClose}>
                                <Offcanvas.Header>
                                    <Offcanvas.Title>Edit Match Details</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <MatchEdit matchID={match.id} matchTitle={match.matchTitle} matchScore={match.matchScore} 
                                    matchWinner={match.matchWinner} playerID={match.playerID} />
                                </Offcanvas.Body>
                            </Offcanvas>

                        </td>
                    </tr>
                ))}
                    
                </tbody>
            </Table>
            </div>
            
        </div>
    )}
}