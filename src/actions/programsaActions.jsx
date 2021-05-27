import { ERROR_SEND_REVISION_PROJECT, SUCCESSFULL_SEND_REVISION_PROJECT, SHOW_PROGRAMSA, LOAD_FORM_PROGRAMSA, SUCCESSFULL_EDIT_REVISION, ERROR_EDIT_REVISION, HIDE_REVISION_ALERT, SUCCESSFULL_APPROVE_PROJECT, ERROR_APPROVE_PROJECT } from 'constants/actionTypes.jsx';
import { BASE_URL } from 'constants/urlTypes';
import { jsonToArray } from "assets/functions/general.jsx";

export const getShowProgramsa = key => {
    return (dispatch) => {
        return fetch(BASE_URL + "/programsa/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_PROGRAMSA, payload: json.data });
            dispatch ({ type: LOAD_FORM_PROGRAMSA, data: json.data });
        });
    }
    
}

export const newProgramsa = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programsa.values.id;

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

        return fetch( BASE_URL + "/programsa/new" +  "?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_EDIT_REVISION})
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_REVISION})
        });

    }
    
}

export const editRevisionProgramsa = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programsa.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", key);
        urlencoded.append("revisionmision", reduxState.form.programsa.values.revisionmision !== undefined ? reduxState.form.programsa.values.revisionmision : "");
        urlencoded.append("revisiongenerategroups", reduxState.form.programsa.values.revisiongenerategroups !== undefined ? reduxState.form.programsa.values.revisiongenerategroups : "");
        urlencoded.append("revisionrule", reduxState.form.programsa.values.revisionrule !== undefined ? reduxState.form.programsa.values.revisionrule : "");
        urlencoded.append("revisiongraduate", reduxState.form.programsa.values.revisiongraduate !== undefined ? reduxState.form.programsa.values.revisiongraduate : "");
        urlencoded.append("revisionsupport", reduxState.form.programsa.values.revisionsupport !== undefined ? reduxState.form.programsa.values.revisionsupport : "");

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programsa/update_revision/" + key + "?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_EDIT_REVISION})
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_REVISION})
        });

    }
    
}

export const approveProject = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programsa.values.id;

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

        return fetch( BASE_URL + "/programsa/approved?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_APPROVE_PROJECT})
        })
        .catch(json =>{
            dispatch({type:ERROR_APPROVE_PROJECT})
        });

    }
    
}

export const editProgramsa = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programsa.values.id;

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

        return fetch( BASE_URL + "/programsa/edit/" + key + "?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_EDIT_REVISION})
        })
        .catch(json =>{
            dispatch({type:ERROR_EDIT_REVISION})
        });

    }
    
}

export const sendProject = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programsa.values.id;

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

        
        return fetch( BASE_URL + "/programsa/revision?callback=foo", requestOptions)
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
        const key = reduxState.form.programsa.values.id;

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

        return fetch( BASE_URL + "/programsa/new?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_SEND_REVISION_PROJECT})
        })
        .catch(json =>{
            dispatch({type:ERROR_SEND_REVISION_PROJECT})
        });

    }
    
}

export const sendRevisionProject = (redirect) => {
    return (dispatch, getState) => {

        const reduxState = getState();
        const key = reduxState.form.programsa.values.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", key);
        urlencoded.append("revisionmision", reduxState.form.programsa.values.revisionmision !== undefined ? reduxState.form.programsa.values.revisionmision : "");
        urlencoded.append("revisiongenerategroups", reduxState.form.programsa.values.revisiongenerategroups !== undefined ? reduxState.form.programsa.values.revisiongenerategroups : "");
        urlencoded.append("revisionrule", reduxState.form.programsa.values.revisionrule !== undefined ? reduxState.form.programsa.values.revisionrule : "");
        urlencoded.append("revisiongraduate", reduxState.form.programsa.values.revisiongraduate !== undefined ? reduxState.form.programsa.values.revisiongraduate : "");
        urlencoded.append("revisionsupport", reduxState.form.programsa.values.revisionsupport !== undefined ? reduxState.form.programsa.values.revisionsupport : "");

        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch( BASE_URL + "/programsa/sendrevision?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SUCCESSFULL_SEND_REVISION_PROJECT})
        })
        .catch(json =>{
            dispatch({type:ERROR_SEND_REVISION_PROJECT})
        });

    }
    
}

export const loadFormProgramsa = data => ({ type: LOAD_FORM_PROGRAMSA, data });

export const hideRevisionAlert = () => ({ type: HIDE_REVISION_ALERT })

