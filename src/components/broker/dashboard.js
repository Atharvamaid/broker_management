import React,{Component} from 'react';
import {connect} from 'react-redux';
import {firestore} from '../../firebase/FirebaseConfig';

class BrokerDashboard extends Component{

    constructor(props){
        super(props);
        
        this.state={
            userName : ""
        }
    }

     componentDidMount(){
        const docRef =  firestore.collection("Brokers").doc(this.props.user.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.setState({
                    userName : doc.data().Name
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        

    }
    
    render(){
        return(
            <div className="container-fluid">
                <div className="row mt-3 rounded">
                    <div className="col-md-2 bg-light" style={{minHeight:"88vh"}}>
                        <div className="content  pt-2" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <img src="/assets/account.png" style={{maxWidth:"120px",height:"auto"}}/>
                            <h5 className="mt-3">{this.state.userName}</h5>
                        
                        </div>
                    </div>
                    <div className="col-md-10 ">
                        <h1>Views</h1>
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

export default connect(mapStateToProps)(BrokerDashboard);