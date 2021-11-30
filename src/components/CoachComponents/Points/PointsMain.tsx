import React from 'react';
import PointsCreate from './PointsCreate';
import PointsList from './PointsList';
import '../../assets/styles.css';

export default class Points extends React.Component {
    
    render() {
    return(
        <div className="PointsMain">
            <PointsCreate />
            <PointsList />
        </div>
    )}
}