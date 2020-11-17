import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { BASE_URL } from 'constants/urlTypes';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import SuccessLabel from "components/Typography/SuccessLabel.jsx";
import FileUpload from "components/CustomUpload/FileUpload.jsx";
import Primary from "components/Typography/Primary.jsx";

// core components
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';

import { translate } from 'react-switch-lang';
import { loadFormProgrammbs } from "actions/programmbsActions.jsx";


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};




class ServiceTab extends React.Component {

  updateFileName = (key) => {
    this.props.change('service6', key);
  }

  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    return (
        <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_service")}</h3>
            <br/>
            <form>
                <Field
                  labelText={t("question_service1")}
                  component={CustomInputRedux}
                  name="service1"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <Field
                  labelText={t("question_service2")}
                  component={CustomInputRedux}
                  name="service2"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <Field
                  labelText={t("question_service3")}
                  component={CustomInputRedux}
                  name="service3"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <Field
                  labelText={t("question_service4")}
                  component={CustomInputRedux}
                  name="service4"
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
                  labelText={t("question_service5")}
                  component={CustomInputRedux}
                  name="service5"
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
                {
                  programmbs.service6 !== undefined ?
                  <a
                    href={BASE_URL +  "/web/file/"  + programmbs.service6}
                    target="_blank"
                  >
                      {t("label_download_file")}
                  </a>:
                  ""
                } 
                <br/>
                <InputLabel className={classes.label}>
                    <SuccessLabel className={classes.label}>{t("question_service6")}</SuccessLabel>
                </InputLabel>
                <Field
                  component={FileUpload}
                  name="service6"
                  changeFileName = {this.updateFileName}
                  inputProps={{
                    type: "file",
                  }}
                />                
                <br/>               
            </form>
            { programmbs.revisionservice !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programmbs.revisionservice}</p>                
              </div>
              :""
            }         
            <br/>
            <Controls/>
            <ControlNavigation previous={"quality"} next={"history"} />
        </CardBody>
    );
  }
}

ServiceTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(ServiceTab);


ServiceTab = connect(
  state => ({
    initialValues: state.programmbsReducer.data,
    programmbs: state.programmbsReducer.programmbs 
  }),
  { load: loadFormProgrammbs }, 
)(ServiceTab);


export default translate(withStyles(styles)(ServiceTab));