import { SHOW_USER, LOAD_FORM_USER, EDIT_USER} from "constants/actionTypes";
import { ERROR_EDIT_USER} from "constants/actionTypes";
import {EDIT_PASSWORD_USER, DELETE_USER , NEW_PASSWORD , ERROR_GMAIL} from "constants/actionTypes";

const initialState = { 
  editError: false,
  show_user: {
    id:"",
    email:"",
    username:"",
    language:"",
    language_grader:"",
    first_name:"",
    last_name: "",
    country:"",
  },
  active_user:{
    roles:[]
  }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_USER:
            return Object.assign({}, state, {
              show_user: action.payload
            });

      case EDIT_USER:
          return Object.assign({}, state, {
            edit_user: action.payload
          }); 
      case ERROR_EDIT_USER:
        return Object.assign({}, state, {
          editError: true
        })
      case LOAD_FORM_USER:
        return Object.assign({}, state, {
          data: action.data
        });

      case EDIT_PASSWORD_USER:
          return Object.assign({}, state, {
            edit_password: action.payload
          }); 

      case DELETE_USER:
          return Object.assign({}, state, {
            delete_user: action.payload
          }); 

      case NEW_PASSWORD:
        var new_password = action.payload;
        let errorGmail = false 
        let correctGmail = false
        if (new_password.id == undefined){
          errorGmail = true
        }
        else {
          correctGmail = true
        }
        return Object.assign({}, state, {
          new_password: new_password,
          errorGmail:errorGmail,
          correctGmail:correctGmail
        });
    }
    return state;
}