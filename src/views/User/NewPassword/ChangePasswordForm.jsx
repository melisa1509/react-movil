import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { store } from "store";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Info from "components/Typography/Info.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx'; 
import { newPassword } from "actions/userActions.jsx";
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { verifyChange } from "assets/validation/index.jsx";
import SweetAlert from "react-bootstrap-sweetalert";

// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import { withRouter } from 'react-router-dom';

const style = {
    infoText: {
      fontWeight: "500",
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
    label:{
      color:"red"
    },
    ...customSelectStyle,
    ...validationFormsStyle,
    ...sweetAlertStyle
};


class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          usernameState: ""
        };
        this.saveClick = this.saveClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
      }
      handleSimple = event => {
          this.setState({ [event.target.name]: event.target.value });
       };
      handleChange = name => event => {
          this.setState({ [name]: event.target.checked });
        };
      
      saveClick() {
        if (this.state.usernameState === "") {
          this.setState({ usernameState: "error" });
        }
        if(this.state.usernameState === "error"){
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.usernameState === "success" ){
        this.props.dispatchNewPassword();
        this.props.dispatchSuccessRequiredFields();
        }
      }


      deleteClick(){
        this.props.dispatchDeleteSuccessful();
      }
       
      
      
    render() {
        const { classes, successfull_edit,errorRequired, successRequired, errorGmail, correctGmail} = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <form>
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
              <GridContainer justify="center" >
                  <GridItem xs={12} sm={12} md={8}>
                    <Field
                      labelText={t("label_username")+ " *"}
                      component={CustomInputRedux}
                      name="username"
                      success={this.state.usernameState === "success"}
                      error={this.state.usernameState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "username", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  { errorRequired ? <Danger><h6 className={classes.infoText}>{t("label_require_fields")+ "*" }</h6></Danger>: ""}
                  { successRequired ? "" :  ""}
                  { errorGmail? <Danger><h6 className={classes.infoText}>{t("label_username_does_not_exist")}</h6></Danger>: ""}
                  { correctGmail? <Info><h6 className={classes.infoText}>{t("label_check_your_email")}</h6></Info>: ""}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <center>
                  <Link to={"/login"}>
                      <Button color="default" size="sm">
                      {t("button_return")}
                      </Button>
                      {" "}
                  </Link>{" "}
                  <Button color="success" size="sm" onClick={this.saveClick}>
                  {t("button_send")}
                  </Button>
                  </center>
                </GridItem>
              </GridContainer>
              </form>
            </GridItem>
          </GridContainer>
                
        );
    }
}

ChangePasswordForm = reduxForm({
  form: 'passwordform', 
  enableReinitialize: true,
})(ChangePasswordForm);


ChangePasswordForm = connect(
  state => ({
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    new_password:state.userReducer.new_password,
    errorGmail: state.userReducer.errorGmail,
    correctGmail: state.userReducer.correctGmail,
  }),
  { dispatchNewPassword: newPassword, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful},
)(ChangePasswordForm);

export default  withRouter(translate(withStyles(style)(ChangePasswordForm)));



