import React from 'react';
import {connect} from 'react-redux';
import './css/ordersReceived.css';

const ReceivedOrders = (props) => {

    
    return (
        <div className="container">
            <h3 className="mb-3 ">Orders Received</h3>
            
            {props.orders && <div className="order" id="a">
      <div id="table">
      <div id="Top">
        <p className="font-weight-bold">Order No : {props.orders.orderNo}</p>
        <p className="font-weight-bold">Material : {props.orders.materialName}</p>
        <p className="font-weight-bold">Date : {props.orders.date}</p>
      </div>
    <br/>
        <div id="body">
        {Object.keys(props.orders).map((val)=>{
            if (val!=='orderNo' && val!=='materialName' &&val!=='date')
                return (<p >{val}  - {props.orders[val]}</p>);
        })}
            

        </div>
    
    
    <br/>
    </div>
    <button className="button mx-3">Price</button>
    <input type="button" className="button mx-3" value="Send Price" />
    <button className="button mx-3 ">Chat</button>
    <br/>
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