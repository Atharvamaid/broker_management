import React ,{ useState,useEffect } from "react";
import AnucoolDashboard from './Anucool/dashboard';
import BrokerDashboard from './broker/dashboard';
function MainDashboard(props) {

    if(props.user.displayName==="Broker"){
        return (
            <BrokerDashboard />
        );
    }
    else{
        return(
            <AnucoolDashboard />
        );
    }
    
}
export default MainDashboard;