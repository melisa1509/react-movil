import { GET_CERTIFICATE_LIST } from "constants/actionTypes";

const initialState = { 
    certificate_list:[]
}

export const certificateReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CERTIFICATE_LIST:
        return Object.assign({}, state, {
          certificate_list: action.payload
        });
    }
    return state;
}