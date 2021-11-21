import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class Login extends React.Component {
    constructor(props: any){
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(this.state)

        fetch(`https://tennis-app-njr.herokuapp.com/auth/login`,{
            method: 'POST',
            body: JSON.stringify({user: this.state}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            let token = json.Session_Token;
            let userRole = json.User_Role;
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            window.location.href = `http://localhost:3000/home-coach/`;
        })
        .catch((error) => console.log("Login Error:", error))
    }

    render() {
    return (
        <div>
            <h3 style={{textAlign:"center",marginTop:"30px"}}>Log In</h3>

            <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" name="username" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>

            <hr/>
            <div>
                <p style={{textAlign:"center",color:"gray"}}>Don't have an account? <a href="/">Sign Up Now</a></p>
            </div>
        </div>
    )}
}