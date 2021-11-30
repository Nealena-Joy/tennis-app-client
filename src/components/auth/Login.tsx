import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import APIURL from '../../helpers/environment';
import SignUp from './SignUp';

type Types = {
    username: string,
    password: string,
    loginError: string,
    show: string,
}

export default class Login extends React.Component<{},Types> {
    constructor(props: any){
        super(props)
        this.state = {
            username: '',
            password: '',
            loginError: '',
            show: '0',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    //!  LOGIN
    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(this.state)

        fetch(`${APIURL}/auth/login`,{
            method: 'POST',
            body: JSON.stringify({user: this.state}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            let token = `${json.Session_Token}`;
            let userRole = `${json.UserDetails.userRole}`;
            let firstName = `${json.UserDetails.firstName}`;
            let lastName = `${json.UserDetails.lastName}`;
            let username = `${json.UserDetails.username}`;
            let userID = `${json.UserDetails.id}`
            
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('username', username);
            localStorage.setItem('userID', userID);
            window.location.href = `http://localhost:3000/home`
        })
        .catch((error) => {
            console.log("Login Error:", error)
            this.setState({
                loginError: "Incorrect username/email or password. Please try again."
            })
        })
    }

    
    
    //!  TOGGLE SIGN UP MODAL
    handleShow = (value: string) => {
        this.setState({show: value})
    }
    handleClose = (value: string) => {
        this.setState({show: '0'})
    }

    render() {
    return (
        <div>
            <h3 style={{textAlign:"center",marginTop:"30px",color:"black"}}>Log In</h3>
            <p style={{color:"red",textAlign:"center",verticalAlign:"middle",height:"30px"}}>
                {this.state.loginError}
            </p>
            <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username / Email</Form.Label>
                    <Form.Control required type="email" placeholder="Email" name="username" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({username: e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({password: e.target.value})} />
                </Form.Group>

                <Button variant="primary" type="submit"
                style={{border:"1px #AF8165 solid",borderRadius:"50px",width:"100px",
                textAlign:"center",color:"#F8F9F8",backgroundColor:"#AF8165"}}>
                    Log In
                </Button>
            </Form>

        </div>
    )}
}