import {  SUCCESSFULL_EDIT, ERROR_REQUIRED_FIELDS,SUCCESS_REQUIRED_FIELDS, SUCCESSFUL_DELETE} from 'constants/actionTypes.jsx';
import { DISMATCH_PASSWORD, SUCCESSFULL_NEW,DELETE_SUCCESSFUL, UPDATE_FILE_NAME } from 'constants/actionTypes';
import { SUCCESSFULL_ACTIVE_USER } from 'constants/actionTypes';
import { CHANGE_ACTIVE_TAB } from 'constants/actionTypes';
import { IDLE_TIMER } from 'constants/actionTypes';
import { ERROR_SUBMIT } from 'constants/actionTypes';
import { SUCCESS_SUBMIT } from 'constants/actionTypes';
import { ERROR_EVALUATION } from 'constants/actionTypes';

export const successfulEdit =() => ({ type: SUCCESSFULL_EDIT})
export const successfulNew =(redirect) => {
    return(dispatch, getState)=> { 
        const reduxState = getState();
        dispatch({ type: SUCCESSFULL_NEW})
        if(reduxState.groupReducer.new_group.id !== undefined){
            const key = reduxState.groupReducer.new_group.id
            redirect.push( "/group/show/"+ key);
        }
    } 
}
export const deleteSuccessful=(redirect) => {
    return(dispatch, getState)=> { 
        const reduxState = getState();
        dispatch({ type: DELETE_SUCCESSFUL})
        if(reduxState.loginReducer.active_user.roles[0] == "ROLE_STUDENT"){
            redirect.push( "/dashboard/student");
        }
    }
}
export const deleteSuccessfulRedirect=(redirect) => {
    return(dispatch)=> { 
        dispatch({ type: DELETE_SUCCESSFUL})
        redirect.push( "/login");
    }
}
export const successfulDelete =() => ({ type: SUCCESSFUL_DELETE})
export const errorRequiredFields =() => ({ type: ERROR_REQUIRED_FIELDS})
export const successRequiredFields =() => ({ type: SUCCESS_REQUIRED_FIELDS})
export const dismatchPassword =() => ({ type: DISMATCH_PASSWORD})
export const idleTimerAlert =() => ({ type: IDLE_TIMER})
export const updateFileName = (key) => ({ type: UPDATE_FILE_NAME, payload: key})
export const changeActiveTab = (key) => ({ type: CHANGE_ACTIVE_TAB, payload: key})
export const errorSubmit = () => ({ type: ERROR_SUBMIT})
export const successSubmit = () => ({ type: SUCCESS_SUBMIT})
export const errorEvaluation = () => ({ type: ERROR_EVALUATION})



