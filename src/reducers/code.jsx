import { CODE_LIST, SHOW_CODE, LOAD_FORM_CODE, EDIT_CODE, ERROR_EDIT_CODE } from "constants/actionTypes";
import { DELETE_CODE } from "constants/actionTypes";

const initialState = { 
  code_list:{
    codesMbs:[],
    codesSa:[],
    codesJr:[]
  },
  show_code:{
   name:"",
   country:"",
   program:"",
   number:""
  },
  loading: true,
  editError: false
}
export const codeReducer = (state = initialState, action) => {
    switch (action.type) {
      case CODE_LIST:
        return Object.assign({}, state, {
          code_list: action.payload,
          loading: false
        });
      case SHOW_CODE:
        return Object.assign({}, state, {
          show_code: action.payload
        });
      case LOAD_FORM_CODE:
        return Object.assign({}, state, {
          data: action.data
        });
      case EDIT_CODE:
        return Object.assign({}, state, {
          edit_code: action.payload
        }); 
      case ERROR_EDIT_CODE:
        return Object.assign({}, state, {
          editError: true
        })
      case DELETE_CODE:
        return Object.assign({}, state, {
          delete_code: action.payload
        }); 
    }
    return state;
}