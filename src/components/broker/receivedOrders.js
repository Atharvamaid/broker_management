import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
const ReceivedOrders = (props) => {

    
    return (
        <div>
            <h3 className="mb-3">Orders Received</h3>
            
            {props.orders && <div className="conatiner">
                <div className="card p-2">
                    <div className="row">
                        <div className="col-md-3">
                            <h5>Order-No - {props.orders.orderNo}</h5>
                        </div>
                        <div className="col-md-3">
                            <h5>Material Name - {props.orders.materialName}</h5>
                        </div>
                        <div className="col-md-3">
                        <h5>Quantity - {props.orders.quantity}</h5>
                        </div>
                        <div className="col-md-3">
                        <h5>Size - {props.orders.size}</h5>
                        </div>
                    </div>
                </div>

            </div>}
        </div>
    );
}

const mapStateToProps = (state)=>{
    return {
        user : state.auth.user
    }
}
export default connect(mapStateToProps)(ReceivedOrders);