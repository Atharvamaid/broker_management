import React ,{Component}from "react";


class Counter extends Component{

    constructor(props){
        super(props);

        this.state={
        
        }
        
    }

    componentDidMount = () => {
        
    }
    
    

    render(){
        return(
            <div>
                <div class="myDiv" style={{display:"flex", zIndex:"-1", justifyContent:"flex-start",width:"100%", alignItems:"center", height:"620px", backgroundImage :"url(/assets/land.jpg)" , backgroundSize:"cover", backgroundRepeat:"no-repeat" }}>
                    <div class="text-center pl-3 ml-3" style={{width:"49%", zIndex: "2 !important"}}>
                        <h1 class="heading-title text-light" style={{fontSize:"70px",color:"black", fontFamily: 'Josefin Sans'}}>Supply Management and Monitoring System</h1>
                        <br/>

                        <p class="heading-text text-light" style={{fontSize:"30px"}}>A smarter solution to track your supplies</p>

                    </div>
                </div>
            </div>
        );
    }
}




export default (Counter);