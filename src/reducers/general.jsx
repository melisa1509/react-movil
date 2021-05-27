import { ERROR_REQUIRED_FIELDS, SUCCESS_REQUIRED_FIELDS} from "constants/actionTypes";
import { SUCCESSFULL_EDIT, SUCCESSFUL_DELETE  } from "constants/actionTypes";
import { IDLE_TIMER } from "constants/actionTypes";
import { ERROR_EVALUATION } from "constants/actionTypes";
import { ALREADY_EXIST_USER } from "constants/actionTypes";
import { CHANGE_ACTIVE_TAB } from "constants/actionTypes";
import { DISMATCH_PASSWORD, SUCCESSFULL_EDIT_CLEAN } from "constants/actionTypes";
import { SUCCESSFULL_NEW, DELETE_SUCCESSFUL, UPDATE_FILE_NAME, SUCCESSFUL_NEW_ARRAY, SUCCESSFUL_SEND } from "constants/actionTypes";
import { ERROR_SUBMIT, SUCCESS_SUBMIT } from "constants/actionTypes";

const initialState = {
  idle_timer_modal: false, 
  error_new_user: false,
  successfull_edit: false,
  successful_delete: false,
  successful_new: false,
  successful_send: false,
  successful_new_array: false,
  errorRequired: false,
  submitError: false,
  successRequired: false,
  dismatch_password:false,
  error_evaluation: false,
  delete:false, 
  active_tab: 0,
}

export const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_REQUIRED_FIELDS:
            return Object.assign({}, state, {
              errorRequired: true,
            });
        case ERROR_SUBMIT:
          return Object.assign({}, state, {
            errorSubmit: true,
          });
        case SUCCESS_SUBMIT:
          return Object.assign({}, state, {
            errorSubmit: false,
          });
        case SUCCESS_REQUIRED_FIELDS:
            return Object.assign({}, state, {
              successRequired: true,
              errorRequired: false,
            });
        case SUCCESSFULL_EDIT:
          return Object.assign({}, state, {
            successfull_edit: true
          }); 
        case SUCCESSFUL_DELETE:
          return Object.assign({}, state, {
            successful_delete: true
          }); 
        case DELETE_SUCCESSFUL:
          return Object.assign({}, state, {
            delete: true,
            successfull_edit: false,
            successfull_new: false,
            successful_send: false,
            dismatch_password: false,
            successful_new_array: false,
            errorSubmit: false,
            error_new_user: false,
            error_evaluation: false,
          });
        case DISMATCH_PASSWORD:
          return Object.assign({}, state, {
            dismatch_password: true
          }); 
        case SUCCESSFULL_NEW:
          return Object.assign({}, state, {
            successfull_new: true
          });
        case SUCCESSFUL_NEW_ARRAY:
          return Object.assign({}, state, {
            successful_new_array: true
          });
        case SUCCESSFUL_SEND:
          return Object.assign({}, state, {
            successful_send: true
          });       
        case SUCCESSFULL_EDIT_CLEAN:
          return Object.assign({}, state, {
            successfull_edit: false
          });
        case UPDATE_FILE_NAME:
          var element = "groupNewForm";
          return Object.assign({}, state, {
            enviando: element
          });

        case CHANGE_ACTIVE_TAB:
          return Object.assign({}, state, {
            active_tab: action.payload
          });

        case IDLE_TIMER:
          return Object.assign({}, state, {
            idle_timer_modal: true
          });

        case ALREADY_EXIST_USER:
          return Object.assign({}, state, {
            error_new_user: true
          });

        case ERROR_EVALUATION:
          return Object.assign({}, state, {
            error_evaluation: true
          });

        }
        
     return state;
}
  
