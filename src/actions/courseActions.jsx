import { SUCCESSFULL_NEW_COURSE,SUCCESSFULL_NEW,COURSE_LIST} from 'constants/actionTypes.jsx';
import {BASE_URL} from 'constants/urlTypes.jsx'


export const getCourseList = key => {
    return (dispatch, getState) => {
        const reduxState = getState();
        return fetch(BASE_URL + "/course")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: COURSE_LIST, payload: json.data });
        });
    }  
}
export const newCourse = () => {
    return (dispatch,getState) => {

        const reduxState = getState();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("user", "9");
        urlencoded.append("state", reduxState.form.courseNewform.values.state);
        urlencoded.append("description", reduxState.form.courseNewform.values.description);
        urlencoded.append("language", reduxState.form.courseNewform.values.language);
        urlencoded.append("name", reduxState.form.courseNewform.values.name);
       
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        return fetch(BASE_URL + "/course/new", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SUCCESSFULL_NEW_COURSE, payload: json.data });  
            dispatch ({ type: SUCCESSFULL_NEW }); 
        })
    }
};
