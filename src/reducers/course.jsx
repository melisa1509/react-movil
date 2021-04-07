import {SUCCESSFULL_NEW_COURSE,COURSE_LIST} from "constants/actionTypes";

const initialState = { 
  course_list: [],
  loading:true 
}

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESSFULL_NEW_COURSE:
            return Object.assign({}, state, {
              new_course: action.payload
            });

        case COURSE_LIST:
            return Object.assign({}, state, {
              course_list: action.payload,
              loading: false
            });
    }
    return state;
}