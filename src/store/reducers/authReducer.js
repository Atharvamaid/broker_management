
 const initState = {
    user: null,
    displayName : null
}

const authReducer = (state=initState, action)=>{
    switch (action.type) {
        
        case 'SET_CURRENT_USER':
            return {
                ...state,
                user : action.payload,
            }
            case 'DISPLAY_NAME_SET':
                return {
                    ...state,
                    displayName : action.payload
                }
        default:
            return state
    }
    
};
export default authReducer;