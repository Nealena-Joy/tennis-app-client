import React from 'react';
import { Form, Button } from 'react-bootstrap';
import APIURL from '../../helpers/environment';

type UserSignUp = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    userRole: string,
    SignUpError: string,
}

export default class SignUp extends React.Component<{}, UserSignUp> {
    constructor(props: any){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            userRole: '',
            SignUpError: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //console.log(this.state)

        fetch(`${APIURL}/auth/register`,{
            method: 'POST',
            body: JSON.stringify({user: this.state}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json()) 
        .then((json) => {
            let token = json.Session_Token;
            let userRole = json.UserDetails.userRole;
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
            window.location.href = `https://tennis-app-client-njr.herokuapp.com/home`;
        })
        .catch(error => {
            console.log("Sign Up Error:", error)
            this.setState({
                SignUpError: "Username/Email already in use."
            })
        })
    };

    render(){
    return (
        <div>
            <h3 style={{textAlign:"center",marginTop:"30px"}}>Create Account </h3>
            <p style={{color:"red",textAlign:"center",verticalAlign:"middle",height:"30px"}}>
                {this.state.SignUpError}
            </p>
            <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control required type="text" placeholder="First name" name="firstName" value={this.state.firstName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({firstName: event.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control required type="text" placeholder="Last name" name="lastName" value={this.state.lastName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({lastName: event.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control required type="email" placeholder="Email" name="username" value={this.state.username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({username: event.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control required type="password" placeholder="Password" name="password" value={this.state.password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({password: event.target.value})}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Choose your account type</Form.Label>
                    <br/>
                    <div key="inline-radio" className="mb-3" style={{display:"inline-flex"}}>
                    <Form.Check type="radio" label="Player" name="userRole" id="inline-radio-1" required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({userRole: event.target.value})} 
                        style={{marginRight:"30px"}}
                        value="Player" 
                        />
                    <Form.Check type="radio" label="Coach" name="userRole" id="inline-radio-2" required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({userRole: event.target.value})}
                        value="Coach" 
                        />
                    </div>
                </Form.Group>
 
                <Button variant="primary" type="submit"
                style={{border:"1px #AF8165 solid",borderRadius:"50px",width:"100px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#AF8165"}}>
                    Sign Up
                </Button>
            </Form>

        </div>
    )}
}