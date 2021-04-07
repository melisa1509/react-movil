import { SHOW_PROGRAMMBS, UPDATE_REVISION_PROGRAMMBS, ERROR_EDIT_REVISION, SUCCESSFULL_EDIT_REVISION, SUCCESSFULL_APPROVE_PROJECT, ERROR_APPROVE_PROJECT } from "constants/actionTypes";
import { LOAD_FORM_PROGRAMMBS, RESET_SHOW_PROGRAMMBS } from "constants/actionTypes";
import { HIDE_REVISION_ALERT, ERROR_SEND_REVISION_PROJECT, SUCCESSFULL_SEND_REVISION_PROJECT, ACTIVE_TAB, DEFAULT_VALUES_PROGRAMMBS } from "constants/actionTypes";

const initialState = { 
  programmbs:{
    plan1: "",
    plan2: "",
    product1: "",
    product3: "",
    product4: "",
    product5: "",
    product6: "",
    product7: "",
    process1: [" "],
    process2: "",
    process3: "",
    process4: "",
    price1: "",
    price2: "",
    price3: "",
    price4: "",
    promotion1: "",
    promotion2: "",
    promotion3: "",
    promotion4: "",
    promotion5: "",
    paperwork1: "",
    paperwork2: "option1",
    paperwork3: {"option1": true},
    paperwork4: {p4_initial_capital: "", p4_expenses: "", p4_income: "", p4_balance: "", p4_array: ["","","","","","","","","",""]},
    paperwork5: {p5_income: "", p5_array: ["","","",""]},
    paperwork6: {p6_expenses: "", p6_earnings_loses: "", p6_balance: "", p6_array: ["","","",""]},
    paperwork7: {p7_initial_capital: ["","","","","","","","",""], p7_title: ["","","","","","","","",""], p7_income: ["","","","","","","","",""], p7_array: ["","","","","","","","","",""]},
    paperwork8: {p8_balance: ["","","","","","","","",""], p8_expenses: ["","","","","","","","",""], p8_earnings_loses: ["","","","","","","","",""], p8_array: ["","","","","","","","","",""]},
    quality_p1: "",
    quality_p2: "",
    quality_p3: "",
    quality_p4: "",
    quality_p5: "",
    quality_p6: "",
    quality_p7: "",
    quality_p8: "",
    quality_q1: "274,119",
    quality_q2: "303,132",
    quality_q3: "314,159",
    quality_q4: "303,188",
    quality_q5: "274,199",
    quality_q6: "248,187",
    quality_q7: "234,159",
    quality_q8: "247,132",
    quality_g1: "",
    quality_g2: "",
    quality_g3: "",
    quality_g4: "",
    quality_g5: "",
    quality_g6: "",
    quality_g7: "",
    qualityg8: "",
    service1: "",
    service2: "",
    service3: "",
    service4: "",
    service5: "",
    service6: "",
    history2: "",
    state: "",
    statusplan: "",
    statusproduct: "",
    statusprice: "",
    statuspromotion: "",
    statuspaperwork: "",
    statusprocess: "",
    statusquality: "",
    statusservice: "",
    code: "",
    student:{
        id: 142,
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
  sendRevisionProjectSuccessfull: false,
  activeTab:0
}



export const programmbsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOW_PROGRAMMBS:
        var programmbs = action.payload;
        if(programmbs !== undefined){
          programmbs.paperwork9 = programmbs.paperwork3;
        }        
        return Object.assign({}, state, {
          programmbs: programmbs,
        });

      case UPDATE_REVISION_PROGRAMMBS:
        return Object.assign({}, state, {
          programmbs: Object.assign(state.programmbs, {
            [action.payload.name]: action.payload.value
          })
        });

      case LOAD_FORM_PROGRAMMBS:
        var programmbs = action.data;
        programmbs.paperwork9 = programmbs.paperwork3;
        var options = {};
        programmbs.paperwork3.forEach(element => {
          options[element] = true;
        });
        programmbs.paperwork3 = options;
        return Object.assign({}, state, {
          data: programmbs
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

      case ACTIVE_TAB:
        return Object.assign({}, state, {
          activeTab: action.key
        });

      case RESET_SHOW_PROGRAMMBS:
        return Object.assign({}, state, {
          programmbs: Object.assign(state.programmbs, {
            ["paperwork4"]: {},
            ["paperwork5"]: {},
            ["paperwork6"]: {},
            ["paperwork7"]: {},
            ["paperwork8"]: {}
          })
        });

      case DEFAULT_VALUES_PROGRAMMBS:
        var programmbs = initialState.programmbs;              
        return Object.assign({}, state, {
          programmbs: programmbs,
        });
    }

   
    return state;
}

