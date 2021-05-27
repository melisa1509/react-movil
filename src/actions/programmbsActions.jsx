import { ADD_ROWN_P4, ERROR_SEND_REVISION_PROJECT, SUCCESSFULL_SEND_REVISION_PROJECT, SHOW_PROGRAMMBS, LOAD_FORM_PROGRAMMBS, SUCCESSFULL_EDIT_REVISION, ERROR_EDIT_REVISION, HIDE_REVISION_ALERT, SUCCESSFULL_APPROVE_PROJECT, ERROR_APPROVE_PROJECT } from 'constants/actionTypes.jsx';
import { BASE_URL } from 'constants/urlTypes';
import { jsonToArray, checkArray } from "assets/functions/general.jsx";
import { dashboardStudent } from "actions/studentActions.jsx";
import { ACTIVE_TAB } from 'constants/actionTypes';
import { RESET_SHOW_PROGRAMMBS } from 'constants/actionTypes';

export const getShowProgrammbs = key => {
    return (dispatch) => {
        return fetch(BASE_URL + "/programmbs/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_PROGRAMMBS, payload: json.data });
            dispatch ({ type: LOAD_FORM_PROGRAMMBS, data: json.data });
        });
    }
    
}

export const editRevisionProgrammbs = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programmbs.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("revisionplan", reduxState.form.programmbs.values.revisionplan !== undefined ? reduxState.form.programmbs.values.revisionplan : "");
        urlencoded.append("revisionproduct", reduxState.form.programmbs.values.revisionproduct !== undefined ? reduxState.form.programmbs.values.revisionproduct : "");
        urlencoded.append("revisionprice", reduxState.form.programmbs.values.revisionprice !== undefined ? reduxState.form.programmbs.values.revisionprice : "");
        urlencoded.append("revisionpromotion", reduxState.form.programmbs.values.revisionpromotion !== undefined ? reduxState.form.programmbs.values.revisionpromotion : "");
        urlencoded.append("revisionprocess", reduxState.form.programmbs.values.revisionprocess !== undefined ? reduxState.form.programmbs.values.revisionprocess : "");
        urlencoded.append("revisionpaperwork", reduxState.form.programmbs.values.revisionpaperwork !== undefined ? reduxState.form.programmbs.values.revisionpaperwork : "");
        urlencoded.append("revisionquality", reduxState.form.programmbs.values.revisionquality !== undefined ? reduxState.form.programmbs.values.revisionquality : "");
        urlencoded.append("revisionservice", reduxState.form.programmbs.values.revisionservice !== undefined ? reduxState.form.programmbs.values.revisionservice : "");

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programmbs/update_revision/" + key + "?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_EDIT_REVISION})
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_REVISION})
        });

    }
    
}

export const newProgrammbs = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programmbs.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("id_student", reduxState.loginReducer.active_user.id);
        getValuesForm(urlencoded,reduxState);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programmbs/new" +  "?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            if(json.code === 500){
                dispatch({type:ERROR_EDIT_REVISION})
            }
            else{
                dispatch({type:SUCCESSFULL_EDIT_REVISION})
                dispatch(dashboardStudent())
            }
            
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_REVISION})
        });

    }
    
}

export const editProgrammbs = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programmbs.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        getValuesForm(urlencoded,reduxState);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programmbs/edit/" + key + "?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            if(json.code === 500){
                dispatch({type:ERROR_EDIT_REVISION})
            }
            else{
                dispatch({type:SUCCESSFULL_EDIT_REVISION})
                dispatch(dashboardStudent())
            }
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_REVISION})
        });

    }
    
}

export const sendProject = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.programmbsReducer.programmbs.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", key);        

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        
        return fetch( BASE_URL + "/programmbs/revision?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            redirect.push('/dashboard/student');
        })
        .catch(json =>{
            dispatch({type:ERROR_SEND_REVISION_PROJECT})
        });

    }
    
}

export const saveProject = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programmbs.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("id_student", reduxState.loginReducer.active_user.id);
        getValuesForm(urlencoded,reduxState);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programmbs/new?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_SEND_REVISION_PROJECT}) 
        })
        .catch(json =>{
            dispatch({type:ERROR_SEND_REVISION_PROJECT})
        });

    }
    
}

export const approveProject = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programmbs.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", key);
        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programmbs/approved?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_APPROVE_PROJECT})
        })
        .catch(json =>{
            dispatch({type:ERROR_APPROVE_PROJECT})
        });

    }
    
}

