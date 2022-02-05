import React, {createContext,useContext,useReducer} from 'react';
import authReducer from '../reducer/authReducer';
import { initialState } from '../state/authState';

export const AuthContext=createContext();

export const StateProvider=({authReducer,initialState,children})=>(
         <AuthContext.Provider value={useReducer(authReducer,initialState)}>
                {children}
            </AuthContext.Provider>
)

export const useStateValue=()=>useContext(AuthContext);
