import { AMBASSADOR_LIST} from "constants/actionTypes";
import { SHOW_AMBASSADOR } from "constants/actionTypes";
import { LOAD_FORM_AMBASSADOR } from "constants/actionTypes";
import { EDIT_AMBASSADOR, ERROR_EDIT_AMBASSADOR } from "constants/actionTypes";
import { NEW_AMBASSADOR } from "constants/actionTypes";
import { EDIT_PASSWORD_AMBASSADOR } from "constants/actionTypes";
import { DELETE_AMBASSADOR } from "constants/actionTypes";


const initialState = { 
  ambassador_list: [], 
  loading: true,
  editError: false,
  show_ambassador: {
    email:"",
    username:"",
    language:"",
    language_grader:"",
    first_name:"",
    last_name: "",
    country:"",
  },
}

export const ambassadorReducer = (state = initialState, action) => {
    switch (action.type) {
      case AMBASSADOR_LIST:
        return Object.assign({}, state, {
          ambassador_list: action.payload,
          loading: false
        });
      case SHOW_AMBASSADOR:
          return Object.assign({}, state, {
            show_ambassador: action.payload
          });
      case LOAD_FORM_AMBASSADOR:
        return Object.assign({}, state, {
          data: action.data
        });
      case EDIT_AMBASSADOR:
          return Object.assign({}, state, {
            edit_ambassador: action.payload
          }); 
      case ERROR_EDIT_AMBASSADOR:
        return Object.assign({}, state, {
          editError: true
        })
      case NEW_AMBASSADOR:
          return Object.assign({}, state, {
            new_ambassador: action.payload
          }); 
      case EDIT_PASSWORD_AMBASSADOR:
          return Object.assign({}, state, {
            edit_password: action.payload
          }); 
      case DELETE_AMBASSADOR:
        return Object.assign({}, state, {
          delete_ambassador: action.payload
        });
      }
    return state;
}