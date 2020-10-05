import {GET_CERTIFICATE_LIST} from 'constants/actionTypes.jsx';
import { BASE_URL} from 'constants/urlTypes.jsx';

export const getCertificateList = key => {
    return (dispatch) => {
        return fetch(BASE_URL + "/certificate/list/"+ key +"?callback=foo")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: GET_CERTIFICATE_LIST, payload: json.data });  
        })

    }
};
