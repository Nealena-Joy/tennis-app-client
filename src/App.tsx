import React from 'react';
import './App.css';
import GuestLandingPage from './components/auth/GuestLandingPage';
import CoachRouter from './components/CoachComponents/CoachRouter';
import PlayerRouter from './components/PlayerComponents/PlayerRouter';
require('dotenv').config();

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
            return(<CoachRouter token={token} userRole={userRole}/>)
          } else {
            return(<PlayerRouter />)
          }
      }
    }



    return (      
        <div className="appMain">
            {protectedViews()}
            <div style={{textAlign:"center",backgroundColor:"#",height:"500px"}}>Footer Here</div>
        </div>
    )
}
export default App;