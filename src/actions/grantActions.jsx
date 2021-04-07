import {GRANT_LIST, MBS_IMAGE_ALERT, UPLOAD_IMAGE, DELETE_IMAGE_ALERT} from 'constants/actionTypes.jsx';
import { LOAD_FORM_GRANT, SHOW_GRANT, EDIT_GRANT, SUCCESSFULL_EDIT, NEW_GRANT, DELETE_GRANT, SUCCESSFULL_NEW, SHOW_GRANT_UPDATE} from 'constants/actionTypes';
import { BASE_URL } from 'constants/urlTypes.jsx';
import { SUCCESSFULL_REDIRECT } from 'constants/actionTypes';
import { NEW_GRANT_UPDATE } from 'constants/actionTypes';
import { GRANT_ACTIVE_LIST } from 'constants/actionTypes';
import { NEW_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { EDIT_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { LOAD_FORM_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { SHOW_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { SEND_REVISION_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { SEND_CORRECTION_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { SEND_REJECT_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { SEND_APPROVED_GRANT_AMBASSADOR } from 'constants/actionTypes';
import { GRANT_AMBASSADOR_LIST } from 'constants/actionTypes';
import { SUCCESSFUL_SEND } from 'constants/actionTypes';
import { SHOW_GRANT_DEADLINE } from 'constants/actionTypes';
import { jsonToArray } from 'assets/functions/general.jsx';
import { GRANT_AMBASSADOR_APPLICATION } from 'constants/actionTypes';
import { NEW_GRANT_GROUP, SHOW_GRANT_USER } from 'constants/actionTypes';
import { SHOW_GRANT_GROUP_LIST, LOAD_FORM_GRANT_GROUP } from 'constants/actionTypes';
import { SHOW_GRANT_STATISTIC } from 'constants/actionTypes';

export const getGrantList= () => {
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

        return fetch( BASE_URL + "/grant/?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GRANT_LIST, payload: json.data });
        });
    }
}

export const grantAmbassadorList= () => {
    return (dispatch) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("state", "state.revision");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/ambassadorlist", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GRANT_AMBASSADOR_LIST, data: json.data });
        });
    }
}

export const grantAmbassadorApplication= (key) => {
    return (dispatch) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/ambassadorapplication/" + key , requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GRANT_AMBASSADOR_APPLICATION, data: json.data });
        });
    }
}

export const getGrantActiveList= () => {
    return (dispatch, getState) => {
    const reduxState = getState();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("language", reduxState.loginReducer.active_user.language);
        urlencoded.append("id_user", reduxState.loginReducer.active_user.id);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/active", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GRANT_ACTIVE_LIST, payload: json.data });
        });
    }
}


export const showGrant = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grant/show/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT, payload: json.data });
            dispatch ({ type: LOAD_FORM_GRANT, data: json.data });   
        })

    }
};

export const showGrantDeadline = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grant/deadline?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT_DEADLINE, payload: json.data });
        })

    }
};

export const showGrantAmbassador = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grant/showambassador/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT_AMBASSADOR, payload: json.data });
            dispatch ({ type: LOAD_FORM_GRANT_AMBASSADOR, data: json.data });   
        })

    }
};

export const showGrantGroup = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grant/showgroup/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT_GROUP_LIST, data: json.data.groups });
            dispatch ({ type: LOAD_FORM_GRANT_GROUP, data: json.data.groups });   
        })

    }
};

export const showGrantStatisticGroup = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grantstatistic/showgroup/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT_GROUP_LIST, data: json.data.groups });
        })

    }
};

export const showGrantStatistic = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grantstatistic")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT_STATISTIC, data: json.data });
        })

    }
};


export const loadFormGrantAmbassador = data => ({ type: LOAD_FORM_GRANT_AMBASSADOR, data });
export const loadFormGrantGroup = data => ({ type: LOAD_FORM_GRANT_GROUP, data });

export const showGrantUpdate = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grant/showupdate/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT_UPDATE, payload: json.data });
        })

    }
};

export const showGrantUser = key => {
    return (dispatch) => {
        return fetch( BASE_URL + "/grant/showuser/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SHOW_GRANT_USER, payload: json.data });
        })

    }
};

export const loadFormGrant = data => ({ type: LOAD_FORM_GRANT, data });
export const editGrant = ()=> {
    
    return (dispatch, getState) => {
    const reduxState = getState();
    const key = reduxState.form.grantform.values.id;
    console.log(reduxState.form.grantform.values.date);
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", reduxState.form.grantform.values.title);
        urlencoded.append("language",reduxState.form.grantform.values.language);
        urlencoded.append("description", reduxState.form.grantform.values.description);
        urlencoded.append("state", reduxState.form.grantform.values.state); 
        urlencoded.append("type",  reduxState.form.grantform.values.type );

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/edit/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EDIT_GRANT, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })

    }
};

export const editGrantAmbassador = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    const key = reduxState.form.grantAmbassadorform.values.id;
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("code",reduxState.form.grantAmbassadorform.values.code);
        urlencoded.append("number",reduxState.form.grantAmbassadorform.values.number);
        urlencoded.append("question1",reduxState.form.grantAmbassadorform.values.question1);
        urlencoded.append("question2",reduxState.form.grantAmbassadorform.values.question2);
        urlencoded.append("question3",reduxState.form.grantAmbassadorform.values.question3);
        urlencoded.append("question4",reduxState.form.grantAmbassadorform.values.question4);
        urlencoded.append("question5",reduxState.form.grantAmbassadorform.values.question5);
        urlencoded.append("question6",reduxState.form.grantAmbassadorform.values.question6);
        urlencoded.append("question7",reduxState.form.grantAmbassadorform.values.question7);
        urlencoded.append("file",reduxState.form.grantAmbassadorform.values.file);
        urlencoded.append("file2",reduxState.form.grantAmbassadorform.values.file2);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/editambassador/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: EDIT_GRANT_AMBASSADOR, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })

    }
};

