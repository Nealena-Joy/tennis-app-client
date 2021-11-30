import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import WarningImg from '../assets/warning-round-3.png';
import GuestLandingPage from '../auth/GuestLandingPage';

type States = {
    show: boolean,
    username: string,
    deleteError: string,
}

export default class DeleteCurrentUser extends React.Component<{},States> {
    constructor(props: any){
        super(props);
        this.state = {
            show: false,
            username: '',
            deleteError: '',
        }
    }

    //!  TOGGLE MODAL (CONFIRM DELETE)
    handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({show: true})
    }
    handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({show: false, deleteError: ''})
    }

    //!  DELETE CURRENT USER
    handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let trueUsername = localStorage.getItem('username');
        let id = localStorage.getItem('userID');


        if (this.state.username === ''){
            this.setState({
                deleteError: `Oops! Please type your username.`
            })
        } else if (this.state.username === trueUsername) {
            fetch(`https://tennis-app-njr.herokuapp.com/auth/current-delete/${id}`,{
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
            .then(response => {
                response.json(); 
               
                //!  CLEAR LOCAL STORAGE & LOGOUT USER
                localStorage.clear();
                return (<GuestLandingPage />)
            })
            .catch((error) => console.log("Delete Error:", error))
            //this.setState({show: "false"})
        } else {
            this.setState({
                deleteError: 'Oops! You did not type the correct username.'
            })
        }
    }

    render(){
    return (
        <div style={{marginLeft:"30px"}}>
            <div style={{display:"inline-flex",verticalAlign:"middle"}}> 
                <button style={{backgroundColor:"transparent",border:"none",padding:"0",color:"#5799f4"}}
                onClick={(e: React.MouseEvent<HTMLButtonElement>)=>this.handleShow(e)}>
                    <u>Delete account?</u>
                </button>
            </div>
            
            <Modal backdrop="static" centered
                show={this.state.show} onHide={this.handleClose}>
                <Modal.Body style={{textAlign:"center",border:"10px solid #A00000",boxShadow:"8px 8px 8px #303030e9"}}>
                    <img alt="warning" src={WarningImg} style={{marginTop:"-80px"}} height={100}/>
                    <br/>
                    <h4 style={{marginTop:"20px"}}>Are you sure you want to <br/> delete your account?</h4>
                    <Form style={{}}>
                        This action cannot be undone.<br/>
                        Please type your username to confirm.<br/>
                        <Form.Control type="text" name="username" style={{margin:"1em auto",backgroundColor:"pink",width:"80%"}}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({username: e.target.value})}>
                        </Form.Control>
                    </Form>
                
                    <Button style={{margin:"0 1em",backgroundColor:"#A00000",border:"none",borderRadius:"50px",width:"100px"}}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>)=>this.handleDelete(e)}>
                        Delete
                    </Button>
                    <Button style={{margin:"0 1em",backgroundColor:"grey",border:"none",borderRadius:"50px",width:"100px"}}
                        onClick={(e)=>this.handleClose(e)}>
                        Cancel
                    </Button>
                    <br/>
                    <p style={{height:"30px",padding:"10px",color:"red"}}>
                        {this.state.deleteError}
                    </p>

                </Modal.Body>
            </Modal>
        </div>
    )}


}