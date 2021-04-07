import { EVALUATION_PRE, PRE_ALERT, DELETE_ALERT, POST_ALERT, EVALUATION_POST } from "constants/actionTypes";
import { SHOW_EVALUATION } from "constants/actionTypes";
import { LOAD_FORM_EVALUATION } from "constants/actionTypes";
import { REDIRECT_GROUP } from "constants/actionTypes";


const initialState = { 
  show_evaluation:{
    question1:"option1",
    question2:"",
  },
  data:{
    postquestion1:"option1",
    postquestion2:"option1",
    postquestion3:"option1",
    postquestion4:"option1",
    postquestion5:"option1",
    postquestion6:"option1",
    postquestion7:"option1",
    postquestion8:"option1",
    postquestion9:"option1",
    question1:"option1",
    question2:"option1",
    question3:"option1",
    question4:"option1",
    question5:"option1",
    question6:"option1",
    question7:"option1"
  },
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
  pre_alert:false,
  post_alert:false,
}

export const evaluationReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOW_EVALUATION:
        return Object.assign({}, state, {
          show_evaluation: action.payload
        });
      case LOAD_FORM_EVALUATION:
        return Object.assign({}, state, {
          data: action.data
        });
      case EVALUATION_PRE:
        return Object.assign({}, state, {
          evaluation_pre: action.payload,
        });

      case EVALUATION_POST:
        return Object.assign({}, state, {
          evaluation_post: action.payload,
        });

      case PRE_ALERT:
        return Object.assign({}, state, {
          id_student: action.payload,
          pre_alert: true,
        });

      case POST_ALERT:
        return Object.assign({}, state, {
          id_student:action.payload,
          post_alert: true,
        });

      case DELETE_ALERT:
        return Object.assign({}, state, {
            delete_alert:true,
            pre_alert: false,
            post_alert: false,
        });
      case REDIRECT_GROUP:
        return Object.assign({}, state, {
          redirect_group: true,
        });
    }     
    return state;
}