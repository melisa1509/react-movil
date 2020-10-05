import { ERROR_REQUIRED_FIELDS, SUCCESS_REQUIRED_FIELDS} from "constants/actionTypes";
import { SUCCESSFULL_EDIT, SUCCESSFUL_DELETE  } from "constants/actionTypes";
import { DISMATCH_PASSWORD, SUCCESSFULL_EDIT_CLEAN } from "constants/actionTypes";
import { SUCCESSFULL_NEW, DELETE_SUCCESSFUL, UPDATE_FILE_NAME } from "constants/actionTypes";
import { DELETE_ALERT } from "constants/actionTypes";

const initialState = { 
  successfull_edit: false,
  successful_delete: false,
  successful_new: false,
  errorRequired: false,
  successRequired: false,
  dismatch_password:false,
  delete:false
}
//crear un 

export const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_REQUIRED_FIELDS:
            return Object.assign({}, state, {
              errorRequired: true
            });
        case SUCCESS_REQUIRED_FIELDS:
            return Object.assign({}, state, {
              successRequired: true,
              errorRequired: false
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
            dismatch_password: false
          });
        case DISMATCH_PASSWORD:
          return Object.assign({}, state, {
            dismatch_password: true
          }); 
        case SUCCESSFULL_NEW:
          return Object.assign({}, state, {
            successfull_new: true
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
        }
      
     return state;
}
  
