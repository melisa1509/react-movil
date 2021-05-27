
import { ERROR_EDIT_STUDENT } from "constants/actionTypes";
import { NEW_STUDENT, EVALUATION_PRE } from "constants/actionTypes";

const initialState = { 
  new_student:{
    id:"",
    language: "es",
    country: "AFG",
    created_at: new Date(),
    studentgroup:{
      group:{
        embassador:{
          first_name:"",
          last_name:""
        },
        name:""
      }
    }
  }
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case NEW_STUDENT:
        return Object.assign({}, state, {
          new_student: action.payload
        }); 
      case EVALUATION_PRE:
        return Object.assign({}, state, {
            evaluation_pre: action.payload,
        });
    }
    return state;
}