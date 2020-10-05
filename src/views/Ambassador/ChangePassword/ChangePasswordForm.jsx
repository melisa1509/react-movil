import React from "react";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import SweetAlert from "react-bootstrap-sweetalert";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx'; 
import Danger from "components/Typography/Danger.jsx";
// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { verifyChange, compare } from "assets/validation/index.jsx";
import { editPassword } from "actions/ambassadorActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { dismatchPassword } from "actions/generalActions.jsx";

const style = {
    infoText: {
      fontWeight: "500",
      margin: "10px 0 30px",
      textAlign: "left"
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
    ...validationFormsStyle,
    ...sweetAlertStyle
};


class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ambassadorPasswordState:"",
            ambassadorPassword:"",
            ambassadorRepeatPasswordState:"",
            ambassadorRepeatPassword:"",
            key:"",
  
            // Select
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false
        };
        this.saveClick = this.saveClick.bind(this);
      }
      
      saveClick() {
        if (this.state.ambassadorPasswordState === "") {
          this.setState({ ambassadorPasswordState: "error" });
        }
        if (this.state.ambassadorRepeatPasswordState === "") {
          this.setState({ ambassadorRepeatPasswordState: "error" });
        }
        if(this.state.ambassadorPasswordState === "error" || this.state.ambassadorRepeatPasswordState === "error" ){
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.ambassadorPasswordState === "success" && this.state.ambassadorRepeatPasswordState === "success"){
          const params = {
            ambassadorPassword: this.state.ambassadorPassword,
            ambassadorRepeatPassword: this.state.ambassadorRepeatPassword,
            redirect: this.props.history,
          }
          if(compare(this.state.ambassadorPassword, this.state.ambassadorRepeatPassword)){
            this.props.dispatchEditPassword(params,this.props.match.params.id);
          }
          else {
            this.props.dispatchDismatchPassword()
          }
          this.props.dispatchSuccessRequiredFields();
        }
      }

      deleteClick(){
        this.props.dispatchDeleteSuccessful();
      }
    render() {
        const { errorRequired, successRequired, classes, successfull_edit, dismatch_password} = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={7}>
            <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { successfull_edit ?      
                      <SweetAlert
                        success
                        title={t("label_save_success")}
                        style={{ display: "block", marginTop: "-100px", close:true }}
                        onConfirm={() => this.deleteClick()}
                        confirmBtnCssClass={
                          this.props.classes.button + " " + this.props.classes.success
                        }
                        confirmBtnText={t("button_continue")}
                         >
                      </SweetAlert> 
                      : ""}
                  </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                     labelText={t("label_password")}
                     success={this.state.ambassadorPasswordState === "success"}
                     error={this.state.ambassadorPasswordState === "error"}
                     id="ambassadorPassword"
                     formControlProps={{
                         fullWidth: true,
                     }}
                     inputProps={{
                         onChange: event =>
                         verifyChange(event, "ambassadorPassword", "password", 0, null, this),
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
                        success={this.state.ambassadorRepeatPasswordState === "success"}
                        error={this.state.ambassadorRepeatPasswordState === "error"}
                        id="ambassadorRepeatPassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                          verifyChange(event,"ambassadorRepeatPassword","password",0, null, this),
                          type: "password",
                          autoComplete: "off"
                        }}
                      />
                  </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { errorRequired ? <Danger><h6 className={classes.infoText}>{t("label_require_fields")+ "*" }</h6></Danger>: ""}
                      { successRequired ? "" :  ""}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                      { dismatch_password ? <Danger><h6 className={classes.infoText}>{t("label_dismatch_password1")}</h6></Danger>: ""}
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
  edit_password: state.ambassadorReducer.edit_password,
  errorRequired:state.generalReducer.errorRequired,
  successRequired:state.generalReducer.successRequired,
  successfull_edit:state.generalReducer.successfull_edit,
  dismatch_password:state.generalReducer.dismatch_password
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchEditPassword: (params,key) => dispatch(editPassword(params,key)),
  dispatchErrorRequiredFields:() => dispatch(errorRequiredFields()),
  dispatchSuccessRequiredFields:() => dispatch(successRequiredFields()),
  dispatchDismatchPassword:() => dispatch(dismatchPassword()),
  dispatchDeleteSuccessful: () => dispatch(deleteSuccessful())
});

const ChangePasswordFormComponent = translate(withStyles(style)(ChangePasswordForm));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ChangePasswordFormComponent));

