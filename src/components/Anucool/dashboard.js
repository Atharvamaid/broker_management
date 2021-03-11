import React, { Component } from 'react';
import { connect } from 'react-redux';
import {unSetLoader} from '../../store/actions/reduxActions';
import {firestore} from '../../firebase/FirebaseConfig';
import DataTable from './dataTable';

class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            user : null,
            isLoading : false,
            userName : ""
        
        }
    }

    componentDidMount(){
        console.log("props ",this.props);
        this.props.unSetLoader();
        this.setState({
            user : this.props.user,
        });
    }

    render(){
        
        return(
            <div className="container-fluid">
                <div className="row mt-3 rounded">
                    <div className="col-md-2 bg-light" style={{minHeight:"88vh"}}>
                        <div className="content  pt-2" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <img src="/assets/account.png" style={{maxWidth:"120px",height:"auto"}}/>
                            <h5 className="mt-3">{this.props.user.displayName}</h5>
                        </div>
                    </div>
                    <div className="col-md-10 ">
                        <DataTable />
                    </div>
                </div>
            </div>
        );
        
    }
}

const mapStateToProps = (state)=>{
    return {
        user : state.auth.user
    }
}

const mapDispatchToProps = (dispatch) =>{

        return {
            unSetLoader : ()=> dispatch(unSetLoader())
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);