export const sendRevisionProject = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programmbs.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", key);
        urlencoded.append("revisionplan", reduxState.form.programmbs.values.revisionplan !== undefined ? reduxState.form.programmbs.values.revisionplan : "");
        urlencoded.append("revisionproduct", reduxState.form.programmbs.values.revisionproduct !== undefined ? reduxState.form.programmbs.values.revisionproduct : "");
        urlencoded.append("revisionprice", reduxState.form.programmbs.values.revisionprice !== undefined ? reduxState.form.programmbs.values.revisionprice : "");
        urlencoded.append("revisionpromotion", reduxState.form.programmbs.values.revisionpromotion !== undefined ? reduxState.form.programmbs.values.revisionpromotion : "");
        urlencoded.append("revisionprocess", reduxState.form.programmbs.values.revisionprocess !== undefined ? reduxState.form.programmbs.values.revisionprocess : "");
        urlencoded.append("revisionpaperwork", reduxState.form.programmbs.values.revisionpaperwork !== undefined ? reduxState.form.programmbs.values.revisionpaperwork : "");
        urlencoded.append("revisionquality", reduxState.form.programmbs.values.revisionquality !== undefined ? reduxState.form.programmbs.values.revisionquality : "");
        urlencoded.append("revisionservice", reduxState.form.programmbs.values.revisionservice !== undefined ? reduxState.form.programmbs.values.revisionservice : "");

        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programmbs/sendrevision?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_SEND_REVISION_PROJECT})
        })
        .catch(json =>{
            dispatch({type:ERROR_SEND_REVISION_PROJECT})
        });

    }
    
}

export const activeTab = key => ({ type: ACTIVE_TAB, key: key });
export const loadFormProgrammbs = data => ({ type: LOAD_FORM_PROGRAMMBS, data });
export const hideRevisionAlert = () => ({ type: HIDE_REVISION_ALERT })
export const resetShowProgrammbs = () => ({ type: RESET_SHOW_PROGRAMMBS })

export const redirectDashboard = redirect => { 
    return (dispatch, getState) => {
        dispatch({ type: HIDE_REVISION_ALERT })
        return redirect.push('/dashboard');
    }
}

export const sendPostEvaluation = redirect => { 
    return (dispatch, getState) => {
        return redirect.push('/student/postevaluation');
    }
}

export const successPreEvaluation = (redirect) => {
    return (dispatch, getState) => {      
        redirect.push("/programmbs/new/plan");       
    }    
}

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
            dispatch ({ type: SUCCESSFULL_SEND_REVISION_PROJECT, payload: json.data });
        })

    }
};

