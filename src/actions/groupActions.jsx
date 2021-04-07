import {GROUP_LIST, GET_PROJECT_PROGRESS, MBS_IMAGE_ALERT, UPLOAD_IMAGE, DELETE_IMAGE_ALERT} from 'constants/actionTypes.jsx';
import { LOAD_FORM_GROUP, SHOW_GROUP, EDIT_GROUP, SUCCESSFULL_EDIT, NEW_GROUP, DELETE_GROUP, SUCCESSFULL_NEW, GROUP_PROGRAM} from 'constants/actionTypes';
import { BASE_URL } from 'constants/urlTypes.jsx';
import { SUCCESSFULL_REDIRECT } from 'constants/actionTypes';
import { convertDate } from 'assets/functions/general.jsx';

export const getGroupList= () => {
    return (dispatch, getState) => {
    const reduxState = getState();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id_ambassador", reduxState.loginReducer.active_user.id);
        urlencoded.append("role",reduxState.loginReducer.active_user.roles[0]);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/group/?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GROUP_LIST, payload: json.data });
        });
    }
}

export const getGroupProgram= () => {
    return (dispatch, getState) => {
    const reduxState = getState();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("program", "option.program2");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/group/program", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GROUP_PROGRAM, payload: json.data });
        });
    }
}

export const showGroup = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/group/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GROUP, payload: json.data });
            dispatch ({ type: LOAD_FORM_GROUP, data: json.data });   
        })

    }
};
export const loadFormGroup = data => ({ type: LOAD_FORM_GROUP, data });
export const editGroup = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    const key = reduxState.form.groupform.values.id;
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", reduxState.form.groupform.values.name);
        urlencoded.append("startDate", convertDate(reduxState.form.groupform.values.start_date));
        urlencoded.append("finalDate", convertDate(reduxState.form.groupform.values.final_date));
        urlencoded.append("graduationDate", convertDate(reduxState.form.groupform.values.graduation_date));
        urlencoded.append("modality", reduxState.form.groupform.values.modality);
        urlencoded.append("program", reduxState.form.groupform.values.program);
        urlencoded.append("interweaveLocal", reduxState.form.groupform.values.interweave_local !== undefined ? reduxState.form.groupform.values.interweave_local : "" );
        urlencoded.append("authorizationCode", reduxState.form.groupform.values.authorization_code !== undefined ? reduxState.form.groupform.values.authorization_code : "");
        urlencoded.append("name_image", reduxState.form.groupform.values.name_image);
        urlencoded.append("number_students_graduated", reduxState.form.groupform.values.number_students_graduated);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/group/edit/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EDIT_GROUP, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })

    }
};

export const newGroup = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("id_ambassador",reduxState.form.groupNewform.values.id_ambassador);
    urlencoded.append("name", reduxState.form.groupNewform.values.name);
    urlencoded.append("startDate",convertDate(reduxState.form.groupNewform.values.start_date));
    urlencoded.append("finalDate", convertDate(reduxState.form.groupNewform.values.final_date));
    urlencoded.append("modality", reduxState.form.groupNewform.values.modality);
    urlencoded.append("program", reduxState.form.groupNewform.values.program);
    urlencoded.append("graduationDate",reduxState.form.groupNewform.values.graduation_date);
    urlencoded.append("interweaveLocal",reduxState.form.groupNewform.values.interweave_local !== undefined ? reduxState.form.groupNewform.values.interweave_local : "");
    urlencoded.append("authorizationCode",reduxState.form.groupNewform.values.authorization_code !== undefined ? reduxState.form.groupNewform.values.authorization_code : "");
    urlencoded.append("name_image", reduxState.form.groupNewform.values.name_image);
    urlencoded.append("number_students_graduated", reduxState.form.groupNewform.values.number_students_graduated);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch( BASE_URL + "/group/new", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: NEW_GROUP, payload: json.data });
            dispatch ({ type: SUCCESSFULL_NEW });  
        })
    }
};
export const deleteGroup  = (key, redirect) => {
    
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    return (dispatch) => {
      return fetch(BASE_URL + "/group/delete/"+ key +"?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: DELETE_GROUP, payload: json.data });
          redirect.push('/group');
      });
  }
}

export const getProjectProgress= (key) => {
    return (dispatch) => {
        return fetch( BASE_URL + "/student/progress/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_PROJECT_PROGRESS, payload: json.data });
        });
    }
}

export const uploadImageAlert = (key) => ({ type: MBS_IMAGE_ALERT, payload:key })

export const uploadImage = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

   
    var urlencoded = new URLSearchParams();
        urlencoded.append("id_student",  reduxState.groupReducer.id_student);
        urlencoded.append("file_name", reduxState.form.uploadform.values.name_image);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch(BASE_URL + "/programmbs/newfile", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: UPLOAD_IMAGE, payload: json.data }); 
            dispatch ({ type: SUCCESSFULL_EDIT});
        })

    }
};
export const deleteImageAlert = () => ({ type: DELETE_IMAGE_ALERT })

export const showGroupRedirect =  (redirect)  => {
    return (dispatch, getState ) => {        
        const reduxState = getState();
        const key = reduxState.groupReducer.new_group.id
        dispatch ({ type: SUCCESSFULL_REDIRECT });  
        return redirect.push( '/group/show/'+ key);
    }
}