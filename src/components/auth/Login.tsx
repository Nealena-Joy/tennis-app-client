import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {

    

    render() {
    return (
        <div>
            <h3 style={{textAlign:"center",marginTop:"30px"}}>Log In</h3>
            <Form style={{margin:"30px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
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
export default Login;