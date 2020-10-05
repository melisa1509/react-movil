import {  STUDENT_MBS_LIST, STUDENT_AMBASSADOR_LIST, FUTURE_AMBASSADOR_LIST, AMBASSADOR_STUDENT_LIST } from 'constants/actionTypes.jsx';
import { BASE_URL} from 'constants/urlTypes.jsx';

export const getAdminStudentMbsList =() => {
    return (dispatch,getState) => {

        const reduxState = getState();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
            var urlencoded = new URLSearchParams();
            urlencoded.append("role", reduxState.loginReducer.active_user.roles);
            urlencoded.append("language", reduxState.loginReducer.active_user.language_grader);
            urlencoded.append("state", "state.revision");
      
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            }
    
        return fetch( BASE_URL + "/student/mbs?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: STUDENT_MBS_LIST, payload: json.data });  
        })
        .catch(json =>{
        })
      }
};

export const getStudentMbsList =() => {
  return (dispatch,getState) => {

      const reduxState = getState();

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
          var urlencoded = new URLSearchParams();
          urlencoded.append("role", reduxState.loginReducer.active_user.roles[0]);
          urlencoded.append("language", reduxState.loginReducer.active_user.language_grader);
          urlencoded.append("state", "state.revision");
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          }
  
      return fetch( BASE_URL + "/student/mbs?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: STUDENT_MBS_LIST, payload: json.data });  
      })
      .catch(json =>{
      })
    }
};

export const getStudentAmbassadorList =() => {
  return (dispatch,getState) => {

      const reduxState = getState();
    
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
          var urlencoded = new URLSearchParams();
          urlencoded.append("role", reduxState.loginReducer.active_user.roles[0]);
          urlencoded.append("language", reduxState.loginReducer.active_user.language_grader);
          urlencoded.append("state", "state.revision");
          urlencoded.append("id_ambassador",  reduxState.loginReducer.active_user.id);
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          }
  
      return fetch( BASE_URL + "/student/ambassador?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: STUDENT_AMBASSADOR_LIST, payload: json.data });  
      })
      .catch(json =>{
      })
    }
};

export const getFutureAmbassadorList =() => {
  return (dispatch,getState) => {

    const reduxState = getState();
    
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
          var urlencoded = new URLSearchParams();
          urlencoded.append("language", reduxState.loginReducer.active_user.language_grader);
          urlencoded.append("role", reduxState.loginReducer.active_user.roles[0]);
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          }
      
      return fetch( BASE_URL + "/student/futureambassador?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: FUTURE_AMBASSADOR_LIST, payload: json.data });  
      })
      .catch(json =>{
      })
    }
};

export const confirmGroup = (params, redirect)=> {
  return (dispatch) => {
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


  var urlencoded = new URLSearchParams();
  var group = params.group;
  var student = params.student;
  
  urlencoded.append("group", group.toString());
  urlencoded.append("student", student.toString());
 
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
      return fetch(BASE_URL + "/student/confirmgroup?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
        dispatch(clearPending(params, redirect));
      })

  }
  
};

export const confirmGroupAmbassadorStudent = (params, redirect)=> {
  return (dispatch) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


  var urlencoded = new URLSearchParams();
  var group = params.group;
  var student = params.student;
  
  urlencoded.append("group", group.toString());
  urlencoded.append("student", student.toString());
 
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
      return fetch(BASE_URL + "/student/confirmgroup?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
        redirect.push('/ambassadorstudent');
      })

  }
  
};

export const clearPending = (params, redirect)=> {
  return (dispatch) => {
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


  var urlencoded = new URLSearchParams();
  var student = params.student;
  urlencoded.append("student", student.toString());

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
      return fetch(BASE_URL + "/student/deletefutureambassador?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
        redirect.push('/dashboard'); 
      })

  }
  
};

export const getAmbassadorStudentList =() => {
  return (dispatch,getState) => {

      const reduxState = getState();
    
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
          var urlencoded = new URLSearchParams();
          urlencoded.append("role", reduxState.loginReducer.active_user.roles[0]);
          urlencoded.append("ambassador",  reduxState.loginReducer.active_user.id);
          urlencoded.append("state", "state.correction");
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          }
  
      return fetch( BASE_URL + "/student/ambassador?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: AMBASSADOR_STUDENT_LIST, payload: json.data });  
      })
      .catch(json =>{
      })
    }
};