export const sendRevisionGrantAmbassador = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    const key = reduxState.grantReducer.edit_grant_ambassador.id;
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/revisionambassador/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {            
            dispatch ({ type: SEND_REVISION_GRANT_AMBASSADOR, payload: json.data });
            dispatch ({ type: SUCCESSFUL_SEND});  
        })

    }
};

export const sendCorrectionGrantAmbassador = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    const key = reduxState.grantReducer.show_grant_ambassador.id;
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("correction",reduxState.form.grantAmbassadorform.values.correction);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/correctionambassador/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SEND_CORRECTION_GRANT_AMBASSADOR, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })

    }
};

export const sendRejectGrantAmbassador = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    const key = reduxState.grantReducer.show_grant_ambassador.id;
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("correction",reduxState.form.grantAmbassadorform.values.correction);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/rejectambassador/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SEND_REJECT_GRANT_AMBASSADOR, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })

    }
};

export const sendApprovedGrantAmbassador = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    const key = reduxState.grantReducer.show_grant_ambassador.id;
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("correction",reduxState.form.grantAmbassadorform.values.correction);
        urlencoded.append("amount",reduxState.form.grantAmbassadorform.values.amount);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch( BASE_URL + "/grant/approveambassador/"+ key +"?callback=foo", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SEND_APPROVED_GRANT_AMBASSADOR, payload: json.data });
            dispatch ({ type: SUCCESSFULL_EDIT});  
        })

    }
};

export const newGrant = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("id_administrator",reduxState.loginReducer.active_user.id);
    urlencoded.append("title", reduxState.form.grantNewform.values.title);
    urlencoded.append("language",reduxState.form.grantNewform.values.language);
    urlencoded.append("description", reduxState.form.grantNewform.values.description);
    urlencoded.append("state", reduxState.form.grantNewform.values.state); 
    urlencoded.append("type", reduxState.form.grantNewform.values.type);   
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch( BASE_URL + "/grant/new", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: NEW_GRANT, payload: json.data });
            dispatch ({ type: SUCCESSFULL_NEW });  
        })
    }
};

export const newGrantAmbassador = ()=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("id_ambassador",reduxState.loginReducer.active_user.id);
    urlencoded.append("id_grant", reduxState.grantReducer.show_grant.id);
    urlencoded.append("code",reduxState.form.grantAmbassadorNewform.values.code);
    urlencoded.append("number",reduxState.form.grantAmbassadorNewform.values.number);
    urlencoded.append("question1",reduxState.form.grantAmbassadorNewform.values.question1);
    urlencoded.append("question2",reduxState.form.grantAmbassadorNewform.values.question2);
    urlencoded.append("question3",reduxState.form.grantAmbassadorNewform.values.question3);
    urlencoded.append("question4",reduxState.form.grantAmbassadorNewform.values.question4);
    urlencoded.append("question5",reduxState.form.grantAmbassadorNewform.values.question5);
    urlencoded.append("question6",reduxState.form.grantAmbassadorNewform.values.question6);
    urlencoded.append("question7",reduxState.form.grantAmbassadorNewform.values.question7);
    urlencoded.append("file",reduxState.form.grantAmbassadorNewform.values.file);
    urlencoded.append("file2",reduxState.form.grantAmbassadorNewform.values.file2);
    
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch( BASE_URL + "/grant/newambassador", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: NEW_GRANT_AMBASSADOR, payload: json.data });
            dispatch ({ type: SUCCESSFULL_NEW });  
        })
    }
};

export const newGrantUpdate = (key)=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("id_grant_ambassador", key);
    urlencoded.append("id_user", reduxState.loginReducer.active_user.id);
    urlencoded.append("file",reduxState.form.grantUpdateForm.values.file);
    urlencoded.append("description", reduxState.form.grantUpdateForm.values.description);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch( BASE_URL + "/grant/newupdate", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: NEW_GRANT_UPDATE, payload: json.data });
            dispatch ({ type: SUCCESSFULL_NEW }); 
        })
    }
};

export const newGrantGroup = (key)=> {
    return (dispatch, getState) => {
    const reduxState = getState();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("id_grant_ambassador", key);
    urlencoded.append("groups", jsonToArray(reduxState.form.grantGroupform.values.groups));
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
        return fetch( BASE_URL + "/grant/newgrantgroups", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: NEW_GRANT_GROUP, payload: json.data });
            dispatch ({ type: SUCCESSFULL_NEW }); 
        })
    }
};
export const deleteGrant  = (key, redirect) => {
    
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    return (dispatch) => {
      return fetch(BASE_URL + "/grant/delete/"+ key +"?callback=foo", requestOptions)
      .then(response => response.json())
      .then(json => {
          dispatch ({ type: DELETE_GRANT, payload: json.data });
          redirect.push('/grant');
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
        urlencoded.append("id_student",  reduxState.grantReducer.id_student);
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

export const showGrantRedirect =  (redirect)  => {
    return (dispatch, getState ) => {        
        const reduxState = getState();
        const key = reduxState.grantReducer.new_grant.id
        dispatch ({ type: SUCCESSFULL_REDIRECT });  
        return redirect.push( '/grant/show/'+ key);
    }
}

