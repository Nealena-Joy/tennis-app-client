import React from 'react';
import {Card, Row, Col, Modal, Button,Form} from 'react-bootstrap';
import Edit from './edit-blue-2.png';
import ItemCreate from './ItemCreate';
import ItemEdit from './ItemEdit';
import CloseBTN from './close.png';
import { title } from 'process';

type Items = {
    token: string,
    items: [],
    item: string, 
    itemsList: [],
    All_My_Items: [],
    show: string,
    title: string,
    details: string,
    itemID: string,
}

// type Props = {
//     title: string,
//     details: string
// }

type ItemDetails = {
    itemID: string,
    title: string,
    details: string,
    playerID: string
}

export default class Plan extends React.Component<{},Items> {
    constructor(props: any){
        super(props)
        this.state = {
            token: '',
            itemsList: [],
            items: [],
            All_My_Items: [],
            item: '', 
            show: '0',
            title: '',
            details: '',
            itemID: '',
            
  
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow = (value: any) => {
        this.setState({show: value})
    }
    handleClose = (value: any) => {
        this.setState({show: '0'})
    }

    //!  GET ALL ITEMS OF CURRENT USER
    fetchItems() {
        let token = localStorage.getItem('token')

        fetch(`https://tennis-app-njr.herokuapp.com/plan/my-items`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                All_My_Items: response.All_My_Items,
                //itemID: response.All_My_Items.item.itemID
            })
            console.log("Items:", response.All_My_Items[0].itemID)
        })
        .catch((error) => console.log("Create Items Error:", error))
    }

    componentDidMount(){
        this.fetchItems()
    }

    // componentDidUpdate(){
    //     this.fetchItems()
    // }

    //!  UPDATE ITEM INFO
    handleSubmit( e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //console.log("Update Item:", this.state)
        let token = localStorage.getItem('token');
        // let id = this.state.itemID;
        // console.log("ID", this.state.itemID)

        fetch(`https://tennis-app-njr.herokuapp.com/plan/update/${this.state.itemID}`,{
            method: 'PUT',
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
        .catch((error) => console.log("Item Update Error:", error))
        //this.setState({show: false})
    }


    render() {
    return(
        <div style={{margin:"30px"}}>
            <p>Improvement Plan</p>

            <ItemCreate />

            { this.state.All_My_Items.map((item: ItemDetails, index) => (
                        
                
                <div>
                <Card style={{marginBottom:"20px"}} key={index}>
                    <Row>
                        <Col>
                            <Card.Header style={{backgroundColor:"lightyellow",fontFamily:"marker"}}>
                          
                                    <img src={Edit} alt="edit" style={{height:"22px"}} onClick={() => this.handleShow(item.itemID)}/>                                
                             
                          
                                
                            </Card.Header>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Card.Body>
                                {item.title}<br/>
                                {item.details}
                            </Card.Body>
                        </Col>
                        <Col sm={4} style={{verticalAlign:"top"}}>
                            <Card.Body style={{textAlign:"right"}}>
                                <button disabled>View Comments</button>
                            </Card.Body>
                        </Col>
                    </Row>

                    <Modal key={index} show={this.state.show === item.itemID} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            Update Item
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group>
                                    <Form.Label>Item ID</Form.Label>
                                    <Form.Control type="text" placeholder="" value={item.itemID} readOnly={true} name="itemID"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="" defaultValue={item.title} name="title"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({title: event.target.value})}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Details</Form.Label>
                                    <Form.Control type="text" placeholder="" defaultValue={item.details} name="title"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({details: event.target.value})}/>
                                </Form.Group>

                                <Button type="submit">Update</Button>
                            
                                
                            </Form>
                        </Modal.Body>
                    </Modal>

                </Card>

                {console.log(this.state.itemID)}

                



                </div>
            ))}

            

            

        </div>
    )}
}