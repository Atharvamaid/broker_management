import React from 'react';
import Dashboard from './dashboard';
import './css/confirm.css'
function ConfirmedOrders(props){

    return(
        <div className="container">
            <h2>Confirmed Orders</h2>
    <div class="order" id="a">
        <div id="table">
        <div id="Top">
          <p>Order No : ----</p>
          <p>Material : ----</p>
          <p>Date : ----</p>
        </div>
        <hr/>
          <div id="body">
             
              <p>Length :</p>
              <p>Width :</p>
              <p>Thickness :</p>
              <p>Qauntity :</p>
              <p>Weight :</p>
  
          </div>
      </div>
      <br/><hr/>
      Progress :
      <p>Progress : <span>Price :</span></p>
     
      <br/>
      </div>
        </div>
    );
}
export default ConfirmedOrders;