import { UPDATE_YES_NOT_SELECT } from "constants/actionTypes";
import { UPDATE_LANGUAGE_SELECT,  UPDATE_COUNTRY_SELECT, COUNTRY_LIST, UPDATE_MODALITY_SELECT, UPDATE_PROGRAM_SELECT, UPDATE_ROLE_SELECT } from "constants/actionTypes";
import { UPDATE_AMBASSADOR_SELECT, UPDATE_QUALITY1_SELECT, UPDATE_ACTIVE_SELECT, UPDATE_TYPE_SELECT } from "constants/actionTypes";

const initialState = { 
  selected_language: "",
  selected_country: "",
  selected_modality:"",
  selected_role:"",
  selected_program:"",
  selected_type:"",
  selected_yes_not:"",
  selected_ambassador:"ALL",
  country_list: []
}

export const selectReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LANGUAGE_SELECT:
            return Object.assign({}, state, {
              selected_language: action.payload
            });

      case UPDATE_COUNTRY_SELECT:
          return Object.assign({}, state, {
            selected_country: action.payload
          });

      case UPDATE_MODALITY_SELECT:
          return Object.assign({}, state, {
            selected_modality: action.payload
          });
      case UPDATE_ROLE_SELECT:
        return Object.assign({}, state, {
          selected_role: action.payload
        });

      case UPDATE_PROGRAM_SELECT:
          return Object.assign({}, state, {
            selected_program: action.payload
          });

      case UPDATE_AMBASSADOR_SELECT:
        return Object.assign({}, state, {
          selected_ambassador: action.payload
        });
          
      case COUNTRY_LIST:
          return Object.assign({}, state, {
            country_list: action.payload
          });

      case UPDATE_QUALITY1_SELECT:
        return Object.assign({}, state, {
          selected_quality1: action.payload
        });

      case UPDATE_ACTIVE_SELECT:
        return Object.assign({}, state, {
          selected_active: action.payload
        });

      case UPDATE_TYPE_SELECT:
        return Object.assign({}, state, {
          selected_type: action.payload
        });

      case UPDATE_YES_NOT_SELECT:
        return Object.assign({}, state, {
          selected_yes_not: action.payload
        });
    }
    return state;
}