import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { store } from "store";
import { Field, reduxForm } from 'redux-form';
import LanguageSelect from "views/Select/LanguageSelect.jsx";

import { load as loadAccount } from "actions/programmbsActions.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import CustomCheckboxRedux from 'components/CustomCheckbox/CustomCheckboxRedux.jsx';
import { translate } from 'react-switch-lang';


const data = {
    // used to populate "account" reducer when "Load" is clicked
    firstName: 'Jane',
    lastName: 'es',
    age: '42',
    sex: true,
    employed: true,
    favoriteColor: 'Blue',
    bio: 'Born to write amazing Redux code.',
    simpleSelect: "es"
  };
  const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
  
  let InitializeFromStateForm = props => {
    const { handleSubmit, load, pristine, reset, submitting, t } = props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <button type="button" onClick={() => load(data)}>Load Account</button>
        </div>
        <div>
          <label>First Name</label>
          <div>
            <Field
              labelText={t("label_revision_product")+ " *"}
              component={CustomInputRedux}
              name="firstName"
              success
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 5,
              }}
            />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Field
              name="simpleSelect"
              formName="programmbs"
              component={LanguageSelect}
            />
          </div>
        </div>
        <div>
          <label>Age</label>
          <div>
            <Field name="age" component="input" type="number" placeholder="Age" />
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field name="sex" component={CustomCheckboxRedux}  value="male" />
              {' '}
              Male
            </label>
            
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <Field name="favoriteColor" component="select">
              <option value="">Select a color...</option>
              {colors.map(colorOption => (
                <option value={colorOption} key={colorOption}>
                  {colorOption}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <div>
          <label htmlFor="employed">Employed</label>
          <div>
            <Field
              name="employed"
              id="employed"
              component="input"
              type="checkbox"
            />
          </div>
        </div>
        <div>
          <label>Bio</label>
          <div>
            <Field name="bio" component="textarea" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Undo Changes
          </button>
        </div>
      </form>
    );
  };
  
  // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
  InitializeFromStateForm = reduxForm({
    form: 'programmbs', // a unique identifier for this form
  })(InitializeFromStateForm);

 
  // You have to connect() to any reducers that you wish to connect to yourself
  InitializeFromStateForm = connect(
    state => ({
      initialValues: state.programmbsReducer.data, // pull initial values from account reducer
    }),
    { load: loadAccount }, // bind account loading action creator
  )(InitializeFromStateForm);

  
  export default  translate(InitializeFromStateForm);