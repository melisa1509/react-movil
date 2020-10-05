import { EVALUATION_PRE, SUCCESSFULL_EDIT, DELETE_ALERT, EVALUATION_POST, POST_ALERT} from 'constants/actionTypes';
import { BASE_URL} from 'constants/urlTypes.jsx';
import { PRE_ALERT } from 'constants/actionTypes';
import { SHOW_EVALUATION, REDIRECT_GROUP} from 'constants/actionTypes';
import { LOAD_FORM_EVALUATION, GET_CERTIFICATE_LIST } from 'constants/actionTypes';

export const evaluationPre = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

   
    var urlencoded = new URLSearchParams();
        urlencoded.append("id_student", reduxState.evaluationReducer.id_student);
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
        urlencoded.append("id_student", reduxState.evaluationReducer.id_student);
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

export const showEvaluationPre = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/evaluation/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_EVALUATION, payload: json.data });
            dispatch ({ type: LOAD_FORM_EVALUATION, data: json.data });
            dispatch ({ type: PRE_ALERT, payload:key });   
        })

    }
};

export const showEvaluationPost = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/evaluation/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_EVALUATION, payload: json.data });
            dispatch ({ type: LOAD_FORM_EVALUATION, data: json.data });
            dispatch ({ type: POST_ALERT, payload:key });   
        })

    }
};

export const preAlert = () => ({ type: PRE_ALERT })
export const postAlert = () => ({ type: POST_ALERT })
export const deleteAlert=() => ({ type:DELETE_ALERT})

export const groupListRedirect =  redirect  => {
    return (dispatch ) => {        
        dispatch ({ type: REDIRECT_GROUP });  
        return redirect.push('/group');            
    }
}

