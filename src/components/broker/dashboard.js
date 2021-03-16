import React,{Component} from 'react';
import {connect} from 'react-redux';
import {firestore} from '../../firebase/FirebaseConfig';
import ReceivedOrders from './receivedOrders';
class BrokerDashboard extends Component{

    constructor(props){
        super(props);
        
        this.state={
            userName : "",
            data : null,
            orderReceived : null
        }
    }

     async componentDidMount(){
        const docRef = await firestore.collection("Brokers").doc(this.props.user.uid);
        await docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    userName : doc.data().Name,
                    orderReceived : doc.data().order_Received
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
                            <img src="/assets/account.png" alt="img" style={{maxWidth:"120px",height:"auto"}}/>
                            <h5 className="mt-3">{this.state.userName}</h5>
                        
                        </div>
                    </div>
                    <div className="col-md-10 ">
                        <ReceivedOrders orders={this.state.orderReceived} data={this.state.data}/>
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