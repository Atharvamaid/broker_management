import React from 'react';
import './css/main.css';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { signOut } from '../store/actions/reduxActions';
import { withRouter } from "react-router-dom";
function SignedInLinks(props) {
    if(props.user.displayName==="Broker"){
        return(
            <div className="container-fluid">
                <ul class="navbar-nav ml-3">
                <a class="nav-item nav-link mx-3" href="/dashboard" >Dashboard</a>
        </ul>
        <ul className="navbar-nav ml-auto">
            <a className="nav-item nav-link mx-3" href="/track-order">Broker</a>
                <a onClick={props.signout}  class=" nav-item nav-link mx-3" style={{color:"#1565c0", fontSize:"17px", cursor:"pointer"}} >Logout </a>
        </ul>
            </div>
        );
        
    }
    else{
        return(
            <div className="container-fluid">
                <ul class="navbar-nav ml-3">
                <a class="nav-item nav-link mx-3" href="/dashboard" >Dashboard</a>
                <NavLink to="/order"></NavLink>
        </ul>
        <ul className="navbar-nav ml-auto">
            <a className="nav-item nav-link mx-3" href="/track-order">Track Order</a>
                <a onClick={props.signout}  class=" nav-item nav-link mx-3" style={{color:"#1565c0", fontSize:"17px", cursor:"pointer"}} >Logout </a>
        </ul>
            </div>
        );
    }
}

function SignedOutLinks(props) {
    return (
        <ul class="navbar-nav ml-auto">
        <NavLink to="/signup"><a class="btn signbtn text-white mx-4" href="/signup"   style={{backgroundColor:"#1979e6", borderRadius: "50px"}}>Create Account</a></NavLink>
        <NavLink to="/signin"><a class=" nav-item nav-link mx-3" href="/signin" style={{color:"#1565c0", fontSize:"17px"}} >Login</a></NavLink>
    </ul>
    );
}

function Navbar(props) {
    
    

    const signout = ()=>{
        console.log("user logged out");
        props.signOut();
        props.history.push('/');
        window.location.reload(); 
        
    }
    

    return (
        
        
<nav class="navbar navbar-expand-lg sticky-top navbar-light" style={{backgroundColor:"#f2f2f2", height:"70px"}}>

<a class="navbar-brand mr-3 " href="/" ><img alt="img" style={{maxWidth:"140px"}} src="/assets/logo.png" /></a>
<button class="navbar-toggler" data-toggle="collapse" data-target="#navres">
<span class="navbar-toggler-icon"></span>
</button>
<div class="navbar-collapse collapse " id="navres">
        
        {props.user?<SignedInLinks user={props.user} signout={signout}/>:<SignedOutLinks/>}

    </div>
    </nav>
        
    );
}

const mapStateToProps = (state)=>{
    return {
        user : state.auth.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signOut : () => dispatch(signOut())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));