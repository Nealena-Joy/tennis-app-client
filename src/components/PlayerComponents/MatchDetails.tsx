import React from 'react';
import APIURL from '../../helpers/environment';

type Props = {
    matchID?: string,
    matchTitle?: string,
    matchScore?: string,
    matchFormat?: string,
    matchWinner?: string,
}
type States = {
    matchID: string,
}

export default class MatchPoints extends React.Component<Props,{}> {
    
    //!  GET ALL POINT DETAILS OF CURRENT MATCH
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

    render(){
    return(
        <div>
            <h1>Match Details</h1>
            {this.props.matchID}<br/>
            {this.props.matchScore}
            {this.props.matchFormat}
            {this.props.matchWinner}
        </div>
    )}
}