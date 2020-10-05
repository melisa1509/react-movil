import React from "react";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

import { loadFormProgrammbs } from "actions/programmbsActions.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import { translate } from 'react-switch-lang';



  let RevisionForm = props => {
    const { handleSubmit, load, t, name, labelText } = props;
    return (
      <form onSubmit={handleSubmit}>
            <Field
              labelText={labelText}
              component={CustomInputRedux}
              name={name}
              success
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 5,
              }}
            />
      </form>
    );
  };
  
  // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
  RevisionForm = reduxForm({
    form: 'programmbs',
    enableReinitialize: true,
  })(RevisionForm);

 
  RevisionForm = connect(
    state => ({
      initialValues: state.programmbsReducer.data, 
    }),
    { load: loadFormProgrammbs }, 
  )(RevisionForm);

  
  export default  translate(RevisionForm);