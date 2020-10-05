import { SUCCESSFULL_NEW_COURSE,FAILED_NEW_COURSE } from 'constants/actionTypes.jsx';

export const newCourse = params => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("state", "draft");
        urlencoded.append("description", params.courseDescription);
        urlencoded.append("language", "es");
        urlencoded.append("name", params.courseName);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

    return (dispatch) => {
        return fetch("http://localhost:8000/course/new", requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: SUCCESSFULL_NEW_COURSE, payload: json.data });
            
        })
        .catch(error=> {

        });

    }
};
