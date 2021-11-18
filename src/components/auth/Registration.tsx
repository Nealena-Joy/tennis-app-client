import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
    return (
        <div>
            <h3 style={{textAlign:"center",marginTop:"30px"}}>Create Account </h3>
            <Form style={{margin:"30px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Choose your account type:</Form.Label>
                    <br/>
                    <div key="inline-radio" className="mb-3" style={{display:"inline-flex"}}>
                    <Form.Check type="radio" label="Player" name="player" id="inline-radio-1" style={{marginRight:"30px"}}/>
                    <Form.Check type="radio" label="Coach" name="coach" id="inline-radio-2" />
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
    )
}
export default Signup;