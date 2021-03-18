import './App.css';
import {connect} from 'react-redux'
import {setCurrentUser,setDisplayName} from './store/actions/reduxActions';
import SignUp from './components/signUpComponent';
import Main from './components/MainComponent';
import PlaceOrder from './components/Anucool/placeOrder.js';
import AnucoolDashboard from './components/Anucool/dashboard';
import BrokerDashboard from './components/broker/dashboard';
import ConfirmedOrders from './components/broker/confirmedOrders';
import Navbar from "./components/Navbar";
import SignIn from './components/signInComponent';
import React, {useEffect,useState} from 'react';
import {auth} from './firebase/FirebaseConfig';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";



function App(props) {

    const [currentUser,setUser] = useState(null);
  useEffect(async()=>{
    auth.onAuthStateChanged(async (user)=>{
      if(user){
        setUser(user);
        await props.setDisplayName(user.displayName);
        console.log("props dislayname",props.displayName);
       await props.setCurrentUser(user);
      
      }
      else{
      
        console.log("props displayname ",props.displayName)
      }
    });
    
  },[currentUser]);

  

  if(props.user===null){
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/signup"  ><SignUp/></Route>
          <Route path="/signin"  ><SignIn/></Route>
        </Switch>
        
      </div>
    );
  }
  else{
    return (
      <div>
        <Navbar currentUser={currentUser}/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path='/dashboard/Anucool' component={AnucoolDashboard} />
          <Route exact path ="/dashboard/Anucool/place_order" component={PlaceOrder} />
          <Route exact path='/dashboard/Broker' component={BrokerDashboard} />
          <Route exact path='/dashboard/Broker/confirmedOrders' component={ConfirmedOrders} />
        </Switch>
        
        {props.displayName && <div>
          {props.displayName.split(" ")[0]==="Employee"?<Redirect to="/dashboard/Anucool"/>:<Redirect to="/dashboard/Broker"/>}
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    user : state.auth.user,
    displayName : state.auth.displayName
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentUser :(user)=> dispatch(setCurrentUser(user)),
    setDisplayName : (displayName) => dispatch(setDisplayName(displayName))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
