import { SUCCESSFULL_AUTHENTICATION, FAILED_AUTHENTICATION, SUCCESSFULL_ACTIVE_USER, LOGOUT_USER, CLEAN_AUTHENTICATION } from 'constants/actionTypes.jsx';
import $ from 'jquery';
import { BASE_URL } from 'constants/urlTypes';
import { setLanguage } from 'react-switch-lang';
import { getGroupList, getGroupProgram } from "actions/groupActions.jsx";
import { getStudentList, getMbsStudentList } from "actions/studentActions.jsx";
import { getAdminStudentMbsList } from "actions/dashboardActions.jsx";
import { getAmbassadorList } from "actions/ambassadorActions.jsx";
import { grantAmbassadorList } from "actions/grantActions.jsx";
import history from '../history';

export const getAuthenticacion = ( params ) => {
    var settings = {
                "url": BASE_URL + "/api/login_check",
                "method": "POST",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
                "data": {
                "_username": params.username,
                "_password": params.password
            }
    }
    
    return (dispatch, getState ) => {
        const reduxState = getState();
        dispatch ({ type: CLEAN_AUTHENTICATION });

        return $.ajax(settings)
                .done(function (data) {
                    
                    //dispatch ({ type: SUCCESSFULL_AUTHENTICATION, payload: response });
                    var settings = {
                        "url": BASE_URL + "/user/active_user",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                          "Content-Type": "application/x-www-form-urlencoded",
                          "Authorization": "Bearer " + data.token
                        },
                        "data": {
                        }
                      };
                    return $.ajax(settings)
                            .done(function (response) {
                                dispatch ({ type: SUCCESSFULL_AUTHENTICATION, payload: data });
                                dispatch ({ type: SUCCESSFULL_ACTIVE_USER, payload: JSON.parse(response) });
                                const active_user = JSON.parse(response).data;

                                if(active_user.roles.includes("ROLE_STUDENT") || active_user.roles.includes("ROLE_STUDENT_EMBASSADOR")){
                                    history.push('/dashboard/student');
                                }
                                else if(active_user.roles.includes("ROLE_LANGUAGE_ADMIN") || active_user.roles.includes("ROLE_ADMIN")){
                                    dispatch( getAdminStudentMbsList());
                                    dispatch( getAmbassadorList());
                                    dispatch( grantAmbassadorList());
                                    dispatch( getGroupList());
                                    dispatch( getStudentList());  
                                    dispatch( getGroupProgram());
                                    dispatch( getMbsStudentList());                                  
                                    history.push('/dashboard');
                                }
                                else{
                                    history.push('/dashboard');
                                }
                                
                            })
                            .fail(function (response){
                                history.push('/login');
                            });


                })
                .fail(function (response){
                    dispatch ({ type: FAILED_AUTHENTICATION });
                });
    }
    
}

export const getActiveUser = ( ) => {
    return (dispatch, getState ) => {

        const reduxState = getState();
        
        var settings = {
            "url": BASE_URL + "/user/active_user", 
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer " + reduxState.loginReducer.token
            },
            "data": {
            }
          };

        return $.ajax(settings)
                .done(function (response) {
                    dispatch ({ type: SUCCESSFULL_ACTIVE_USER, payload: JSON.parse(response) });
                    setLanguage(reduxState.loginReducer.active_user.language);

                })
                .fail(function (response){
                    history.push('/login');
                });
    }
    
}

export const logoutUser = ( ) => {
    return (dispatch ) => {        
            dispatch ({ type: LOGOUT_USER });  
            history.push('/login');
            window.location.reload(true);                        

    }
    
}

export const cleanState = () => ({ type: LOGOUT_USER })

