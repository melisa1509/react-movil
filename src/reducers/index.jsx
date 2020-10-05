import { combineReducers } from 'redux';
import { appReducer } from 'reducers/app.jsx';
import { loginReducer } from 'reducers/login.jsx';
import { studentReducer } from 'reducers/student.jsx';
import { programmbsReducer } from 'reducers/programmbs.jsx';
import { programsaReducer } from 'reducers/programsa.jsx';
import { userReducer } from 'reducers/user.jsx';
import { generalReducer } from 'reducers/general.jsx';
import { selectReducer } from 'reducers/select.jsx';
import { groupReducer } from 'reducers/group.jsx';
import { ambassadorReducer } from 'reducers/ambassador.jsx';
import { certificateReducer } from 'reducers/certificate.jsx';
import { dashboardReducer } from 'reducers/dashboard.jsx';
import { reportReducer } from 'reducers/report.jsx';
import { codeReducer } from 'reducers/code.jsx';
import { administratorReducer } from 'reducers/administrator.jsx';
import { evaluationReducer } from 'reducers/evaluation.jsx';
import { registerReducer } from 'reducers/register.jsx';
import { reducer as reduxFormReducer } from 'redux-form';
import { LOGOUT_USER } from 'constants/actionTypes';

const manageReducer =  combineReducers({
    appReducer, 
    loginReducer,
    studentReducer,
    programmbsReducer,
    programsaReducer,
    userReducer,
    selectReducer,
    generalReducer,
    groupReducer,
    ambassadorReducer,
    certificateReducer,
    dashboardReducer,
    reportReducer,
    codeReducer,
    administratorReducer,
    evaluationReducer,
    registerReducer,
    form: reduxFormReducer,
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_USER) {        
        state = undefined
    }
    return manageReducer(state, action)
} 

export default rootReducer;