import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import Controls from './Controls.jsx';

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Primary from "components/Typography/Primary.jsx";

// core components
import { translate } from 'react-switch-lang';
import { loadFormProgramsa } from "actions/programsaActions.jsx";



const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};


class GraduateGroupsTab extends React.Component {

  
  render() {
    const { classes, programsa } = this.props;
    let { t } = this.props;
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_graduate_groups")}</h3>
            <br/>
            <form>
                <Field
                  labelText={t("question_graduated1")}
                  component={CustomInputRedux}
                  name="graduate1"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <br/>
                <Field
                  labelText={t("question_graduated2")}
                  component={CustomInputRedux}
                  name="graduate2"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <br/>
                <Field
                  labelText={t("question_graduated3")}
                  component={CustomInputRedux}
                  name="graduate3"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <br/>
                <Field
                  labelText={t("question_graduated4")}
                  component={CustomInputRedux}
                  name="graduate4"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
            </form>
            { programsa.revisiongraduate !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programsa.revisiongraduate}</p>                
              </div>
              :""
            }           
            <br/>           
            <Controls/>
          </CardBody>
        </Card>
    );
  }
}

GraduateGroupsTab = reduxForm({
  form: 'programsa',
  enableReinitialize: true,
})(GraduateGroupsTab);


GraduateGroupsTab = connect(
  state => ({
    initialValues: state.programsaReducer.data, 
    programsa: state.programsaReducer.programsa
  }),
  { load: loadFormProgramsa }, 
)(GraduateGroupsTab);


export default translate(withStyles(styles)(GraduateGroupsTab));

