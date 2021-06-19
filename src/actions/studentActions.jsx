import { STUDENT_LIST, SHOW_STUDENT, LOAD_FORM_STUDENT, DELETE_STUDENT, EDIT_STUDENT, ERROR_EDIT_STUDENT, SUCCESSFULL_EDIT} from 'constants/actionTypes.jsx';
import { EDIT_PASSWORD_STUDENT, SUCCESSFULL_EDIT_CLEAN, DASHBOARD_STUDENT, NEW_STUDENT } from 'constants/actionTypes';
import { GET_STUDENT_AMBASSADOR, SUCCESSFULL_NEW, EVALUATION_PRE, EVALUATION_POST, MBS_STUDENT_LIST} from 'constants/actionTypes';
import { BASE_URL} from 'constants/urlTypes.jsx';
import { SUCCESS_STORY, ALREADY_EXIST_USER } from 'constants/actionTypes';
import { VIDEO_PROMOTION } from 'constants/actionTypes';
import history from '../history';

export const getStudentList = key => {
    
    return (dispatch, getState) => {
        return fetch(BASE_URL + "/student/?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: STUDENT_LIST, payload: json.data });
        });
    }  
}

export const getMbsStudentList = key => {
    return (dispatch, getState) => {
        const reduxState = getState();
        return fetch(BASE_URL + "/student/mbs/?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: MBS_STUDENT_LIST, payload: json.data });
        });
    }  
}

export const showStudent = key => {
    return (dispatch) => {
        return fetch(BASE_URL + "/user/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_STUDENT, payload: json.data });
            dispatch ({ type: LOAD_FORM_STUDENT, data: json.data });   
            dispatch ({ type: SUCCESSFULL_EDIT_CLEAN })
        })

    }
};

export const dashboardStudent = () => {
    return (dispatch, getState) => {
        const reduxState = getState();
        const id = reduxState.loginReducer.active_user.id
        return fetch(BASE_URL + "/student/dashboard/"+ id +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: DASHBOARD_STUDENT, payload: json.data });
        })
    }
};

export const loadFormStudent = data => ({ type: LOAD_FORM_STUDENT, data });

export const deleteStudent  = (key,redirect) => {
    
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
      return fetch(BASE_URL + "/user/delete/"+ key +"?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: DELETE_STUDENT, payload: json.data });
          redirect.push('/student');
      });
  }
}
export const newStudent =() => {
    return (dispatch,getState) => {

        const reduxState = getState();
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
            var urlencoded = new URLSearchParams();
            urlencoded.append("username", reduxState.form.studentform.values.username);
            urlencoded.append("language",reduxState.form.studentform.values.language);
            urlencoded.append("first_name",reduxState.form.studentform.values.first_name);
            urlencoded.append("last_name",reduxState.form.studentform.values.last_name);
            urlencoded.append("country",reduxState.form.studentform.values.country);
            urlencoded.append("city",reduxState.form.studentform.values.city );
            urlencoded.append("whatsapp",reduxState.form.studentform.values.whatsapp );
            urlencoded.append("group",reduxState.form.studentform.values.id_group );
      
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            }
    
        return fetch(BASE_URL + "/student/new?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            if(json.code === 600){
                dispatch ({ type: NEW_STUDENT, payload: json.data });
                dispatch ({ type: ALREADY_EXIST_USER });
            }
            else{
                dispatch ({ type: NEW_STUDENT, payload: json.data });  
                dispatch ({ type: SUCCESSFULL_NEW });  
                return history.push( '/student/show/'+ json.data.id);
                
            }
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_STUDENT})
        })
      }
};

export const editStudent =() => {
    return (dispatch,getState) => {

        const reduxState = getState();
        const key = reduxState.form.studentform.values.id;
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
            var urlencoded = new URLSearchParams();
            urlencoded.append("username", reduxState.form.studentform.values.username);
            urlencoded.append("language",reduxState.form.studentform.values.language);
            urlencoded.append("firstName",reduxState.form.studentform.values.first_name);
            urlencoded.append("lastName",reduxState.form.studentform.values.last_name);
            urlencoded.append("country",reduxState.form.studentform.values.country);
            urlencoded.append("city",reduxState.form.studentform.values.city );
            urlencoded.append("whatsapp",reduxState.form.studentform.values.whatsapp );
            urlencoded.append("picture",reduxState.form.studentform.values.picture );
      
            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            }
    
        return fetch(BASE_URL + "/user/edit/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EDIT_STUDENT, payload: json.data });  
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_STUDENT})
        })
      }
};

