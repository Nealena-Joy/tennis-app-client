import React from 'react';
import { Form, Button } from 'react-bootstrap';

type UserSignUp = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    userRole: string
}

export default class SignUp extends React.Component<{}, UserSignUp> {
    constructor(props: any){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            userRole: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //console.log(this.state)

        fetch(`https://tennis-app-njr.herokuapp.com/auth/register`,{
            method: 'POST',
            body: JSON.stringify({user: this.state}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json()) 
        .then((json) => {
            let token = json.Session_Token;
            let userRole = json.UserDetails.userRole;
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
        })
        .catch(error => {console.log("Sign Up Error:", error)})
    };

    // componentDidMount() {
    //     this.handleSubmit();
    // }

    render(){
    return (
        <div>
            <h3 style={{textAlign:"center",marginTop:"30px"}}>Create Account </h3>
            <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter first name" name="firstName" value={this.state.firstName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({firstName: event.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter last name" name="lastName" value={this.state.lastName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({lastName: event.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username / Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" name="username" value={this.state.username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({username: event.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
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

                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <hr/>
            <div>
                <p style={{textAlign:"center",color:"gray"}}>Already have an account? <a href="/">Log In</a></p>
            </div>
        </div>
    )}
}