import React from 'react';
import {Table} from 'react-bootstrap';
import trash from './trash.png';
import edit from './edit.png';

type Points = {
    points: [],
    point: [],
    isLoaded: boolean
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
    id: string
}

export default class PointsList extends React.Component<{},Points> {
    constructor(props: Points){
        super(props)
        this.state = {
            points: [],
            point: [],
            isLoaded: true,

        }
    }

    //!  GET ALL POINTS OF CURRENT PLAYER
    fetchPoints() {
        fetch(`https://tennis-app-njr.herokuapp.com/points/allpoints`, {
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
            console.log("Points:", this.state)
        })
        .catch((error) => console.log("Points Error:", error))
    }

    componentDidMount() {
        this.fetchPoints()
    }

    // componentDidUpdate(points: any) {
    //     if (points.length !== this.state.points.length) {
    //         this.fetchPoints();
    //     } 
    // }


    render() {
    return(
        <div style={{margin:"0 30px"}}>
            <h1>Points List</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Match Title</th>
                        <th>Set, Game Score</th>
                        <th>Serve Result</th>
                        <th>Point Result</th>
                        <th>Coach's Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.points.map((point: PointDetails, index) => (
                    <tr style={{verticalAlign:"middle"}} key={1+index}>
                        <td>{1+index}</td>
                        <td>{point.matchTitle}</td>
                        <td>{point.setScore}, {point.gameScore}</td>
                        <td>{point.serveResult}</td>
                        <td>{point.pointResult}</td>
                        <td>{point.coachComment}</td>
                        <td>
                            <button style={{border:"none",backgroundColor:"transparent"}}>
                                <img src={trash} alt="delete" style={{height:"20px"}}/></button> 
                            &nbsp;&nbsp;
                            <button style={{border:"none",backgroundColor:"transparent"}}>
                                <img src={edit} alt="delete" style={{height:"25px"}}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                </Table>
        </div>
    )}
}