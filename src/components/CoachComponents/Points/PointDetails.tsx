import React from 'react';

export default class PointDetails extends React.Component {
    constructor(props: any){
        super(props)
        this.state = {
            token: ''
        }
    }

    render() {
    return(
        <li style={{marginBottom:"10px",marginRight:"20px"}}>
            Test
        </li>
    )
    }
}