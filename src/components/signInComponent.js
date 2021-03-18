import React, {Component,} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {loginUser} from '../store/actions/reduxActions';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {setLoader,} from '../store/actions/reduxActions';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
class SignIn extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            loading: "",
            activeTab : "1",
            email : "",
            password : "",
            broker_email : "",
            broker_password:""
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleAnucoolSubmit = this.handleAnucoolSubmit.bind(this);
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
        
    }
    handleAnucoolSubmit = (e) =>{
        e.preventDefault();
        this.setState({loading:"Just few minutes"});
        this.props.setLoader();
        const user = {
            email : this.state.email,
            password : this.state.password
        }
        
        this.props.loginUser(user);
        this.setState({
            email : "",
            password : ""
        });

    }
    handleBrokerSubmit = (e)=>{
        e.preventDefault();
        this.setState({loading:"Just few minutes"});
        const broker = {
            email : this.state.broker_email,
            password : this.state.broker_password
        }
        console.log("broker ",broker);
        this.props.loginUser(broker);
        this.setState({
            broker_email : "",
            broker_password : "",
        })

    }
    

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab : tab});
    }
    
    render(){
        if(this.state.loading===""){
            return (
                <div className="container-fluid  mt-4">
                <div className="row">
                    <div class="col-md-6  pl-5">
                        <img class="img" alt="img" src="/assets/signup.jpg" style={{maxWidth:"100%"}}/>
                    </div>
                    <div className="col-md-6 " style={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
                    <Nav style={{width:"100%"}} tabs>
                <NavItem>
                  <NavLink
                  style={{cursor:"pointer"}}
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Sign-In as Anucool Employee
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  style={{cursor:"pointer"}}
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Sign-In as Broker
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent className=" p-3" style={{width:"100%"}} activeTab={this.state.activeTab}>
                <TabPane style={{maxWidth:"100%"}} tabId="1">
                  
                  <form onSubmit={this.handleAnucoolSubmit} class="login " style={{width:"100%"}} method="POST">
                    
                    <fieldset>
                        <legend>SignIn as Anucool Employee </legend>
                        
                        <div class="form-group">
                            <label for="email">Email : </label>
                            <input value={this.state.email} onChange={this.handleChange} type="email" class="form-control" title="Must be a valid email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="email" name="email" placeholder="Enter email" required />
                        </div>
                       <div class="form-group">
                            <label for="pass">Password : </label>
                            <input value={this.state.value} onChange={this.handleChange} type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" class="form-control" id="password" name="pass" placeholder="Enter password" required />
                        </div>
                        
                    </fieldset>
                    <div class="">
                        <button class="btn btn-primary" type="submit" style={{width:"100px"}}>Login</button>
                    </div>
                    <small >Don't have an account ? <Link to="/signup">SignUp</Link></small>
                </form>
                
                </TabPane>
                <TabPane tabId="2">
                 
                  <form onSubmit={this.handleBrokerSubmit} class="login" method="POST">
                            
                            <fieldset>
                                <legend>SigIn as Broker</legend>
                                
                                <div class="form-group">
                                    <label for="supemail">Email : </label>
                                    <input value={this.state.broker_email} onChange={this.handleChange} type="email" class="form-control" title="Must be a valid email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="broker_email" name="supemail" placeholder="Enter email" required />
                                </div>
                               <div class="form-group">
                                    <label for="suppass">Password : </label>
                                    <input value={this.state.broker_password} onChange={this.handleChange} type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" class="form-control" id="broker_password" name="suppass" placeholder="Enter password" required />
                                </div>
                                
                            </fieldset>
                            <div class="">
                                <button class="btn btn-primary" type="submit" style={{width : "100px"}}>Login</button>
                            </div>
                            <small >Don't have an account ? <Link to="/signup">SignUp</Link></small>
                        </form>
                 
                </TabPane>
              </TabContent>
                        
                    </div>
                </div>
                </div>
            );
        }
        else{
            return (
                <div className="container mt-5" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <CircularProgress />
                    <h4 className="mt-3">Just few moments</h4>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.auth.user,
        loader : state.loader.isLoading
    }
};
const mapDispatchToProps = (dispatch) =>{
    return {
        loginUser : (user) => dispatch(loginUser(user)),
        setLoader : ()=>dispatch(setLoader())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);