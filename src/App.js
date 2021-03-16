import './App.css';
import {connect} from 'react-redux'
import {setCurrentUser} from './store/actions/reduxActions';
import SignUp from './components/signUpComponent';
import Main from './components/MainComponent';
import PlaceOrder from './components/Anucool/placeOrder.js';
import AnucoolDashboard from './components/Anucool/dashboard';
import BrokerDashboard from './components/broker/dashboard';
import Navbar from "./components/Navbar";
import SignIn from './components/signInComponent';
import React, {useEffect} from 'react';
import {auth} from './firebase/FirebaseConfig';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";



function App(props) {

  useEffect(()=>{
    auth.onAuthStateChanged( (user)=>{
      if(user){
        console.log("user is signed in");
       props.setCurrentUser(user);
        console.log("user is set ");
      }
      else{
        console.log("user is signed out");
      }
    })
  },[]);

  
  console.log("app.js invoked props are ", props);

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
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path='/dashboard/Anucool' component={AnucoolDashboard} />
          <Route exact path ="/dashboard/Anucool/place_order" component={PlaceOrder} />
          <Route exact path='/dashboard/Broker' component={BrokerDashboard} />
        </Switch>
        <h1>{props.user.displayName.split(" ")[0]==='Employee'?<Redirect to="/dashboard/Anucool/" />:<Redirect to="/dashboard/Broker" />}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    user : state.auth.user
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    setCurrentUser :(user)=> dispatch(setCurrentUser(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
