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


class PriceTab extends React.Component {

  
  render() {
    const { classes, active_user } = this.props;
    let { t } = this.props;
    return (
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_price")}</h3>
            <br/>
            <form>
                <Field
                  labelText={t("question_price1")}
                  component={CustomInputRedux}
                  name="price1"
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
                  labelText={active_user.studentgroup.group.program === "option.program1" ? t("question_price2") : t("question_price2_junior")}
                  component={CustomInputRedux}
                  name="price2"
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
                  labelText={t("question_price3")}
                  component={CustomInputRedux}
                  name="price3"
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
                  labelText={t("question_price4")}
                  component={CustomInputRedux}
                  name="price4"
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
            </form>         
            <br/>
            <Controls/>
            <ControlNavigation previous={"process"} next={"promotion"} />
          </CardBody>
    );
  }
}

PriceTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(PriceTab);


PriceTab = connect(
  state => ({
    active_user: state.loginReducer.active_user
  }),
  { load: loadFormProgrammbs }, 
)(PriceTab);


export default translate(withStyles(styles)(PriceTab));