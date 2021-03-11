import {auth,firestore} from '../../firebase/FirebaseConfig';
const db = firestore;
export const setLoader=()=>({
    type: 'IS_LOADING'
})

export const unSetLoader = ()=>({
    type : 'IS_LOADED'
})

export const setCurrentUser = (user)=>({
    type:'SET_CURRENT_USER',
    payload : user
})

export const  signOut = () =>{

    return (dispatch, getState)=>{
        //make async call to database
        
        auth.signOut().then(() => {
            
          });
    }
}

export const loginUser = (user) =>{

        return (dispatch, getState)=>{
            //make async call to database
            
            auth.signInWithEmailAndPassword(user.email,user.password).then((docref)=>{
                
                console.log("doc ref " + docref);
                dispatch({type : "IS_LOADING"})
            
            }).catch((error)=>{
                console.log("error " + error);
            });
        }
};

export const createBroker = (broker) =>{
    return (dispatch, getState)=>{
            auth.createUserWithEmailAndPassword(broker.email, broker.password).then((docRef)=>{
                docRef.user.updateProfile({
                    displayName : "Broker"
                }).then((ref)=>{
                    console.log("displayname changed");
                }).catch((error)=>{
                    console.log("error ",error);
                });

                db.collection("Brokers").doc(docRef.user.uid).set({
                    Name : broker.name
                }).then((ref)=>{
                    console.log("broker created at firestore")
                }).catch((error)=>{
                    console.log("error in broker ",error);
                })
            }).catch((error)=>{
                console.log("erorr in creating broker ",error);
            });
    }
}

export const createUser =  (user) =>  {
    return (dispatch, getState, ) =>  {
            //make async call to database
            
           auth.createUserWithEmailAndPassword(user.email,user.password).then((docref)=> {
            
            docref.user.updateProfile({
                displayName:"Employee " + user.name
            }).then((ref)=>{
                console.log("dislay name changed");
            }).catch((error)=>{
                console.log("error ", error);
            });


            }).catch((error)=>{
                console.log("error " + error);
            });
            
    }
};
