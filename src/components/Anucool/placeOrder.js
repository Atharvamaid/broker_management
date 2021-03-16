import React, { Component } from 'react';
import {connect} from 'react-redux'
import {submitOrderForm} from '../../store/actions/reduxActions';
import "./css/style.css";
class PlaceOrder extends Component{
  constructor(props){
    super(props);

    this.state={
      materialName : "",
      date : "",
      plates_OrderNo : "",
      plates_Length  : "",
      plates_Width : "",
      plates_Thickness : "",
      plates_Quantity : "",
      plates_Weight : "",
      plates_Priority : "",
      rawMaterial_OrderNo : "",
      rawMaterial_Size : "",
      rawMaterial_Quantity : "",
      rawMaterial_Priority : "",
      brokersForMaterials : [
        {
          id : 0, name : "Mehul", isChecked : false
        },
        {
          id : 1, name : "Tarun", isChecked : false
        },
        {
          id : 2, name : "Nirmal/Vinod", isChecked : false
        },
        {
          id : 3, name : "Sarod Pushpak", isChecked : false
        },
        {
          id : 4, name : "Smita", isChecked : false
        },
        {
          id : 5, name : "Upendra Mehta", isChecked : false
        },
        {
          id : 6, name : "Nirmal", isChecked : false
        },
      ],
      brokersForPlates : [
        {
          id : 0, name : "DARS", isChecked : false
        },
        {
          id : 1, name : "Chetan", isChecked : false
        },
        {
          id : 2, name : "Mithil", isChecked : false
        },
        {
          id : 3, name : "Hardik Shah", isChecked : false
        },
        {
          id : 4, name : "Vijay", isChecked : false
        },
      ]

    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePlatesChange = this.handlePlatesChange.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.id] : e.target.value
    });
  }
  handleMaterialChange(e){
    let materials = this.state.brokersForMaterials;
    materials.forEach(name=>{
      if(name.name===e.target.value)
        name.isChecked = e.target.checked
    })
    this.setState({brokersForMaterials : materials});
  
  }
  handlePlatesChange(e){
    let plates = this.state.brokersForPlates;
    plates.forEach(name=>{
      if(name.name===e.target.value)
        name.isChecked = e.target.checked
    })
    this.setState({brokersForPlates : plates});
  }  

  async handleSubmitForm(e){
    e.preventDefault();
    let rawMaterials = {
      brokers : [],
      materialName : this.state.materialName,
      orderNo : this.state.rawMaterial_OrderNo,
      quantity : this.state.rawMaterial_Quantity,
      size : this.state.rawMaterial_Size,
      priority : this.state.rawMaterial_Priority,
      date : this.state.date

    };
    let Plates = {
      brokers : [],
      materialName : this.state.materialName,
      orderNo : this.state.plates_OrderNo,
      length :this.state.plates_Length,
      width : this.state.plates_Width,
      thickness : this.state.plates_Thickness,
      quantity : this.state.plates_Quantity,
      weight : this.state.plates_Weight,
      priority : this.state.plates_Priority,
      date : this.state.date
    };
    this.state.brokersForMaterials.forEach((val)=>{
      if(val.isChecked===true)
        rawMaterials.brokers.push(val.name);
    });
    this.state.brokersForPlates.forEach((val)=>{
      if(val.isChecked===true)
        Plates.brokers.push(val.name);
    });
    console.log(rawMaterials,Plates);
    
    await this.props.submitOrderForm(rawMaterials,Plates);
  }
  render(){
    return (
      <div>
          <form onSubmit={this.handleSubmitForm} className="submit-form">
   
   <div class="item">
     <p>Material Name </p>
     <input type="text" id="materialName" onChange={this.handleChange} value={this.state.materialName} className="form-input" name="name"/>
   </div>
   <div class="item">
     <p>Date of Order</p>
     <input type="date" onChange={this.handleChange} value={this.state.date} id="date" className="form-input" name="bdate" required/>
     <i class="fas fa-calendar-alt"></i>
   </div>
   
   <div class="item">
     <p>Material Specifications (Plates/Sheets)</p>
     <div class="city-item">
       <input type="text" onChange={this.handleChange} id="plates_OrderNo" value={this.state.plates_OrderNo} className="form-input" name="name" placeholder="Order No." required/>
       <input type="text" onChange={this.handleChange} id="plates_Length" value={this.state.plates_Length} className="form-input" name="name" placeholder="Length" required/>
       <input type="text" onChange={this.handleChange} id="plates_Width" value={this.state.plates_Width} className="form-input" name="name" placeholder="Width" required/>
       <input type="text" onChange={this.handleChange} id="plates_Thickness" value={this.state.plates_Thickness} className="form-input" name="name" placeholder="Thickness" required/>
       <input type="text" onChange={this.handleChange} id="plates_Quantity" value={this.state.plates_Quantity} className="form-input" name="name" placeholder="Quantity" required/>
     </div>
     <input type="text" onChange={this.handleChange} id="plates_Weight" value={this.state.plates_Weight} className="form-input" name="name" placeholder="Weight" required/>
     <input type="text" onChange={this.handleChange} id="plates_Priority" value={this.state.plates_Priority} className="form-input mx-2" name="name" placeholder="Priority" required/>
   </div>

    <div class="item">
     <p>Material Specifications (Raw Material)</p>
     <div class="city-item">
       <input type="text" onChange={this.handleChange} id="rawMaterial_OrderNo" value={this.state.rawMaterial_OrderNo} className="form-input" name="name" placeholder="Order No." required/>
       <input type="text" onChange={this.handleChange} id="rawMaterial_Size" value={this.state.rawMaterial_Size} className="form-input" name="name" placeholder="Size" required/>
       <input type="text" onChange={this.handleChange} id="rawMaterial_Quantity" value={this.state.rawMaterial_Quantity} className="form-input" name="name" placeholder="Quantity (In Tons)" required/>
     </div>
     <input type="text" onChange={this.handleChange} id="rawMaterial_Priority" value={this.state.rawMaterial_Priority} className="form-input" name="name" placeholder="Priority" required/>
   </div>

   <table width="100%">
       <tr><td>
   <div class="question">
     <p>Broker to send the request for Raw Materials:</p>
     <div class="question-answer checkbox-item">
       {this.state.brokersForMaterials.map((val)=>{
         return (
          <div key={val.id}>
            <input type="checkbox" name="materials" onChange={this.handleMaterialChange} value={val.name} isChecked={val.isChecked} />
            <label  class="check"><span>{val.name}</span></label>
          </div>
         );
       })}
       
       </div>
     </div>
 </td>
 <td>
<div class="question">
     <p>Broker to send the request for sheets/plates:</p>
     <div class="question-answer checkbox-item">
       {this.state.brokersForPlates.map(val=>(
         <div key={val.id}>
            <input type="checkbox" name="plates" onChange={this.handlePlatesChange} value={val.name} isChecked={val.isChecked} />
            <label  class="check"><span>{val.name}</span></label>
         </div>
       ))}
       
       </div>
     </div>
          </td>
          </tr>
          </table>
              <br/>
              
              <div class="btn-block">
                  <button className="submit-btn" type="submit" >Send Application</button>
              </div>
          </form>
      </div>
  );
  }
    
}
const mapDispatchToProps = (dispatch) =>{
  return {
    submitOrderForm : (rawMaterials,Plates) => dispatch(submitOrderForm(rawMaterials,Plates))
  }
}
export default connect(null,mapDispatchToProps)(PlaceOrder);