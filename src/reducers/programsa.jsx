import { SHOW_PROGRAMSA, UPDATE_REVISION_PROGRAMSA, ERROR_EDIT_REVISION, SUCCESSFULL_EDIT_REVISION, SUCCESSFULL_APPROVE_PROJECT, ERROR_APPROVE_PROJECT } from "constants/actionTypes";
import { LOAD_FORM_PROGRAMSA } from "constants/actionTypes";
import { HIDE_REVISION_ALERT, ERROR_SEND_REVISION_PROJECT, SUCCESSFULL_SEND_REVISION_PROJECT, } from "constants/actionTypes";

const initialState = { 
  programsa:{
    mision1: "",
    mision3: "",
    mision4: "",  
    generate_groups1: "",
    generate_groups2: "",
    generate_groups3: [""],
    generate_groups4: "",
    generate_groups5: "",
    generate_groups6: "",
    generate_groups7: "",   
    graduate1: "",
    graduate2: "",
    graduate3: "",
    graduate4: "",
    graduate5: [],   
    rule1: "",
    rule2: "",
    rule3: "",
    rule4: "",
    rule5: "",
    rule6: "",
    rule7: "",
    rule8: "",  
    rule9: "",
    rule10: "",
    support1: "",
    support2: "",
    support3: "",
    support4: "",
    state: "",
    statusmision: "",
    statusgraduate: "",
    statusgenerate_groups: "",
    statusrule: "",
    statussupport: "",
    code: "",
    student:{
        id: 1,
        username: "",
        language: "",
        language_grader: [],
        first_name: "",
        last_name: "",
        country: "",
        city: "",
        whatsapp: "",
        roles: [],
        groupes: [],
        studentgroup: {
          id: "",
          group:{
            id: "",
            name: "",
            start_date: "",
            final_date: "",
            graduation_date: "",
            number_students: "",
            modality: "",
            program: "",
            interweave_local: "",
            embassador:{
              id: "",
              username: "",
              language: "",
              language_grader: [],
              first_name: "",
              last_name: "",
              country: "",
              city: "",
              whatsapp: "",
            }
          }
        }
    },
  },
  editRevisionError: false,
  editRevisionSuccessfull: false,
  approveProjectError: false,
  approveProjectSuccessfull: false,
  sendRevisionProjectError: false,
  sendRevisionProjectSuccessfull: false
}



export const programsaReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOW_PROGRAMSA:
        return Object.assign({}, state, {
          programsa: action.payload
        });

      case UPDATE_REVISION_PROGRAMSA:
        return Object.assign({}, state, {
          programsa: Object.assign(state.programsa, {
            [action.payload.name]: action.payload.value
          })
        });

      case LOAD_FORM_PROGRAMSA:
            
        return Object.assign({}, state, {
          data: action.data
        });

      case ERROR_EDIT_REVISION:
        return Object.assign({}, state, {
          editRevisionError: true
        });

      case SUCCESSFULL_EDIT_REVISION:
        return Object.assign({}, state, {
          editRevisionSuccessfull: true
        });

      case ERROR_APPROVE_PROJECT:
        return Object.assign({}, state, {
          approveProjectError: true
        });

      case SUCCESSFULL_APPROVE_PROJECT:
        return Object.assign({}, state, {
          approveProjectSuccessfull: true
        });
      
      case ERROR_SEND_REVISION_PROJECT:
        return Object.assign({}, state, {
          sendRevisionProjectError: true
        });

      case SUCCESSFULL_SEND_REVISION_PROJECT: 
        return Object.assign({}, state, {
          sendRevisionProjectSuccessfull: true
        });

      case HIDE_REVISION_ALERT:
        return Object.assign({}, state, {
          editRevisionError: false,
          editRevisionSuccessfull: false,
          approveProjectError: false,
          approveProjectSuccessfull: false,
          sendRevisionProjectError: false,
          sendRevisionProjectSuccessfull: false
        });
    }

   
    return state;
}

