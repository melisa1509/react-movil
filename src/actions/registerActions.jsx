import { NEW_STUDENT, SUCCESSFULL_EDIT, EVALUATION_PRE, ERROR_EDIT_STUDENT  } from 'constants/actionTypes';
import { BASE_URL} from 'constants/urlTypes.jsx';
import { showGroup } from "actions/groupActions.jsx";
import { ALREADY_EXIST_USER } from 'constants/actionTypes';

export const newStudent =(redirect) => {
    return (dispatch,getState) => {

        const reduxState = getState();
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
            var urlencoded = new URLSearchParams();
            urlencoded.append("username", reduxState.form.registerform.values.username);
            urlencoded.append("password", reduxState.form.registerform.values.password);
            urlencoded.append("language",reduxState.form.registerform.values.language);
            urlencoded.append("first_name",reduxState.form.registerform.values.first_name);
            urlencoded.append("last_name",reduxState.form.registerform.values.last_name);
            urlencoded.append("country",reduxState.form.registerform.values.country);
            urlencoded.append("city",reduxState.form.registerform.values.city );
            urlencoded.append("whatsapp",reduxState.form.registerform.values.whatsapp );
            urlencoded.append("group",reduxState.form.registerform.values.id_group );
      
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
                dispatch ( showGroup(reduxState.form.registerform.values.id_group));
                redirect.push("/register/evaluation");
            }
            
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_STUDENT})
        })
      }
};

export const evaluationPre = (redirect)=> {
    return (dispatch, getState) => {
    const reduxState = getState();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

   
    var urlencoded = new URLSearchParams();
        urlencoded.append("id_student", reduxState.form.preform.values.id_student);
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
            redirect.push("/login"); 
        })

    }
};