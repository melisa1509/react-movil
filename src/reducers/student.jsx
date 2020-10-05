import { STUDENT_LIST, SHOW_STUDENT, LOAD_FORM_STUDENT, DASHBOARD_STUDENT } from "constants/actionTypes";
import { DELETE_STUDENT } from "constants/actionTypes";
import { ERROR_EDIT_STUDENT } from "constants/actionTypes";
import { EDIT_STUDENT } from "constants/actionTypes";
import { NEW_STUDENT } from "constants/actionTypes";
import { EDIT_PASSWORD_STUDENT } from "constants/actionTypes";
import { GET_STUDENT_AMBASSADOR, EVALUATION_PRE, EVALUATION_POST, MBS_STUDENT_LIST } from "constants/actionTypes";

const initialState = { 
  student_list: [], 
  student_ambassador_list:[],
  mbs_student_list:[],
  loading: true,
  editError: false,
  evaluation_pre:{
    question1:"option2",
    question2:"option1",
    question3:"option1",
    question4:"option1",
    question5:"option1",
    question6:"option1",
    question7:"option1"
  },
  evaluation_post:{
    postquestion1:"option1",
    postquestion2:"option1",
    postquestion3:"option1",
    postquestion4:"option1",
    postquestion5:"option1",
    postquestion6:"option1",
    postquestion7:"option1",
    postquestion8:"option1",
    postquestion9:"option1",
  },
  show_student: {
    id:"",
    email:"",
    username:"",
    language:"",
    language_grader:"",
    first_name:"",
    last_name: "",
    country:"",
  },
  new_student:{
    language: "es",
    country: "AFG",
    id:""
  },
  dashboard_student:{    
      progressMbs:{
        state: "new",
        plan:  "0%",
        process: "0%",
        product: "0%",
        price: "0%",
        promotion: "0%",
        paperwork: "0%",
        quality: "0%",
        service: "0%"
      },
      progressSa:{
        state: "new",
        mision:  "0%",
        generate: "0%",
        facilitate: "0%",
        graduate: "0%",
        support: "0%",   
        student_ambassador: false  
      }

  }    
  
}

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
      case STUDENT_LIST:
        return Object.assign({}, state, {
          student_list: action.payload,
          loading: false
        });

      case MBS_STUDENT_LIST:
        return Object.assign({}, state, {
          mbs_student_list: action.payload,
          loading: false
        });
    
      case SHOW_STUDENT:
          return Object.assign({}, state, {
            show_student: action.payload
          });
    
      case LOAD_FORM_STUDENT:
        return Object.assign({}, state, {
          data: action.data
        });
    
      case DELETE_STUDENT:
          return Object.assign({}, state, {
            delete_student: action.payload
          }); 
    
      case EDIT_STUDENT:
          return Object.assign({}, state, {
            edit_student: action.payload
          }); 
      case NEW_STUDENT:
        return Object.assign({}, state, {
          new_student: action.payload
        }); 
      case ERROR_EDIT_STUDENT:
        return Object.assign({}, state, {
          editError: true
        })
    
      case EDIT_PASSWORD_STUDENT:
          return Object.assign({}, state, {
            edit_password: action.payload
          }); 

      case DASHBOARD_STUDENT:
        return Object.assign({}, state, {
          dashboard_student: action.payload
        }); 

      case GET_STUDENT_AMBASSADOR:
        return Object.assign({}, state, {
          student_ambassador_list: action.payload,
          loading: false
        }); 
      case EVALUATION_PRE:
        return Object.assign({}, state, {
          evaluation_pre: action.payload,
        });
        
      case EVALUATION_POST:
        return Object.assign({}, state, {
          evaluation_post: action.payload,
        });
    }
    return state;
}