import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class SignUp extends React.Component {
    constructor(props: any){
        super(props)
        this.state = {
            username: '',
            password: '',
            userRole: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOption = this.handleOption.bind(this);
    };

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    };

    handleOption(e: React.ChangeEvent<HTMLFormElement>) {
            this.setState({[e.target.name]: e.target.checked})
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(this.state)

        fetch(`https://tennis-app-njr.herokuapp.com/auth/register`,{
            method: 'POST',
            body: JSON.stringify({user: this.state}),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then((response) => response.json()) 
        .then((json) => {
            let token = json.Session_Token;
            let userRole = json.User_Role;
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            //window.location.href = `http://localhost:3000/home-player/`;
        })
        .catch(error => {console.log("Sign Up Error:", error)})
    };

    

    render(){
    return (
        <div>
            <h3 style={{textAlign:"center",marginTop:"30px"}}>Create Account </h3>
            <Form onSubmit={this.handleSubmit} style={{margin:"30px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" name="username" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Choose your account type</Form.Label>
                    <br/>
                    <div key="inline-radio" className="mb-3" style={{display:"inline-flex"}}>
                    <Form.Check type="radio" label="Player" name="userRole" id="inline-radio-1" 
                        onChange={this.handleChange} style={{marginRight:"30px"}}
                        value="Player" 
                        />
                    <Form.Check type="radio" label="Coach" name="userRole" id="inline-radio-2" 
                        onChange={this.handleChange}
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