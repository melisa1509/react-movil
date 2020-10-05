import { ADD_ARTICLE, DATA_LOADED, SET_DATA, SAVE_COURSE } from "constants/actionTypes";
import { DATA_REQUESTED } from "constants/actionTypes";
import { SUCCESSFULL_AUTHENTICACION, FAILED_AUTHENTICATION, SUCCESSFULL_NEW_COURSE,FAILED_NEW_COURSE} from "constants/actionTypes";

const initialState = { 
  articles:[] , 
  remoteArticles: [], 
  rows : [],

}

export const appReducer = (state = initialState, action) => {
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
          articles: state.articles.concat(action.payload)
        });
    }
    if (action.type === DATA_LOADED) {
      return Object.assign({}, state, {
        rows: action.payload,
        loading: false
      });
    }
    if (action.type === SET_DATA) {
      return Object.assign({}, state, {
        rows: state.rows.concat(action.payload), 
      });
    }
    if (action.type === SAVE_COURSE) {
      
      return Object.assign({}, state, {
        rows: action.payload,
        loading: false 
      });
    }
    if (action.type === DATA_REQUESTED) {
      
      return Object.assign({}, state, {
        loading: true 
      });
    }
    
    if (action.type === SUCCESSFULL_NEW_COURSE) {
      
      return Object.assign({}, state, {
        courseNewError: false 
      });
    }
    if (action.type === FAILED_NEW_COURSE) {
      
      return Object.assign({}, state, {
        courseNewError: true 
      });
    }
    return state;
}