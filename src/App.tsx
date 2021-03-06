import React from 'react';
import './App.css';
import GuestLandingPage from './components/auth/GuestLandingPage';
import CoachRouter from './components/CoachComponents/CoachRouter';
import PlayerRouter from './components/PlayerComponents/PlayerRouter';
import Footer from './components/auth/Footer';

const App: React.FunctionComponent = () => {
    let token = localStorage.getItem('token')
    let userRole = localStorage.getItem('userRole');

    const protectedViews = () => {
      console.log("Token:", token)

      if (token == null){
        return (<GuestLandingPage />)
      } else if (token === 'undefined') {
        return(<GuestLandingPage />)
      } else {
          if (userRole === 'Coach') {
            return(
              <CoachRouter />
            )
          } else {
            return(<PlayerRouter />)
          }
      }
    }

    return (      
        <div className="appMain">
            {protectedViews()}
            <Footer />
        </div>
    )
}
export default App;