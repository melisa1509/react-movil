import { SUCCESSFULL_AUTHENTICATION, FAILED_AUTHENTICATION, SUCCESSFULL_ACTIVE_USER, CLEAN_AUTHENTICATION} from "constants/actionTypes";

const initialState = { 

  loginError: false,
  active_user: {
    id:"",
    first_name: "",
    last_name: "",
    language: "en",
    roles: ["ROLE_ADMIN"]
  }
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESSFULL_AUTHENTICATION:
            return Object.assign({}, state, {
              token: action.payload.token, 
            });
        
        case FAILED_AUTHENTICATION:
            return Object.assign({}, state, {
              loginError: true
            });

        case CLEAN_AUTHENTICATION:
          return Object.assign({}, state, {
            loginError: false
          });

        case SUCCESSFULL_ACTIVE_USER:
            return Object.assign({}, state, {
              active_user: action.payload.data
            });
        
    }   
    return state;
}