import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import SuccessLabel from "components/Typography/SuccessLabel.jsx";
import FileUpload from "components/CustomUpload/FileUpload.jsx";
import SuccessBold from "components/Typography/SuccessBold.jsx";
import Quote from "components/Typography/Quote.jsx";
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




class HistoryTab extends React.Component {

  updateFileName = (key) => {
    this.props.change('history6', key);
  }

  render() {
    const { classes, programmbs, form_programmbs } = this.props;
    let { t } = this.props;
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_history")}</h3>
            <br/>
            <SuccessBold>
              {t("question_history1")}
            </SuccessBold>
            <br/>
            <form>
                <Field
                  component={CustomInputRedux}
                  name="history1"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 12,
                  }}
                />                
                <br/>
                <InputLabel className={classes.label}>
                    <SuccessLabel className={classes.label}>{t("question_history2")}</SuccessLabel>
                </InputLabel>
                <Field
                  component={FileUpload}
                  name="history2"
                  changeFileName = {this.updateFileName}
                  inputProps={{
                    type: "file",
                  }}
                />      
                <br/>       
                <Primary>{t("label_permission_personal_information")}</Primary>   
                <SuccessBold>{t("question_history3")}</SuccessBold>
                <br/>
                <Field
                    labelText={t("question_history4")}
                    component={CustomInputRedux}
                    name="history3"
                    success
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                  />             
            </form>         
            <br/>
            <Controls/>
            <ControlNavigation previous={"service"} next={"plan"} />
          </CardBody>
        </Card>
    );
  }
}

HistoryTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(HistoryTab);


HistoryTab = connect(
  state => ({
    initialValues: state.programmbsReducer.data, 
    form_programmbs: state.form.programmbs
  }),
  { load: loadFormProgrammbs }, 
)(HistoryTab);


export default translate(withStyles(styles)(HistoryTab));