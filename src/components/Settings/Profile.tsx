import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DeleteCurrentUser from './DeleteCurrentUser';

type States = {
    firstName: string,
    lastName: string,
    username: string,
    userID: string,
    password: string,
    passwordConfirm: string,
    updateError: string,

    showEditBTN: boolean,
    passwordRO: boolean,

    showEditBTN2: boolean,
    firstNameRO: boolean,
    lastNameRO: boolean,
    usernameRO: boolean,

    id: string,

    fieldName: string,
}

export default class CoachProfile extends React.Component<{},States> {
    constructor(props: any){
        super(props)
        this.state = {
            firstName: `${localStorage.getItem("firstName")}`,
            lastName: `${localStorage.getItem("lastName")}`,
            username: `${localStorage.getItem("username")}`,
            userID: `${localStorage.getItem("userID")}`,
            password: '**************',
            passwordConfirm: '',
            updateError: '',
            
            showEditBTN: false,
            passwordRO: true,
            showEditBTN2: false,
            firstNameRO: true,
            lastNameRO: true,
            usernameRO: true,

            id: '',

            fieldName: 'true',
        }
    }

    //!  EDIT PASSWORD
    updateInfo( e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let userID = localStorage.getItem('userID');

        if (this.state.password === this.state.passwordConfirm) {
            console.log("Handle Submit")
            fetch(`https://tennis-app-njr.herokuapp.com/auth/${userID}`,{
                method: 'PUT',
                body: JSON.stringify({user: {
                    firstName: this.state.firstName, 
                    lastName: this.state.lastName,
                    username: this.state.username,
                    password: this.state.password,
                }}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
            .then(response => {
                response.json(); 
                console.log("Submit:",response)
            })
            .catch((error) => console.log("Update Error:", error))
            this.setState({showEditBTN: false, passwordRO: true})
        } else {
            this.setState({updateError: `The passwords do match. Please try again.`})
        }
    }
    //!  TOGGLE EDIT FIELDS & SHOW SAVE BUTTON
    allowEditPW(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({showEditBTN: true, passwordRO: false})
    }
    allowEditFN (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({firstNameRO: false, showEditBTN2: true})
    }
    allowEditLN (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({lastNameRO: false, showEditBTN2: true})
    }
    allowEditUN (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({usernameRO: false, showEditBTN2: true});
    }
    closeEdit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            showEditBTN: false, 
            passwordRO: true, 
            showEditBTN2: false, 
            firstNameRO: true,
            lastNameRO: true,
            usernameRO: true
        })
    }
    //!  UPDATE USER INFO
    updateInfo2( e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let userID = localStorage.getItem('userID');

       
            fetch(`https://tennis-app-njr.herokuapp.com/auth/${userID}`,{
                method: 'PUT',
                body: JSON.stringify({user: {
                    firstName: this.state.firstName, 
                    lastName: this.state.lastName,
                    username: this.state.username,
                    password: this.state.password,
                }}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
            .then(response => {
                response.json()
                console.log(response)
            })
            .then((json) => {
                //!  NEED TO ALSO UPDATE LOCAL STORAGE
                let firstName = this.state.firstName;
                localStorage.setItem('firstName', firstName);
            })
            .catch((error) => console.log("Update Error:", error))
            this.setState({showEditBTN2: false, firstNameRO: true})
    }

    render() {
    return(
        <div style={{padding:"10px",border:"1px solid lightgrey",borderTop:"0",backgroundColor:"white",height:"600px"}}>
            <Form style={{margin:"30px"}}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        User ID
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" placeholder="" readOnly={true}
                        defaultValue={this.state.userID} name="firstNameRO"/>
                    </Col>
                </Form.Group>

                {/* FIRST NAME */}
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> First Name</Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" placeholder="First Name" 
                        readOnly={this.state.firstNameRO} defaultValue={this.state.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({firstName: e.target.value})}/>
                    </Col>
                    <Col>
                        <button style={{margin:"7px auto",padding:"0",color:"#5799f4",border:"none",backgroundColor:"transparent"}}
                        onClick={(e)=>this.allowEditFN(e)}>
                            Edit
                        </button>
                    </Col>
                </Form.Group>

                {/* LAST NAME */}
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Last Name
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" placeholder="Last Name"
                        readOnly={this.state.lastNameRO} defaultValue={this.state.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({password: e.target.value})}/>
                    </Col>
                    <Col>
                        <button style={{margin:"7px auto",padding:"0",color:"#5799f4",border:"none",backgroundColor:"transparent"}}
                        onClick={(e)=>this.allowEditLN(e)}>
                            Edit
                        </button>
                    </Col>
                </Form.Group>

                {/* USERNAME / EMAIL */}
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="email" readOnly={this.state.usernameRO} defaultValue={this.state.username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({password: e.target.value})}/>
                    </Col>
                    <Col>
                        <button style={{margin:"7px auto",padding:"0",color:"#5799f4",border:"none",backgroundColor:"transparent"}}
                        onClick={(e)=>this.allowEditUN(e)}>
                            Edit
                        </button>
                    </Col>
                </Form.Group>

                {/* PASSWORD */}           
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="password" placeholder="Password" readOnly={this.state.passwordRO} defaultValue={this.state.password} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({password: e.target.value})}/>
                    </Col>
                    <Col>
                        <button style={{margin:"7px auto",padding:"0",color:"#5799f4",border:"none",backgroundColor:"transparent"}}
                        onClick={(e)=>this.allowEditPW(e)}>
                            Edit
                        </button>
                    </Col>
                </Form.Group>

                {/* EDIT & CANCEL BUTTONS */} 
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> 
                    </Form.Label>
                    <Col sm={5} style={{height:"100px"}}>
                        {
                        this.state.showEditBTN ? 
                            <div >
                                <Form.Control type="password" placeholder="Confirm New Password" style={{marginBottom:"1em"}}
                                value={this.state.passwordConfirm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>this.setState({passwordConfirm: e.target.value})}/>
                                <Button style={{backgroundColor:"#0283c3",border:"none",borderRadius:"50px",width:"100px"}}
                                onClick={(e)=>this.updateInfo(e)}>
                                    Save
                                </Button>
                                &nbsp;&nbsp;
                                <Button style={{backgroundColor:"grey",border:"none",borderRadius:"50px",width:"100px"}}
                                onClick={(e)=>this.closeEdit(e)}>
                                    Cancel
                                </Button> 
                                {this.state.updateError}
                            </div>
                            : null
                        }
                        {
                        this.state.showEditBTN2 ? 
                            <div style={{padding:"1em 0"}}>
                                <Button style={{backgroundColor:"#0283c3",border:"none",borderRadius:"50px",width:"100px"}}
                                onClick={(e)=>this.updateInfo2(e)}>
                                    Save
                                </Button>
                                &nbsp;&nbsp;
                                <Button style={{backgroundColor:"grey",border:"none",borderRadius:"50px",width:"100px"}}
                                onClick={(e)=>this.closeEdit(e)}>
                                    Cancel
                                </Button> 
                                {/* {this.state.updateError} */}
                            </div>
                            : null
                        }
                    </Col>
                </Form.Group>
            </Form>
            <hr style={{width:"95%",margin:"1em auto"}}/>
            <DeleteCurrentUser />
        </div>
    )}
}