const initState = {
    isLoading : false
}

const loaderReducer = (state=initState, action)=>{
    switch (action.type) {
        case 'IS_LOADING':
            console.log("loading set to true")
            return {
                ...state,
                isLoading : true
            }
        case 'IS_LOADED':
            console.log("loader is false now")
            return {
                ...state,
                isLoading : false
            }
        default:
            return state
        
    }
}
export default loaderReducer;