const getValuesForm =  (urlencoded, reduxState) =>{
        urlencoded.append("plan1", reduxState.form.programmbs.values.plan1 !== undefined ? reduxState.form.programmbs.values.plan1 : "");
        urlencoded.append("plan2", reduxState.form.programmbs.values.plan2 !== undefined ? reduxState.form.programmbs.values.plan2 : "");
        urlencoded.append("product1", reduxState.form.programmbs.values.product1 !== undefined ? reduxState.form.programmbs.values.product1 : "");
        urlencoded.append("product2", reduxState.form.programmbs.values.product2 !== undefined ? reduxState.form.programmbs.values.product2 : "");
        urlencoded.append("product3", reduxState.form.programmbs.values.product3 !== undefined ? reduxState.form.programmbs.values.product3 : "");
        urlencoded.append("product4", reduxState.form.programmbs.values.product4 !== undefined ? reduxState.form.programmbs.values.product4 : "");
        urlencoded.append("product5", reduxState.form.programmbs.values.product5 !== undefined ? reduxState.form.programmbs.values.product5 : "");
        urlencoded.append("product6", reduxState.form.programmbs.values.product6 !== undefined ? reduxState.form.programmbs.values.product6 : "");
        urlencoded.append("product7", reduxState.form.programmbs.values.product7 !== undefined ? reduxState.form.programmbs.values.product7 : "");
        urlencoded.append("price1", reduxState.form.programmbs.values.price1 !== undefined ? reduxState.form.programmbs.values.price1 : "");
        urlencoded.append("price2", reduxState.form.programmbs.values.price2 !== undefined ? reduxState.form.programmbs.values.price2 : "");
        urlencoded.append("price3", reduxState.form.programmbs.values.price3 !== undefined ? reduxState.form.programmbs.values.price3 : "");
        urlencoded.append("price4", reduxState.form.programmbs.values.price4 !== undefined ? reduxState.form.programmbs.values.price4 : "");
        urlencoded.append("promotion1", reduxState.form.programmbs.values.promotion1 !== undefined ? reduxState.form.programmbs.values.promotion1 : "");
        urlencoded.append("promotion2", reduxState.form.programmbs.values.promotion2 !== undefined ? reduxState.form.programmbs.values.promotion2 : "");
        urlencoded.append("promotion3", reduxState.form.programmbs.values.promotion3 !== undefined ? reduxState.form.programmbs.values.promotion3 : "");
        urlencoded.append("promotion4", reduxState.form.programmbs.values.promotion4 !== undefined ? reduxState.form.programmbs.values.promotion4 : "");
        urlencoded.append("promotion5", reduxState.form.programmbs.values.promotion5 !== undefined ? reduxState.form.programmbs.values.promotion5 : "");
        urlencoded.append("promotion6", reduxState.form.programmbs.values.promotion6 !== undefined ? reduxState.form.programmbs.values.promotion6 : "");
        urlencoded.append("promotion7", reduxState.form.programmbs.values.promotion7 !== undefined ? reduxState.form.programmbs.values.promotion7 : "");
        urlencoded.append("process1", reduxState.form.programmbs.values.process1 !== undefined ? reduxState.form.programmbs.values.process1 : "");
        urlencoded.append("process2", reduxState.form.programmbs.values.process2 !== undefined ? reduxState.form.programmbs.values.process2 : "");
        urlencoded.append("process3", reduxState.form.programmbs.values.process3 !== undefined ? reduxState.form.programmbs.values.process3 : "");
        urlencoded.append("process4", reduxState.form.programmbs.values.process4 !== undefined ? reduxState.form.programmbs.values.process4 : "");
        urlencoded.append("paperwork1", reduxState.form.programmbs.values.paperwork1 !== undefined ? reduxState.form.programmbs.values.paperwork1 : "");
        urlencoded.append("paperwork2", reduxState.form.programmbs.values.paperwork2 !== undefined ? reduxState.form.programmbs.values.paperwork2 : "");
        urlencoded.append("paperwork3", jsonToArray(reduxState.form.programmbs.values.paperwork3));

        reduxState.form.programmbs.values.paperwork4.p4_array = checkArray(reduxState.form.programmbs.values.paperwork4.p4_array);
        reduxState.form.programmbs.values.paperwork5.p5_array = checkArray(reduxState.form.programmbs.values.paperwork5.p5_array);
        reduxState.form.programmbs.values.paperwork6.p6_array = checkArray(reduxState.form.programmbs.values.paperwork6.p6_array);
        reduxState.form.programmbs.values.paperwork7.p7_array = checkArray(reduxState.form.programmbs.values.paperwork7.p7_array);
        reduxState.form.programmbs.values.paperwork8.p8_array = checkArray(reduxState.form.programmbs.values.paperwork8.p8_array);
        urlencoded.append("paperwork4", reduxState.form.programmbs.values.paperwork4 !== undefined ? JSON.stringify(reduxState.form.programmbs.values.paperwork4) : "");
        urlencoded.append("paperwork5", reduxState.form.programmbs.values.paperwork5 !== undefined ? JSON.stringify(reduxState.form.programmbs.values.paperwork5) : "");
        urlencoded.append("paperwork6", reduxState.form.programmbs.values.paperwork6 !== undefined ? JSON.stringify(reduxState.form.programmbs.values.paperwork6) : "");
        urlencoded.append("paperwork7", reduxState.form.programmbs.values.paperwork7 !== undefined ? JSON.stringify(reduxState.form.programmbs.values.paperwork7) : "");
        urlencoded.append("paperwork8", reduxState.form.programmbs.values.paperwork8 !== undefined ? JSON.stringify(reduxState.form.programmbs.values.paperwork8) : "");


        urlencoded.append("quality_p1", reduxState.form.programmbs.values.quality_p1 !== undefined ? reduxState.form.programmbs.values.quality_p1 : "");
        urlencoded.append("quality_p2", reduxState.form.programmbs.values.quality_p2 !== undefined ? reduxState.form.programmbs.values.quality_p2 : "");
        urlencoded.append("quality_p3", reduxState.form.programmbs.values.quality_p3 !== undefined ? reduxState.form.programmbs.values.quality_p3 : "");
        urlencoded.append("quality_p4", reduxState.form.programmbs.values.quality_p4 !== undefined ? reduxState.form.programmbs.values.quality_p4 : "");
        urlencoded.append("quality_p5", reduxState.form.programmbs.values.quality_p5 !== undefined ? reduxState.form.programmbs.values.quality_p5 : "");
        urlencoded.append("quality_p6", reduxState.form.programmbs.values.quality_p6 !== undefined ? reduxState.form.programmbs.values.quality_p6 : "");
        urlencoded.append("quality_p7", reduxState.form.programmbs.values.quality_p7 !== undefined ? reduxState.form.programmbs.values.quality_p7 : "");
        urlencoded.append("quality_p8", reduxState.form.programmbs.values.quality_p8 !== undefined ? reduxState.form.programmbs.values.quality_p8 : "");
        urlencoded.append("quality_q1", reduxState.form.programmbs.values.quality_q1 !== undefined ? reduxState.form.programmbs.values.quality_q1 : "");
        urlencoded.append("quality_q2", reduxState.form.programmbs.values.quality_q2 !== undefined ? reduxState.form.programmbs.values.quality_q2 : "");
        urlencoded.append("quality_q3", reduxState.form.programmbs.values.quality_q3 !== undefined ? reduxState.form.programmbs.values.quality_q3 : "");
        urlencoded.append("quality_q4", reduxState.form.programmbs.values.quality_q4 !== undefined ? reduxState.form.programmbs.values.quality_q4 : "");
        urlencoded.append("quality_q5", reduxState.form.programmbs.values.quality_q5 !== undefined ? reduxState.form.programmbs.values.quality_q5 : "");
        urlencoded.append("quality_q6", reduxState.form.programmbs.values.quality_q6 !== undefined ? reduxState.form.programmbs.values.quality_q6 : "");
        urlencoded.append("quality_q7", reduxState.form.programmbs.values.quality_q7 !== undefined ? reduxState.form.programmbs.values.quality_q7 : "");
        urlencoded.append("quality_q8", reduxState.form.programmbs.values.quality_q8 !== undefined ? reduxState.form.programmbs.values.quality_q8 : "");
        urlencoded.append("quality_g1", reduxState.form.programmbs.values.quality_g1 !== undefined ? reduxState.form.programmbs.values.quality_g1 : "");
        urlencoded.append("quality_g2", reduxState.form.programmbs.values.quality_g2 !== undefined ? reduxState.form.programmbs.values.quality_g2 : "");
        urlencoded.append("quality_g3", reduxState.form.programmbs.values.quality_g3 !== undefined ? reduxState.form.programmbs.values.quality_g3 : "");
        urlencoded.append("quality_g4", reduxState.form.programmbs.values.quality_g4 !== undefined ? reduxState.form.programmbs.values.quality_g4 : "");
        urlencoded.append("quality_g5", reduxState.form.programmbs.values.quality_g5 !== undefined ? reduxState.form.programmbs.values.quality_g5 : "");
        urlencoded.append("quality_g6", reduxState.form.programmbs.values.quality_g6 !== undefined ? reduxState.form.programmbs.values.quality_g6 : "");
        urlencoded.append("quality_g7", reduxState.form.programmbs.values.quality_g7 !== undefined ? reduxState.form.programmbs.values.quality_g7 : "");
        urlencoded.append("qualityg8", reduxState.form.programmbs.values.qualityg8 !== undefined ? reduxState.form.programmbs.values.qualityg8 : "");
        urlencoded.append("service1", reduxState.form.programmbs.values.service1 !== undefined ? reduxState.form.programmbs.values.service1 : "");
        urlencoded.append("service2", reduxState.form.programmbs.values.service2 !== undefined ? reduxState.form.programmbs.values.service2 : "");
        urlencoded.append("service3", reduxState.form.programmbs.values.service3 !== undefined ? reduxState.form.programmbs.values.service3 : "");
        urlencoded.append("service4", reduxState.form.programmbs.values.service4 !== undefined ? reduxState.form.programmbs.values.service4 : "");
        urlencoded.append("service5", reduxState.form.programmbs.values.service5 !== undefined ? reduxState.form.programmbs.values.service5 : "");
        urlencoded.append("service6", reduxState.form.programmbs.values.service6 !== undefined ? reduxState.form.programmbs.values.service6 : "");
        urlencoded.append("history1", reduxState.form.programmbs.values.history1 !== undefined ? reduxState.form.programmbs.values.history1 : "");
        urlencoded.append("history2", reduxState.form.programmbs.values.history2 !== undefined ? reduxState.form.programmbs.values.history2 : "");

        urlencoded.append("productName", reduxState.form.programmbs.values.product_name !== undefined ? reduxState.form.programmbs.values.product_name : "");
        urlencoded.append("productDescription", reduxState.form.programmbs.values.product_description !== undefined ? reduxState.form.programmbs.values.product_description : "");
        urlencoded.append("productWeb", reduxState.form.programmbs.values.product_web !== undefined ? reduxState.form.programmbs.values.product_web : "");
        urlencoded.append("productPhone", reduxState.form.programmbs.values.product_phone !== undefined ? reduxState.form.programmbs.values.product_phone : "");
}