export const redirectDashboard = redirect => { 
    return (dispatch, getState) => {
        dispatch({ type: HIDE_REVISION_ALERT })
        return redirect.push('/dashboard');
    }
}

const getValuesForm =  (urlencoded, reduxState) =>{
    urlencoded.append("mision1", reduxState.form.programsa.values.mision1 !== undefined ? reduxState.form.programsa.values.mision1 : "");
    urlencoded.append("mision2", reduxState.form.programsa.values.mision2 !== undefined ? reduxState.form.programsa.values.mision2 : "");
    urlencoded.append("mision3", reduxState.form.programsa.values.mision3 !== undefined ? reduxState.form.programsa.values.mision3 : "");
    urlencoded.append("mision4", reduxState.form.programsa.values.mision4 !== undefined ? reduxState.form.programsa.values.mision4 : "");    
    urlencoded.append("generateGroups1", reduxState.form.programsa.values.generate_groups1 !== undefined ? reduxState.form.programsa.values.generate_groups1 : "");
    urlencoded.append("generateGroups2", reduxState.form.programsa.values.generate_groups2 !== undefined ? reduxState.form.programsa.values.generate_groups2 : "");
    urlencoded.append("generateGroups3", reduxState.form.programsa.values.generate_groups3 !== undefined ? reduxState.form.programsa.values.generate_groups3 : "");
    urlencoded.append("generateGroups4", reduxState.form.programsa.values.generate_groups4 !== undefined ? reduxState.form.programsa.values.generate_groups4 : "");
    urlencoded.append("generateGroups5", reduxState.form.programsa.values.generate_groups5 !== undefined ? reduxState.form.programsa.values.generate_groups5 : "");
    urlencoded.append("generateGroups6", reduxState.form.programsa.values.generate_groups6 !== undefined ? reduxState.form.programsa.values.generate_groups6 : "");
    urlencoded.append("generateGroups7", reduxState.form.programsa.values.generate_groups7 !== undefined ? reduxState.form.programsa.values.generate_groups7 : "");
    urlencoded.append("rule1", reduxState.form.programsa.values.rule1 !== undefined ? reduxState.form.programsa.values.rule1 : "");
    urlencoded.append("rule2", reduxState.form.programsa.values.rule2 !== undefined ? reduxState.form.programsa.values.rule2 : "");
    urlencoded.append("rule3", reduxState.form.programsa.values.rule3 !== undefined ? reduxState.form.programsa.values.rule3 : "");
    urlencoded.append("rule4", reduxState.form.programsa.values.rule4 !== undefined ? reduxState.form.programsa.values.rule4 : "");
    urlencoded.append("rule5", reduxState.form.programsa.values.rule5 !== undefined ? reduxState.form.programsa.values.rule5 : "");
    urlencoded.append("rule6", reduxState.form.programsa.values.rule6 !== undefined ? reduxState.form.programsa.values.rule6 : "");
    urlencoded.append("rule7", reduxState.form.programsa.values.rule7 !== undefined ? reduxState.form.programsa.values.rule7 : "");
    urlencoded.append("rule8", reduxState.form.programsa.values.rule8 !== undefined ? reduxState.form.programsa.values.rule8 : "");
    urlencoded.append("rule9", reduxState.form.programsa.values.rule9 !== undefined ? reduxState.form.programsa.values.rule9 : "");
    urlencoded.append("rule10", reduxState.form.programsa.values.rule10 !== undefined ? reduxState.form.programsa.values.rule10 : "");    
    urlencoded.append("graduate1", reduxState.form.programsa.values.graduate1 !== undefined ? reduxState.form.programsa.values.graduate1 : "");
    urlencoded.append("graduate2", reduxState.form.programsa.values.graduate2 !== undefined ? reduxState.form.programsa.values.graduate2 : "");
    urlencoded.append("graduate3", reduxState.form.programsa.values.graduate3 !== undefined ? reduxState.form.programsa.values.graduate3 : "");
    urlencoded.append("graduate4", reduxState.form.programsa.values.graduate4 !== undefined ? reduxState.form.programsa.values.graduate4 : "");
    urlencoded.append("support1", reduxState.form.programsa.values.support1 !== undefined ? reduxState.form.programsa.values.support1 : "");
    urlencoded.append("support2", reduxState.form.programsa.values.support2 !== undefined ? reduxState.form.programsa.values.support2 : "");
    urlencoded.append("support3", reduxState.form.programsa.values.support3 !== undefined ? reduxState.form.programsa.values.support3 : "");
    urlencoded.append("support4", reduxState.form.programsa.values.support4 !== undefined ? reduxState.form.programsa.values.support4 : "");
   
}