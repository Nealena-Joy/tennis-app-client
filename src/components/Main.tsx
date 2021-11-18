import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Main = () => {

    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path="/cats" />
                    <Route exact path="/search"  />
                    <Route exact path="/dogs"  />
                    <Route exact path="/todo"  />
                </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Main;

/**
 *                     <Route exact path="/search" component={ Search } />

 */