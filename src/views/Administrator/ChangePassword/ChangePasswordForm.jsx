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
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx'; 
import Danger from "components/Typography/Danger.jsx";
// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { verifyChange, compare } from "assets/validation/index.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { editPassword } from "actions/administratorActions.jsx";
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
            adminPasswordState:"",
            adminPassword:"",
            adminRepeatPasswordState:"",
            adminRepeatPassword:"",
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
        if (this.state.adminPasswordState === "") {
          this.setState({ adminPasswordState: "error" });
        }
        if (this.state.adminRepeatPasswordState === "") {
          this.setState({ adminRepeatPasswordState: "error" });
        }
        if(this.state.adminPasswordState === "error" || this.state.adminRepeatPasswordState === "error" ){
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.adminPasswordState === "success" && this.state.adminRepeatPasswordState === "success"){
          const params = {
            adminPassword: this.state.adminPassword,
            adminRepeatPassword: this.state.adminRepeatPassword,
            redirect: this.props.history,
          }
          if(compare(this.state.adminPassword, this.state.adminRepeatPassword)){
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
                       style={{ display: "block", marginTop: "-100px", close:true }}
                       onConfirm={() => this.deleteClick()}
                       confirmBtnCssClass={
                           this.props.classes.button + " " + this.props.classes.success
                       }
                       confirmBtnText={t("button_continue")}
                       >
                       <h4>{t("label_save_success")}</h4>
                    </SweetAlert> 
                      : ""}
                  </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                     labelText={t("label_password")}
                     success={this.state.adminPasswordState === "success"}
                     error={this.state.adminPasswordState === "error"}
                     id="adminPassword"
                     formControlProps={{
                         fullWidth: true,
                     }}
                     inputProps={{
                         onChange: event =>
                         verifyChange(event, "adminPassword", "password", 0, null, this),
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
                        success={this.state.adminRepeatPasswordState === "success"}
                        error={this.state.adminRepeatPasswordState === "error"}
                        id="adminRepeatPassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                          verifyChange(event,"adminRepeatPassword","password",0, null, this),
                          type: "password",
                          autoComplete: "off"
                        }}
                      />
                  </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { errorRequired ? <Danger><h6 className={classes.infoText}>{t("label.require_fields")+ "*" }</h6></Danger>: ""}
                      { successRequired ? "" :  ""}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                      { dismatch_password ? <Danger><h6 className={classes.infoText}>{t("label.dismatch_password1")}</h6></Danger>: ""}
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
  edit_password: state.administratorReducer.edit_password,
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