export const editPassword = (params,key) => {
    
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
        var urlencoded = new URLSearchParams();
        urlencoded.append("password", params.userPassword);
  
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

    return (dispatch) => {
      return fetch(BASE_URL + "/user/editpassword/"+ key +"?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: EDIT_PASSWORD_STUDENT, payload: json }); 
          dispatch ({ type: SUCCESSFULL_EDIT});  
      });
  }
}
export const getStudentAmbassadorList =(key) => {
    return (dispatch,getState) => {

        var id ="";
        const reduxState = getState();
        if(reduxState.loginReducer.active_user.roles[0]=="ROLE_EMBASSADOR"){
          id=reduxState.loginReducer.active_user.id;
        }
        else if(reduxState.loginReducer.active_user.roles[0]=="ROLE_ADMIN") {
          id=key
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
            var urlencoded = new URLSearchParams();
            urlencoded.append("id_ambassador", id);
      
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            }
    
        return fetch(BASE_URL + "/student/ambassador/all", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_STUDENT_AMBASSADOR, payload: json.data });  
        })
      }
};

export const showStudentRedirect =  (redirect)  => {
    return (dispatch, getState ) => {        
        const reduxState = getState();
        const key = reduxState.studentReducer.new_student.id
        dispatch ({ type: SUCCESSFULL_NEW });  
        return redirect.push( '/student/show/'+ key);
    }
}

export const evaluationPre = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

   
    var urlencoded = new URLSearchParams();
        urlencoded.append("id_student", reduxState.loginReducer.active_user.id);
        urlencoded.append("question1", reduxState.form.preform.values.question1);
        urlencoded.append("question2", reduxState.form.preform.values.question2);
        urlencoded.append("question3", reduxState.form.preform.values.question3);
        urlencoded.append("question4", reduxState.form.preform.values.question4);
        urlencoded.append("question5", reduxState.form.preform.values.question5);
        urlencoded.append("question6", reduxState.form.preform.values.question6);
        urlencoded.append("question7", reduxState.form.preform.values.question7);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch(BASE_URL + "/evaluation/pre", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EVALUATION_PRE, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});   
        })

    }
};
export const evaluationPost = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

   
    var urlencoded = new URLSearchParams();
        urlencoded.append("id_student", reduxState.loginReducer.active_user.id);
        urlencoded.append("postquestion1", reduxState.form.postform.values.postquestion1);
        urlencoded.append("postquestion2", reduxState.form.postform.values.postquestion2);
        urlencoded.append("postquestion3", reduxState.form.postform.values.postquestion3);
        urlencoded.append("postquestion4", reduxState.form.postform.values.postquestion4);
        urlencoded.append("postquestion5", reduxState.form.postform.values.postquestion5);
        urlencoded.append("postquestion6", reduxState.form.postform.values.postquestion6);
        urlencoded.append("postquestion7", reduxState.form.postform.values.postquestion7);
        urlencoded.append("postquestion8", reduxState.form.postform.values.postquestion8);
        urlencoded.append("postquestion9", reduxState.form.postform.values.postquestion9);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch(BASE_URL + "/evaluation/post", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EVALUATION_POST, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })

    }
};

export const successStory = (key) => {
    return (dispatch,getState) => {
        const reduxState = getState();
        var id ="";
        var role = "";
        if(reduxState.loginReducer.active_user.roles[0]=="ROLE_ADMIN" && key != undefined){
          id= key;
          role= "ROLE_EMBASSADOR"
        }
        else if(reduxState.loginReducer.active_user.roles[0]=="ROLE_ADMIN") {
          id=reduxState.loginReducer.active_user.id
          role="ROLE_ADMIN"
        }
        else if(reduxState.loginReducer.active_user.roles[0]=="ROLE_EMBASSADOR") {
            id=reduxState.loginReducer.active_user.id
            role="ROLE_EMBASSADOR"
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id_ambassador",id);
        urlencoded.append("role", role);
       
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch(BASE_URL + "/student/successstorylist", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SUCCESS_STORY, payload: json.data });  
        })
    }
};

export const videoPromotion = (key) => {
    return (dispatch,getState) => {
        const reduxState = getState();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
       
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch(BASE_URL + "/student/videopromotion", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: VIDEO_PROMOTION, payload: json.data });  
        })
    }
};
