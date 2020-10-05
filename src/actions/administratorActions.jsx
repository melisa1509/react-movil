import { ADMINISTRATOR_LIST, ADMINLANGUAGE_LIST } from 'constants/actionTypes';
import { BASE_URL} from 'constants/urlTypes.jsx';
import { NEW_ADMINISTRATOR, SUCCESSFULL_EDIT } from 'constants/actionTypes';
import { SHOW_ADMINISTRATOR, LOAD_FORM_ADMINISTRATOR, EDIT_ADMINISTRATOR, ERROR_EDIT_ADMINISTRATOR } from 'constants/actionTypes';
import { jsonToArray } from "assets/functions/general.jsx";
import { EDIT_PASSWORD_ADMINISTRATOR } from 'constants/actionTypes';
import { DELETE_ADMINISTRATOR , SUCCESSFUL_DELETE, SUCCESSFULL_NEW } from 'constants/actionTypes';
import { SUCCESSFULL_REDIRECT } from 'constants/actionTypes';


export const getAdministratorList = () => {
    return (dispatch) => {
        return fetch(BASE_URL + "/admin/")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: ADMINISTRATOR_LIST , payload: json.data });
        });
    }  
}

export const getAdminLanguageList = () => {
    return (dispatch) => {
        return fetch(BASE_URL + "/admin/language")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: ADMINLANGUAGE_LIST , payload: json.data });
        });
    }  
}

export const newAdministrator = (redirect)=> {
    return (dispatch, getState) => {
    const reduxState = getState();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

   
    var urlencoded = new URLSearchParams();
        urlencoded.append("username", reduxState.form.adminNewform.values.username);
        urlencoded.append("first_name", reduxState.form.adminNewform.values.first_name);
        urlencoded.append("last_name", reduxState.form.adminNewform.values.last_name);
        urlencoded.append("language", reduxState.form.adminNewform.values.language);
        urlencoded.append("country", reduxState.form.adminNewform.values.country);
        urlencoded.append("roles", reduxState.form.adminNewform.values.roles);
        urlencoded.append("language_grader", jsonToArray(reduxState.form.adminNewform.values.language_grader));
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch(BASE_URL + "/admin/new", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: NEW_ADMINISTRATOR, payload: json.data });
            dispatch ({ type: SUCCESSFULL_NEW }); 
        })

    }
};

export const showAdministrator = key => {
    return (dispatch) => {
        return fetch(BASE_URL + "/admin/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_ADMINISTRATOR, payload: json.data });
            dispatch ({ type: LOAD_FORM_ADMINISTRATOR, data: json.data });   
        })

    }
};

export const loadFormAdministrator = data => ({ type: LOAD_FORM_ADMINISTRATOR, data });

export const editAdministrator =() => {
    return (dispatch,getState) => {

        const reduxState = getState();
        const key = reduxState.form.adminform.values.id;
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
             
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", reduxState.form.adminform.values.username);
        urlencoded.append("first_name", reduxState.form.adminform.values.first_name);
        urlencoded.append("last_name", reduxState.form.adminform.values.last_name);
        urlencoded.append("language", reduxState.form.adminform.values.language);
        urlencoded.append("country", reduxState.form.adminform.values.country);
        urlencoded.append("roles", reduxState.form.adminform.values.roles);
        urlencoded.append("language_grader", jsonToArray(reduxState.form.adminform.values.language_grader));
           
      
            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            }
    
        return fetch(BASE_URL + "/admin/edit/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EDIT_ADMINISTRATOR, payload: json.data });  
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_ADMINISTRATOR})
        })
      }
};

export const editPassword = (params,key) => {
    
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
        var urlencoded = new URLSearchParams();
        urlencoded.append("password", params.ambassadorPassword);
  
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

    return (dispatch) => {
      return fetch(BASE_URL + "/admin/editpassword/"+ key +"?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: EDIT_PASSWORD_ADMINISTRATOR, payload: json }); 
          dispatch ({ type: SUCCESSFULL_EDIT});  
      });
  }
}

export const deleteAdministrator  = (key,redirect) => {

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    return (dispatch) => {
      return fetch(BASE_URL + "/admin/delete/"+ key +"?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: DELETE_ADMINISTRATOR, payload: json.data });
          dispatch ({ type: SUCCESSFUL_DELETE}); 
          redirect.push('/admin');
      });
  }
}

export const showAdminRedirect =  (redirect)  => {
    return (dispatch, getState ) => {        
        const reduxState = getState();
        const key = reduxState.administratorReducer.new_administrator.id
        dispatch ({ type: SUCCESSFULL_REDIRECT });  
        return redirect.push( '/admin/show/'+ key);
    }
}