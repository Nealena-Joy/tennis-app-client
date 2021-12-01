import React from 'react';
import {Offcanvas, Table, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import trash from '../../assets/delete.png';
import PointEdit from './PointEdit';
import APIURL from '../../../helpers/environment';

type Points = {
    points: [],
    point: [],
    isLoaded: boolean,
    matchId: string,
    show: string,
    isHidden: string,
}
type PointDetails = {
    coachComment: string,
    coachID: string,
    gameScore: string,
    pointResult: string,
    serveResult: string,
    setScore: string,
    createdAt: string,
    updatedAt: string,
    matchId: string,
    matchTitle: string,
    id: string,
    pointID: string,
}

export default class PointsList extends React.Component<{},Points> {
    constructor(props: Points){
        super(props)
        this.state = {
            points: [],
            point: [],
            isLoaded: true,
            matchId: '',
            show: '0',
            isHidden: '0',
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    //!  TOGGLE MODAL TO EDIT ITEM
    handleShow = (value: string) => {
        this.setState({show: value})
    }
    handleClose = (value: string) => {
        this.setState({show: '0'})
    }

    //!  GET ALL POINTS OF CURRENT PLAYER
    fetchPoints() {
        fetch(`${APIURL}/points/allpoints`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
               points: response
            })
            //console.log("Points:", this.state)
        })
        .catch((error) => console.log("Points Error:", error))
    }
    componentDidMount() {
        this.fetchPoints()
    }

    //!  TOGGLE DELETE CONFIRMATION
    showConfirmation = (value: string) => {
        this.setState({isHidden: value}) 
    }
    hideConfirmation = (value: string) => {
        this.setState({isHidden: '0'})
    }

    //!  DELETE POINT
    handleDelete(e: React.MouseEvent<HTMLButtonElement>, pointID: string) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        console.log("Handle Delete", pointID)
        fetch(`${APIURL}/points/delete/${pointID}`, { 
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
        .then(response => {response.json()})
        .catch(error => {console.log("Delete:",error)});

    }

    render() {
    return(
        <div id="points" style={{paddingTop:"5em",margin:"auto",color:"whitesmoke"}} className="pointsList">
            <h3 style={{width:"80%",margin:"auto"}}>Points List</h3>
            <div style={{backgroundColor:"lightgrey",height:"500px",width:"80%",margin:"auto",overflow:"scroll",overflowX:"hidden"}}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr style={{backgroundColor:"#e8cf59"}}>
                        <th>#</th>
                        <th>Point</th>
                        <th>Set, Game Score</th>
                        <th>Serve Result</th>
                        <th>Point Result</th>
                        <th>Coach's Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.points.map((point: PointDetails, index) => (
                    <tr style={{verticalAlign:"middle",backgroundColor:"lightgrey"}} key={1+index}>
                        <td >{1+index}</td>
                        <td >{point.pointID}</td>
                        <td >{point.setScore}, {point.gameScore}</td>
                        <td >{point.serveResult}</td>
                        <td >{point.pointResult}</td>
                        <td >{point.coachComment}</td>
                        <td >

                            <OverlayTrigger placement="top" trigger="click" key={point.pointID} rootClose={true}
                            overlay={(
                                <Popover style={{textAlign:"center",width:"200px",padding:"5px",boxShadow:"4px 4px 4px #303030e9",}}>
                                    <p>Are you sure you want to delete this point?</p>
                                    <p><i><b>{point.setScore}, {point.gameScore}</b></i></p>
                                 
                                    <Button style={{backgroundColor:"#BD0000",borderRadius:"50px",margin:"5px",
                                        color:"whitesmoke",border:"none",height:"28px",width:"80px",padding:"0"}}
                                        onClick={(e) => this.handleDelete(e, point.pointID)}>
                                            Delete
                                    </Button>
                                    <Button style={{backgroundColor:"transparent",borderRadius:"50px",margin:"5px",
                                        color:"grey",border:"1px grey solid",height:"28px",width:"80px",padding:"0",}}
                                        onClick={() => document.body.click()}>
                                            Cancel
                                    </Button>
                                </Popover>
                            )}>
                                <button style={{border:"none",backgroundColor:"transparent"}}>
                                    <img src={trash} alt="delete" style={{height:"20px"}}/>
                                </button> 
                            </OverlayTrigger>


                            &nbsp;&nbsp;
                            <button onClick={()=>this.handleShow(point.pointID)}
                                style={{borderRadius:"50px",width:"60px",color:"#F8F9F8",backgroundColor:"#008EC3",border:"none",height:"30px"}}>
                                Edit
                            </button>
                        </td>

                        <Offcanvas key={index} show={this.state.show === point.pointID} placement="end" 
                            onHide={this.handleClose}>
                            <Offcanvas.Header>
                                <Offcanvas.Title>Edit Point Details</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <PointEdit pointID={point.pointID} matchId={point.matchId} setScore={point.setScore}
                                gameScore={point.gameScore} serveResult={point.serveResult} pointResult={point.pointResult}
                                coachComment={point.coachComment}/>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </tr>
                ))}
                </tbody>
                </Table>
                </div>                
        </div>
    )}
}