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




class PromotionTab extends React.Component {

  updateFileName = (key) => {
    this.props.change('promotion5', key);
  }

  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    return (
        <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_promotion")}</h3>
            <br/>
            <form>
                <Field
                  labelText={t("question_promotion1")}
                  component={CustomInputRedux}
                  name="promotion1"
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
                  labelText={t("question_promotion2")}
                  component={CustomInputRedux}
                  name="promotion2"
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
                  labelText={t("question_promotion3")}
                  component={CustomInputRedux}
                  name="promotion3"
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
                  labelText={t("question_promotion4")}
                  component={CustomInputRedux}
                  name="promotion4"
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
                  programmbs.promotion5 !== undefined ?
                  <a
                    href={BASE_URL +  "/web/file/"  + programmbs.promotion5}
                    target="_blank"
                  >
                      {t("label_download_file")}
                  </a>:
                  ""
                }                
                <br/>
                <InputLabel className={classes.label}>
                    <SuccessLabel className={classes.label}>{t("question_promotion5")}</SuccessLabel>
                </InputLabel>
                <Field
                  component={FileUpload}
                  name="promotion5"
                  changeFileName = {this.updateFileName}
                  inputProps={{
                    type: "file",
                  }}
                />                
                <br/>               
            </form>
            { programmbs.revisionpromotion !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programmbs.revisionpromotion}</p>                
              </div>
              :""
            }         
            <br/>
            <Controls/>
            <ControlNavigation previous={"price"} next={"paperwork"} />
        </CardBody>
    );
  }
}

PromotionTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(PromotionTab);


PromotionTab = connect(
  state => ({
    initialValues: state.programmbsReducer.data,
    programmbs: state.programmbsReducer.programmbs 
  }),
  { load: loadFormProgrammbs }, 
)(PromotionTab);


export default translate(withStyles(styles)(PromotionTab));