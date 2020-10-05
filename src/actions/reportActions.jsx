import { GET_REPORTS, GET_REPORT_COUNTRY, GET_AMBASSADOR_COUNTRY, GET_REPORT_AMBASSADOR, GET_REPORT_GLOBAL_MAP } from 'constants/actionTypes.jsx';
import { BASE_URL } from 'constants/urlTypes.jsx';
import { AMBASSADOR_REPORT, GET_GLOBAL_NUMBERS} from 'constants/actionTypes';

export const getReports = () => {
    return (dispatch,getState) => {
        const reduxState = getState();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("role",reduxState.loginReducer.active_user.roles[0]);
            urlencoded.append("id", reduxState.loginReducer.active_user.id);

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

        return fetch(BASE_URL + "/report/", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_REPORTS , payload: json.data});
        });
    }  
}

export const getReportCountry= (key) => {
    return (dispatch) => {
        return fetch( BASE_URL + "/report/evaluations/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_REPORT_COUNTRY, payload: json.data });
        });
    }
}

export const getAmbassadorCountry= (key) => {
    return (dispatch) => {
        return fetch( BASE_URL + "/ambassador/country/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_AMBASSADOR_COUNTRY, payload: json.data });
        });
    }
}

export const getReportAmbassador= (key) => {
    return (dispatch, getState) => {
        const reduxState = getState();
        if(reduxState.loginReducer.active_user.roles[0] == "ROLE_EMBASSADOR"){
         key=reduxState.loginReducer.active_user.id
        }
        return fetch( BASE_URL + "/report/ambassador/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_REPORT_AMBASSADOR, payload: json.data });
        });
    }
}

export const getReportGlobalMap = () => {
    return (dispatch) => {
        
        return fetch(BASE_URL + "/report/globalmap")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_REPORT_GLOBAL_MAP , payload: json.data});
        });
    }  
}

export const globalNumbers =() => {
    return (dispatch,getState) => {

        const reduxState = getState();
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", reduxState.loginReducer.active_user.id);
        urlencoded.append("role", reduxState.loginReducer.active_user.roles[0]);
      
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            }
    
        return fetch(BASE_URL + "/report/globalnumbers", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_GLOBAL_NUMBERS, payload: json.data });  
        })
      }
};