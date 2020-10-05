import { UPDATE_LANGUAGE_SELECT, UPDATE_COUNTRY_SELECT, COUNTRY_LIST, UPDATE_MODALITY_SELECT, UPDATE_PROGRAM_SELECT, UPDATE_ROLE_SELECT } from 'constants/actionTypes.jsx';
import { UPDATE_AMBASSADOR_SELECT, UPDATE_QUALITY1_SELECT } from 'constants/actionTypes.jsx';


export const updateLanguageSelect = params => {
    return (dispatch) => {
            dispatch ({ type: UPDATE_LANGUAGE_SELECT, payload: params });
    }   
}
export const updateCountrySelect = params => {
    return (dispatch) => {
            dispatch ({ type: UPDATE_COUNTRY_SELECT, payload: params });
    }   
}

export const updateModalitySelect = params => {
    return (dispatch) => {
            dispatch ({ type: UPDATE_MODALITY_SELECT, payload: params });
    }   
}
export const updateRoleSelect = params => {
    return (dispatch) => {
            dispatch ({ type: UPDATE_ROLE_SELECT, payload: params });
    }   
}
export const updateAmbassadorSelect = params => {
    return (dispatch) => {
            dispatch ({ type: UPDATE_AMBASSADOR_SELECT, payload: params });
    }   
}
export const updateProgramSelect = params => {
    return (dispatch) => {
            dispatch ({ type: UPDATE_PROGRAM_SELECT, payload: params });
    }   
}

export const updateQuality1Select = params => {
    return (dispatch) => {
            dispatch ({ type: UPDATE_QUALITY1_SELECT, payload: params });
    }   
}

export const CountryList = () => {
    return (dispatch) => {
        return fetch("https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;")
        .then(response => response.json())
        .then(json => {
            dispatch ({ type: COUNTRY_LIST, payload: json });
        });
    } 
}
