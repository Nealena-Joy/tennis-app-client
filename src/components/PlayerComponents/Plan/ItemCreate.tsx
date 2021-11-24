import React from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import CloseBTN from './close.png';

type State ={
    title: string,
    details: string,
    show: boolean
}

export default class ItemCreate extends React.Component<{}, State> {
    constructor(props: any){
        super(props)
        this.state = {
           title: '',
           details: '',
           show: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleShow() {
        this.setState({show: true})
    }
    handleClose() {
        this.setState({show: false})
    }

    //!  CREATE ITEM
    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Create Item:", this.state)
        let token = localStorage.getItem('token')


        fetch(`https://tennis-app-njr.herokuapp.com/plan/item`,{
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
        .catch((error) => console.log("Item Create Error:", error))
        this.setState({show: false})
    }

    render() {
    return(
        <div>
            <Button style={{margin:"20px 0",backgroundColor:"#0083c3",border:"none"}}
                onClick={this.handleShow}>
                [+] Item
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Item</Modal.Title>
                    <Button onClick={this.handleClose} style={{backgroundColor:"transparent",border:"none"}}>
                        <img src={CloseBTN} alt="close" style={{height:"20px"}}/>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Item Title*</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" required
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({title: event.target.value})}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Details</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter details" name="details" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({details: event.target.value})} />
                        </Form.Group>

                        <Button type="submit" onClick={this.handleClose} style={{backgroundColor:"#0083c3",width:"90px",border:"none"}} >
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            
        </div>
    )
    }

}