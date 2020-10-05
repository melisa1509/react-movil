import { CODE_LIST, SHOW_CODE , LOAD_FORM_CODE, EDIT_CODE, ERROR_EDIT_CODE, SUCCESSFULL_EDIT, DELETE_CODE, SUCCESSFUL_DELETE} from 'constants/actionTypes.jsx';
import {BASE_URL} from 'constants/urlTypes.jsx'

export const getCodeList = () => {
    return (dispatch) => {
        return fetch(BASE_URL + "/code/")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: CODE_LIST, payload: json.data });
        });
    }  
}
export const showCode = key => {
    return (dispatch) => {
        return fetch(BASE_URL + "/code/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_CODE, payload: json.data });
            dispatch ({ type: LOAD_FORM_CODE, data: json.data });   
        })

    }
};

export const loadFormCode = data => ({ type: LOAD_FORM_CODE, data });

export const editCode =() => {
    return (dispatch,getState) => {

        const reduxState = getState();
        const key = reduxState.form.codeform.values.id;
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("number", reduxState.form.codeform.values.number);
      
            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            }
    
        return fetch(BASE_URL + "/code/edit/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EDIT_CODE, payload: json.data });  
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_CODE})
        })
      }
};
export const deleteCode  = (key, redirect) => {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var urlencoded = new URLSearchParams();
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    return (dispatch) => {
      return fetch(BASE_URL + "/code/delete/"+ key +"?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: DELETE_CODE, payload: json.data });
          dispatch ({ type: SUCCESSFUL_DELETE}); 
          redirect.push('/code');
      });
  }
}
