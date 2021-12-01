import React from 'react';
import {Table, Modal, Button, Form, ToastContainer, Toast} from 'react-bootstrap';
import WarningImg from '../assets/warning-round-3.png';
import APIURL from '../../helpers/environment';

type States = {
    Player_Details: [],
    point: [],
    show: string,
    username: string,
    deleteError: string,
    showToast: boolean
}

type PlayersList = {
    players: object,
    player: object,
        id: string,
        firstName: string,
        lastName: string,
        username: string,
        matches: object,
        createdAt: string,
    

}



export default class DeletePlayer extends React.Component<{},States> {
    constructor(props: any){
        super(props);
        this.state = {
            Player_Details: [],
            point: [],
            show: '',
            username: '',
            deleteError: '',
            showToast: false,
        }
    }
    //!  GET ALL PLAYERS & THEIR MATCH INFO
    fetchPlayerDetails() {
        let token = localStorage.getItem('token')

        fetch(`${APIURL}/auth/all-players`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                Player_Details: response.PlayerDetails,
            })
            console.log("Player_Details:", response.PlayerDetails)
        })
        .catch((error) => console.log("Create Items Error:", error))
    }
    //!  DISPLAY PLAYER DETAILS ON PAGE
    componentDidMount(){
        this.fetchPlayerDetails()
    }

    //!  TOGGLE MODAL (CONFIRM DELETE)
    handleShow = (value: string) => {
        this.setState({show: value})
    }
    handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({show: '0', deleteError: ''})
    }

    //!  DELETE PLAYER
    handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string, username: string) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let trueUsername = `${username}`;

        if (this.state.username === ''){
            this.setState({
                deleteError: `Oops. Please type the player's username.`
            })
        } else if (this.state.username === trueUsername) {
            console.log("Fetch");
            fetch(`${APIURL}/auth/player-delete/${id}`,{
                method: 'DELETE',
                body: JSON.stringify({user: 
                    {
                        playerID: `${id}`,
                        gameScore: `${this.state.username}`,
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                })
            })
            .then(response => {
                response.json(); 
                this.setState({
                    show: '0',
                    showToast: true
                })
            })
            .catch((error) => console.log("Player Delete Error:", error))
            //this.setState({show: "false"})
        } else {
            this.setState({
                deleteError: 'Oops. You did not type the correct username.'
            })
        }
    }

    render() {
    return(
        <div style={{padding:"10px",border:"1px solid lightgrey",borderTop:"0",backgroundColor:"white",height:"600px"}}>                     
            <div style={{margin:"30px"}}>
                <p>Player Info</p>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username / Email</th>
                            <th>Player ID</th>
                            <th>Date Registered</th>
                            <th>Matches</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.Player_Details.map((player: PlayersList, index) => (
                        <tr style={{verticalAlign:"top"}} key={1+index}>
                            <td>{1+index}</td>
                            <td>{player.lastName}, {player.firstName}</td>
                            <td>{player.username}</td>
                            <td>{player.id}</td>
                            <td>{(player.createdAt).substring(0,10)}</td>
                            <td>{Object.keys(player.matches).length}</td>
                            <td>
                                <button onClick={() => this.handleShow(player.id)}
                                style={{border:"none",backgroundColor:"transparent",color:"red"}}>
                                    <u>Delete</u>
                                </button>

                                <Modal backdrop="static" centered key={index} 
                                    show={this.state.show === player.id} onHide={this.handleClose}>
                                    <Modal.Body style={{textAlign:"center",border:"10px solid #A00000",boxShadow:"8px 8px 8px #303030e9"}}>
                                        <img alt="warning" src={WarningImg} style={{marginTop:"-80px"}} height={100}/>
                                        <br/>
                                        <h4 style={{marginTop:"20px"}}>Are you sure you want to <br/>delete this player?</h4>
                                        <h4 style={{color:"red",fontWeight:"bold"}}>{player.firstName} {player.lastName}</h4>
                                        <Form style={{}}>
                                            This action cannot be undone.<br/>
                                            Please type the player's username/email to confirm.<br/>
                                            <Form.Control type="text" name="username" style={{margin:"1em auto",backgroundColor:"pink",width:"80%"}}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({username: event.target.value})}>
                                            </Form.Control>
                                        </Form>
                                 
                                        <Button style={{margin:"0 1em",backgroundColor:"#A00000",border:"none",borderRadius:"50px",width:"100px"}}
                                            onClick={(e)=>this.handleDelete(e, player.id, player.username)}>
                                            Delete
                                        </Button>
                                        <Button style={{margin:"0 1em",backgroundColor:"grey",border:"none",borderRadius:"50px",width:"100px"}}
                                            onClick={(e)=>this.handleClose(e)}>
                                            Cancel
                                        </Button>
                                        <br/>
                                        <p style={{height:"30px",padding:"10px",color:"red"}}>
                                            <i><b>{this.state.deleteError}</b></i>
                                        </p>

                                    </Modal.Body>
                                </Modal>

                                <ToastContainer position="top-end" className="p-3" style={{marginTop:"100px"}}>
                                    <Toast show={this.state.showToast} delay={5000} autohide 
                                        onClose={() => this.setState({showToast: false})}>
                                        <Toast.Header>
                                            <strong className="me-auto">Nofication</strong>
                                            <small className="text-muted">just now</small>
                                        </Toast.Header>
                                        <Toast.Body>Successfully deleted player</Toast.Body>
                                    </Toast>
                                    
                                </ToastContainer>



                            </td>
                           
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )}
}