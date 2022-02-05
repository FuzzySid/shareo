import { authActions } from "../actions/authActions"

const authReducer=(state,action)=>{
    console.log(action)
    switch(action.type){
        case authActions.SET_USER: 
            localStorage.setItem('user',JSON.stringify(action.user))
            return{
                ...state,
                user:action.user
            }
        case authActions.LOG_OUT:
            localStorage.clear();
            return{
                ...state,
                user:null
            }
        default: return state
    }
}

export default authReducer;