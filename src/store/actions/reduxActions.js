import {auth,firestore} from '../../firebase/FirebaseConfig';
const db = firestore;
export const setLoader=()=>({
    type: 'IS_LOADING'
})

export const unSetLoader = ()=>({
    type : 'IS_LOADED'
})

export const setDisplayName = (displayName)=>({
    type : 'DISPLAY_NAME_SET',
    payload : displayName
})

export const setCurrentUser = (user)=>({
    type:'SET_CURRENT_USER',
    payload : user
})

export const  signOut = () =>{

    return async (dispatch, getState) =>{
        //make async call to database
        
        const data = await auth.signOut();
        dispatch({type:'UNSET_USER'})
        console.log("user logged out",data);
    }
}

export const loginUser = (user) =>{

        return async (dispatch, getState)=>{
            //make async call to database
            
            await auth.signInWithEmailAndPassword(user.email,user.password).then((docref)=>{
                dispatch({type : 'DISPLAY_NAME_SET',payload : docref.user.displayName})
                console.log("doc ref " + docref);
                dispatch({type : "IS_LOADING"})
            
            }).catch((error)=>{
                console.log("error " + error);
            });
        }
};

export const createBroker = (broker) =>{
    return async (dispatch, getState)=>{
           await auth.createUserWithEmailAndPassword(broker.email, broker.password).then((docRef)=>{
                docRef.user.updateProfile({
                    displayName : "Broker"
                }).then((ref)=>{
                    console.log("displayname changed");
                    dispatch({type : 'DISPLAY_NAME_SET', payload : "Broker"});
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

export const submitOrderForm = (rawMaterials,Plates) =>{
    
    return async (dispatch,getState) => {
       await firestore.collection("Orders_PlacedBy_Anucool_Industry").add({
           rawMaterials : rawMaterials,
           Plates : Plates
       });
        rawMaterials.brokers.forEach((val)=>{
            const Brokers = firestore.collection("Brokers");
            Brokers.where("Name", '==',val).get().then((Ref)=>{
                Ref.forEach((data)=>{
                    let rawMat = rawMaterials;
                    delete rawMat.brokers;
                    Brokers.doc(data.id).update(
                        {
                            order_Received : rawMat
                        }
                    );
                    console.log("successfully added data");
                });
            });
            
        });
        
    }
}

export const createUser =  (user) =>  {
    return async (dispatch, getState, ) =>  {
            //make async call to database
            
           await auth.createUserWithEmailAndPassword(user.email,user.password).then((docref)=> {
            
            docref.user.updateProfile({
                displayName:"Employee " + user.name
            }).then((ref)=>{
                console.log("dislay name changed");
                dispatch({type : 'DISPLAY_NAME_SET', payload : "Employee "+user.name});
            }).catch((error)=>{
                console.log("error ", error);
            });


            }).catch((error)=>{
                console.log("error " + error);
            });
            
    }
};
