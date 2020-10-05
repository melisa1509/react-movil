import React from "react";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx'; 

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { verifyChange, compare } from "assets/validation/index.jsx";
import { editPassword } from "actions/userActions.jsx";
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { dismatchPassword } from "actions/generalActions.jsx";

const style = {
    infoText: {
      fontWeight: "300",
      margin: "10px 0 30px",
      textAlign: "center"
    },
    inputAdornmentIcon: {
      color: "#555"
    },
    choiche: {
      textAlign: "center",
      cursor: "pointer",
      marginTop: "20px"
    },
    ...customSelectStyle,
    ...validationFormsStyle
};


class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            userPasswordState:"",
            userPassword:"",
            userRepeatPasswordState:"",
            userRepeatPassword:"",
  
            // Select
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false
        };
        this.saveClick = this.saveClick.bind(this);
      }
     
      saveClick() {
        if (this.state.userPasswordState === "") {
          this.setState({ userPasswordState: "error" });
        }
        if (this.state.userRepeatPasswordState === "") {
          this.setState({ userRepeatPasswordState: "error" });
        }
        if(this.state.userPasswordState === "error" || this.state.userRepeatPasswordState === "error" ){
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.userPasswordState === "success" && this.state.userRepeatPasswordState === "success"){
          const params = {
            userPassword: this.state.userPassword,
            userRepeatPassword: this.state.userRepeatPassword,
            redirect: this.props.history,
          }
          if(compare(this.state.userPassword, this.state.userRepeatPassword)){
            this.props.dispatchEditPassword(params,this.props.match.params.id);
          }
          else {
            this.props.dispatchDismatchPassword()
          }
          this.props.dispatchSuccessRequiredFields();
        }
      }

    render() {
        const { classes } = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={7}>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                     labelText={t("label_password")}
                     success={this.state.userPasswordState === "success"}
                     error={this.state.userPasswordState === "error"}
                     id="userPassword"
                     formControlProps={{
                         fullWidth: true,
                     }}
                     inputProps={{
                         onChange: event =>
                         verifyChange(event, "userPassword", "password", 0, null, this),
                         type: "password",
                         autoComplete: "off",
                     }}
                    />
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText={t("label_repeat_password")}
                        success={this.state.userRepeatPasswordState === "success"}
                        error={this.state.userRepeatPasswordState === "error"}
                        id="userRepeatPassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                          verifyChange(event,"userRepeatPassword","password","userPassword", null, this),
                          type: "password",
                          autoComplete: "off"
                        }}
                      />
                  </GridItem>
              </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={8}>
                      <center>
                      <Button color="info" size="md" onClick={this.saveClick}>
                      {t("button_save")}
                      </Button>
                      </center>
                  </GridItem>
                </GridContainer>
            </GridItem>
          </GridContainer>
                
        );
    }
}

const mapStateToProps = state => ({ 
  edit_password: state.userReducer.edit_password,
  errorRequired:state.generalReducer.errorRequired,
  successRequired:state.generalReducer.successRequired,
  successfull_edit:state.generalReducer.successfull_edit,
  dismatch_password:state.generalReducer.dismatch_password
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchEditPassword: (params, key) => dispatch(editPassword(params, key)),
  dispatchErrorRequiredFields:() => dispatch(errorRequiredFields()),
  dispatchSuccessRequiredFields:() => dispatch(successRequiredFields()),
  dispatchDismatchPassword:() => dispatch(dismatchPassword())
});

const ChangePasswordFormComponent = translate(withStyles(style)(ChangePasswordForm));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ChangePasswordFormComponent));

