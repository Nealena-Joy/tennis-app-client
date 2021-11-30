import React from 'react';
import {Form, Button} from 'react-bootstrap';
import APIURL from '../../../helpers/environment';

type State ={
    title: string,
    details: string,
}

export default class ItemCreate extends React.Component<{}, State> {
    constructor(props: any){
        super(props)
        this.state = {
           title: '',
           details: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //!  CREATE ITEM
    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Create Item:", this.state);
        let token = localStorage.getItem('token');

        fetch(`${APIURL}/plan/item`,{
            method: 'POST',
            body: JSON.stringify({improvementItem: {
                title: this.state.title, 
                details: this.state.details
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then(response => response.json())
        .catch((error) => console.log("Create Item Error:", error))
    }

    render() {
    return(
        <div style={{width:"80%",margin:"10px auto",color:"#F8F9F8"}}>
            <div>
                <h3>Target Areas</h3>
                <br/>
            </div>
            <div>
                <Form onSubmit={this.handleSubmit} id="form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Target Title*</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter title" name="title" required
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({title: event.target.value})}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Details</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter details" name="details" style={{height:"150px"}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({details: event.target.value})} />
                    </Form.Group>

                    <Button type="submit" style={{border:"grey 1px solid",borderRadius:"50px",marginTop:"30px",
                    width:"110px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#008EC3"}}>
                        Add
                    </Button>
                </Form>
            </div>
        </div>
    )}
}