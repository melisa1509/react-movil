import { GROUP_LIST } from "constants/actionTypes";
import { SHOW_GROUP } from "constants/actionTypes";
import { LOAD_FORM_GROUP } from "constants/actionTypes";
import { EDIT_GROUP, NEW_GROUP, DELETE_GROUP, GROUP_PROGRAM } from "constants/actionTypes";
import { UPLOAD_IMAGE } from "constants/actionTypes";
import { GET_PROJECT_PROGRESS } from "constants/actionTypes";
import { MBS_IMAGE_ALERT , DELETE_IMAGE_ALERT} from "constants/actionTypes";
import { adjustDate } from "assets/functions/general.jsx";

const initialState = { 
  show_group: {
    id:"",
    embassador:[],
    name:"",
    data:[],
    first_name:"",
    last_name:"",
    start_date:"",
    final_date:"",
    number_students:"",
    madality:"",
    program:""
  },
  new_group:{
    id:""
  },
  group_list: [],
  group_program: [],
  progress_list:{
    progressMbs:[" "],
    progressSa:[" "]
  },
  loading: true,
  image_alert:false
}

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
      case GROUP_LIST:
        return Object.assign({}, state, {
          group_list: action.payload,
          loading: false
        });
      case GROUP_PROGRAM:
        return Object.assign({}, state, {
          group_program: action.payload,
          loading: false
        });
      case SHOW_GROUP:
        return Object.assign({}, state, {
          show_group: action.payload
        });
      case LOAD_FORM_GROUP:
        const group = action.data;
        if(group.number_students_graduated !== undefined){
          group.number_students_graduated = group.number_students_graduated.toString();
        }
        else{
          group.number_students_graduated = "1";
        }
        group.start_date = adjustDate(group.start_date);
        group.final_date = adjustDate(group.final_date);
        group.graduation_date = adjustDate(group.graduation_date);
        
        return Object.assign({}, state, {
          data: group
        });
      case EDIT_GROUP:
          return Object.assign({}, state, {
            edit_group: action.payload
          }); 
      case NEW_GROUP:
          return Object.assign({}, state, {
            new_group: action.payload
          }); 
      case DELETE_GROUP:
          return Object.assign({}, state, {
            delete_group: action.payload
          });
      case GET_PROJECT_PROGRESS:
        return Object.assign({}, state, {
          progress_list: action.payload,
          loading: false,
        }); 
      case MBS_IMAGE_ALERT:
        return Object.assign({}, state, {
          id_student: action.payload,
          image_alert:true,
        }); 
      case UPLOAD_IMAGE:
        return Object.assign({}, state, {
          upload_image: action.payload,
        });  
      case DELETE_IMAGE_ALERT:
        return Object.assign({}, state, {
          image_alert: false,
        });    
  }
    return state;
}