import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {firestore} from '../../firebase/FirebaseConfig';
import ReceivedOrders from './receivedOrders';

function BrokerDashboard(props){

    const [userName, setUserName] = useState("");
    const [data, setData] = useState(null);
    const [orderReceived, setOrders] = useState(null);

    useEffect(async()=>{
        const docRef = await firestore.collection("Brokers").doc(props.user.uid);
        await docRef.get().then((doc) => {
            if (doc.exists) {
                setUserName(doc.data().Name);
                setOrders(doc.data().order_Received);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },[0]);


    return (
        <div className="container-fluid">
                <div className="row mt-3 rounded">
                    <div className="col-md-2 bg-light" style={{minHeight:"88vh"}}>
                        <div className="content  pt-2" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <img src="/assets/account.png" alt="img" style={{maxWidth:"120px",height:"auto"}}/>
                            {userName==="" && <p>.....</p>}
                            {userName && <h5 className="mt-3">{userName}</h5>}
                        
                        </div>
                    </div>
                    <div className="col-md-10 ">
                        <ReceivedOrders orders={orderReceived} />
                    </div>
                </div>
            </div>
    );
}

const mapStateToProps = (state)=>{
    return {
        user : state.auth.user
    }
}

export default connect(mapStateToProps)(BrokerDashboard);