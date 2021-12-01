import React from 'react';
import APIURL from '../../helpers/environment';
import { Table } from 'react-bootstrap';

type Props = {
    matchID?: string,
    matchTitle?: string,
    matchScore?: string,
    matchFormat?: string,
    matchWinner?: string,
    points?: any,
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

export default class MatchPoints extends React.Component<Props,{}> {

    render(){
    return(
        <div>
            <h5>{this.props.matchTitle}</h5>
            <p>
                Final Score: {this.props.matchScore}<br/>
                Winner: {this.props.matchWinner}
            </p>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Score</th>
                    <th>Serve/Return</th>
                    <th>Point Result</th>
                    <th>Comment(s)</th>
                    </tr>
                </thead>
                <tbody>
                { this.props.points.map((point: PointDetails, index: number) => ( 
                    <tr>
                        <td>{1+index}</td>
                        <td>{point.setScore}, {point.gameScore}</td>
                        <td>{point.serveResult}</td>
                        <td>{point.pointResult}</td>
                        <td>{point.coachComment}</td>
                    </tr>




                ))}
                </tbody>
            </Table>
        </div>
    )}
}