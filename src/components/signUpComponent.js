import React, {Component} from 'react';
import classnames from 'classnames';
import './css/main.css';
import {createUser, createBroker} from '../store/actions/reduxActions';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from 'reactstrap';
class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading: "",
            activeTab : "1",
            name : '',
            email : '',
            password : '',
            category : '',
            broker_name:"",
            broker_email:"",
            broker_password : ""

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleAnucoolSubmit= this.handleAnucoolSubmit.bind(this);
        this.handleBrokerSubmit = this.handleBrokerSubmit.bind(this);
    }

    
    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab:tab});
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.id] : e.target.value
        });
        
    }
    handleAnucoolSubmit = (e)=>{
        e.preventDefault();
        const user = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password
        }
        this.props.createUser(user);

        this.setState({loading:"signing you in"});   
        this.setState({
            name : "",
            email : "",
            password : ""
        });
    }
    handleBrokerSubmit = async (e)=>{
        e.preventDefault();
        this.setState({loading:"signing you in"});
        const broker = {
            name : this.state.broker_name,
            email : this.state.broker_email,
            password : this.state.broker_password
        }
        await this.props.createBroker(broker);
        this.setState({
            broker_name : "",
            broker_email : "",
            broker_password : ""
        });
        
    }

    render(){
        if(this.state.loading===""){
            return (
                <div className="container-fluid mt-4">
                <div className="row">
                    <div class="col-md-6 pl-5 pt-5">
                        <img class="signupimage" alt="img" src="/assets/signup.jpg" style={{maxWidth:"100%", position:"fixed"}}/>
                    </div>
                    <div className="col-md-6 pl-5 mt-5">
                    <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Sign-Up as Anucool Employee
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Sign-Up as Broker
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row className="p-3">
                  <form onSubmit={this.handleAnucoolSubmit} class="signup pr-5" method="POST">
                    
                    <fieldset>
                        <legend>Create Anucool Employee Account</legend>
                        <div class="form-group">
                            <label for="hosname">Person Name : </label>
                            <input onChange={this.handleChange} value={this.state.name} type="text" pattern="^[A-Za-z -]+$" title="Must be a valid Hospital name"  class="form-control" id="name" name="hosname" placeholder="Enter person name" required />
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email : </label>
                            <input onChange={this.handleChange} value={this.state.email} type="email" class="form-control" title="Must be a valid email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="email" name="email" placeholder="Enter email" required />
                        </div>
                       <div class="form-group">
                            <label for="pass">Password : </label>
                            <input onChange={this.handleChange} value={this.state.password} type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" class="form-control" id="password" name="pass" placeholder="Enter password" required />
                           <small>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</small>
                        </div>
                        <div class="form-group">
                            <label for="confpass">Confirm Password : </label>
                            <input onChange={this.handleChange} type="password" class="form-control" id="confpass" name="confpass" placeholder="Re-enter password" required />
                            <div class="registrationFormAlert" style={{color:"red"}} id="CheckPasswordMatch"></div>
                        </div>
                    </fieldset>
                    <div class="">
                        <button class="btn btn-primary" type="submit" style={{width:"100px"}}>Sign Up</button>
                    </div>
                    <small >Already had an account ? <a href="{% url 'login' %}">Login</a></small>
                </form>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row className="p-3">
                  <form onSubmit={this.handleBrokerSubmit} class="signup pr-5" method="POST">
                            
                            <fieldset>
                                <legend>Create Broker Account</legend>
                                <div class="form-group">
                                    <label for="supname">Person Name : </label>
                                    <input value={this.state.broker_name} onChange={this.handleChange} type="text" class="form-control" title="Must be a valid name" pattern="^[A-Za-z -]+$" id="broker_name" name="supname" placeholder="Enter person name" required />
                                </div>
                                
                                <div class="form-group">
                                    <label for="supemail">Email : </label>
                                    <input value={this.state.broker_email} onChange={this.handleChange} type="email" class="form-control" title="Must be a valid email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="broker_email" name="supemail" placeholder="Enter email" required />
                                </div>
                               <div class="form-group">
                                    <label for="suppass">Password : </label>
                                    <input value={this.state.broker_password} onChange={this.handleChange} type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" class="form-control" id="broker_password" name="suppass" placeholder="Enter password" required />
                                                              <small>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</small>
                                </div>
                                <div class="form-group">
                                    <label for="supconfpass">Confirm Password : </label>
                                    <input onChange={this.handleChange} type="password" class="form-control" id="pass" name="supconfpass" placeholder="Re-enter password" required />
                                </div>
                            </fieldset>
                            <div class="">
                                <button class="btn btn-primary" type="submit" style={{width : "100px"}}>Sign Up</button>
                            </div>
                            <small >Already had an account ? <a href="{% url 'login' %}">Login</a></small>
                        </form>
                  </Row>
                </TabPane>
              </TabContent>
                        
                    </div>
                </div>
                </div>
            );
        }
        else{
            return(
                <div className="container mt-5" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <CircularProgress />
                    <h4 className="mt-3">Just few moments</h4>
                </div>
            );
        }
    }
    
}
const mapStateToProps = (state) => {
    return {
        auth : state.auth.user,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createUser: (user)  =>  dispatch(createUser(user)),
      createBroker : (broker) => dispatch(createBroker(broker))
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(SignUp);