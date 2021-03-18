import React, { useEffect, useState,Component } from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/FirebaseConfig';
import ReceivedOrders from './receivedOrders';
import { Link } from 'react-router-dom';

class BrokerDashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            userName : false,
            data : null,
            orders : null
        }
    }

    
    async componentDidMount(){
        const docRef = await firestore.collection("Brokers").doc(this.props.user.uid);
        await docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    userName : doc.data().Name,
                    orders : doc.data().order_Received
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
        return (
            <div className="container-fluid">
                <div className="row mt-3 rounded">
                    <div className="col-md-2 bg-light" style={{ minHeight: "88vh" }}>
                        <div className="content  pt-2" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img src="/assets/account.png" alt="img" style={{ maxWidth: "120px", height: "auto" }} />
                            {this.state.userName && <h5 className="mt-3">{this.state.userName}</h5>}
                            <br />
                            <Link to="/dashboard/Broker/confirmedOrders"><button className="btn btn-lg text-white confirmed-btn" style={{ backgroundColor: "#0073C5" }}>Confirmed Orders</button></Link>
                        </div>
                    </div>
                    <div className="col-md-10 ">
                        <ReceivedOrders orders={this.state.orders} />
                    </div>
                </div>
            </div>
        );
    }

    
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(BrokerDashboard);