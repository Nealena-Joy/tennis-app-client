import React from 'react';
import img from '../assets/ball_court.jpeg';

export default class Footer extends React.Component {


    render() {
    return(
        <div style={{textAlign:"center"}}>
            <p>1234 Tennis Lane, Suite 5678, Indianapolis, IN 46234</p>
            <p>317-123-4567</p>
            
            <hr style={{width:"90%",margin:"auto"}}/>
            <p>Copyright &copy; 2021 TennisLab, Inc. All Rights Reserved</p>
            

        </div>
    )}
}