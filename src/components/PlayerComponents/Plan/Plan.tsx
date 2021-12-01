import React from 'react';
import {Card, Row, Col, Modal, Button,Form} from 'react-bootstrap';
import Edit from '../../assets/edit-blue-2.png';
import Delete from '../../assets/delete.png';
import ItemCreate from './ItemCreate';
import APIURL from '../../../helpers/environment';

type Items = {
    token: string,
    items: [],
    item: string, 
    itemsList: [],
    All_My_Items: [],
    show: string,
    title: string,
    details: string,
    isHidden: string,
}

type ItemDetails = {
    itemID: string,
    title: string,
    details: string,
    playerID: string,
    updatedAt: string,
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
            isHidden: '0'
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    

    //!  GET ALL ITEMS OF CURRENT USER
    fetchItems() {
        let token = localStorage.getItem('token')

        fetch(`${APIURL}/plan/my-items`, {
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
            })
            console.log("Items:", response.All_My_Items)
        })
        .catch((error) => console.log("Create Items Error:", error))
    }

    componentDidMount(){
        this.fetchItems()
    }

    //!  TOGGLE MODAL TO EDIT ITEM
    handleShow = (value: string) => {
        this.setState({show: value})
    }
    handleClose = (value: string) => {
        this.setState({show: '0'})
    }

    //!  UPDATE ITEM INFO
    handleSubmit( e: React.MouseEvent<HTMLButtonElement>, itemID: string) {
        e.preventDefault();
        //console.log("Update Item:", this.state)
        let token = localStorage.getItem('token');
        // let id = this.state.itemID;
        // console.log("ID", this.state.itemID)
        console.log("Handle Submit")
        fetch(`${APIURL}/plan/update/${itemID}`,{
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
        this.setState({show: "false"})
    }

    //!  TOGGLE DELETE CONFIRMATION
    showConfirmation = (value: string) => {
        this.setState({isHidden: value}) 
    }
    hideConfirmation = (value: string) => {
        this.setState({isHidden: '0'})
    }

    //!  DELETE ITEM
    handleDelete(e: React.MouseEvent<HTMLButtonElement>, itemID: string) {
        e.preventDefault();
        let token = localStorage.getItem('token');
   
        fetch(`${APIURL}/plan/delete/${itemID}`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then(response => response.json())
        .catch((error) => console.log("Item Delete Error:", error))
    }

    componentDidUpdate(prevState: any){
        if (prevState.All_My_Items !== this.state.All_My_Items){
            this.fetchItems();
        } 
    }

    render() {
    return(
        <div className="playerPlan" style={{overflowX:"hidden"}}>
            <Row style={{padding:"90px 30px"}}>
                <Col>
                    <ItemCreate />
                </Col>
                <Col sm={7} style={{overflow:"scroll",height:"550px",overflowX:"hidden",margin:"10px 30px",backgroundColor:"#0082c34d",
                padding:"1em",borderRadius:"5px"}} >
                { this.state.All_My_Items.map((item: ItemDetails, index) => (
                   
                   <Card style={{marginBottom:"20px"}} key={index}>
                        <Card.Header style={{backgroundColor:"#ceeaff",fontFamily:"marker"}}>
                            <p style={{fontSize:"20px",float:"left",height:"13px"}}><u>{item.title}</u></p>
                            <img src={Edit} alt="edit" style={{height:"22px",float:"right"}} onClick={() => this.handleShow(item.itemID)}/>  
                            &nbsp;	&nbsp;	
                            <img src={Delete} alt="edit" style={{height:"22px",float:"right",marginRight:"10px"}} onClick={() => this.showConfirmation(item.itemID)}/> 
                        </Card.Header>
                        <Card.Body>
                            <p>{item.details}</p>

                            {(this.state.isHidden === item.itemID) && 
                                <div key={item.itemID}>
                                    <hr/>
                                    <p style={{color:"#bd1900"}}>Are you sure you want to delete this item?</p>
                                    <button style={{backgroundColor:"#BD0000",borderRadius:"50px",margin:"5px",
                                        color:"whitesmoke",border:"none",height:"28px",width:"80px",padding:"0"}}
                                        onClick={(e) => this.handleDelete(e, item.itemID)}>
                                        Delete
                                    </button>
                                    <button  style={{backgroundColor:"transparent",borderRadius:"50px",margin:"5px",
                                        color:"grey",border:"1px grey solid",height:"28px",width:"80px",padding:"0",}}
                                        onClick={() => this.hideConfirmation(item.itemID)}>
                                        Cancel
                                    </button>
                                </div>
                            }
                        </Card.Body>
                        <Card.Footer style={{height:"25px",padding:"0 1em",textAlign:"right"}}>
                            <p style={{float:"inline-end"}}>Last Update: {(item.updatedAt).substring(0,10)}</p>
                        </Card.Footer>
                 
                        <Modal key={index} show={this.state.show === item.itemID} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Item</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form >
    
                                    <Form.Group>
                                        <Form.Label>Item ID</Form.Label>
                                        <Form.Control type="text" placeholder="" value={item.itemID} readOnly={true} name="itemID"/>
                                    </Form.Group>
                                    <Form.Group style={{marginTop:"1em"}}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="" defaultValue={item.title} name="title"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({title: event.target.value})}/>
                                    </Form.Group>
                                    <Form.Group style={{marginTop:"1em"}}>
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control as="textarea" placeholder="" defaultValue={item.details} name="title"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({details: event.target.value})}/>
                                    </Form.Group>
    
                                    <Button onClick={(e) => this.handleSubmit(e, item.itemID)}
                                    style={{border:"none",borderRadius:"50px",marginTop:"30px",
                                    width:"110px",textAlign:"center",color:"#F8F9F8",backgroundColor:"#008EC3"}}
                                    >Update</Button>
                                
                                    
                                </Form>
                            </Modal.Body>
                        </Modal>
                   </Card>
               ))}
                </Col>
            </Row>
        </div>
    )}
}