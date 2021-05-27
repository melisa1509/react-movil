import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import Table from "components/Table/Table.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import Danger from "components/Typography/Danger.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx'; 
import { showStudent } from "actions/studentActions.jsx";
import { newStudent } from "actions/registerActions.jsx"; 
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { showDate } from "assets/functions/general.jsx";
import { verifyChange } from "assets/validation/index.jsx";
import LanguageSelect from "views/Select/LanguageSelect.jsx";
import CountrySelect from "views/Select/CountrySelect.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import { withRouter } from 'react-router-dom';

const style = {
    infoText: {
      fontWeight: "500",
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
    label:{
      color:"red"
    },
    ...customSelectStyle,
    ...validationFormsStyle,
    ...sweetAlertStyle
};


class NewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameState: "",
            first_nameState: "",
            last_nameState: "",
            cityState: "",
            whatsappState: "",
            password: ""
        };
        this.saveClick = this.saveClick.bind(this);
        this.deleteClick= this.deleteClick.bind(this);
      }

      deleteClick(){
        this.props.dispatchDeleteSuccessful();
      }
     
      saveClick() {
        if (this.state.usernameState === "") {
          this.setState({ usernameState: "error" });
        }
        if (this.state.first_nameState === "") {
          this.setState({ first_nameState: "error" });
        }
        if (this.state.last_nameState === "") {
          this.setState({ last_nameState: "error" });
        }
        if (this.state.cityState === "") {
          this.setState({ cityState: "error" });
        }
        if (this.state.whatsappState === "") {
          this.setState({ whatsappState: "error" });
        }
        if (this.state.passowordState === "") {
          this.setState({ passwordState: "error" });
        }
        if(this.state.passowordState === "error" || this.state.whatsappState === "error" || this.state.usernameState === "error" || this.state.first_nameState === "error" || this.state.last_nameState === "error"){
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.passowordState === "success" || this.state.whatsappState === "success" || this.state.usernameState === "success" && this.state.first_nameState === "success"&& this.state.last_nameState === "success"){
          this.props.dispatchNewStudent(this.props.history);
          this.props.dispatchSuccessRequiredFields();
        }
      }

      

    render() {
        const { classes, editError, errorRequired, successRequired, new_student, error_new_user} = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <form>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { editError ?     
                      <SnackbarContent
                      message={
                          <center>{t("label_update_error")}</center>
                        }
                        close
                        color="danger"
                      />
                      : ""}
                  </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { error_new_user ?      
                        <SweetAlert
                          style={{ display: "block", marginTop: "-100px", close:true }}
                          onConfirm={() => this.deleteClick()}
                          confirmBtnCssClass={
                              this.props.classes.button + " " + this.props.classes.success
                          }
                          confirmBtnText={t("button_continue")}
                          >
                          <h6>{t("label_user_alredy_exist")}</h6>
                          
                            <Table
                              striped
                              tableData={[
                                [<th>{t("label_date")}</th>,showDate(new_student.created_at)],
                                [<th>{t("label_embassador_mentor")}</th>, new_student.studentgroup.group.embassador.first_name+ " "+ new_student.studentgroup.group.embassador.last_name],
                                [<th>{t("label_group")}</th>,new_student.studentgroup.group.name],                              
                              ]}
                            />
                        </SweetAlert> 
                      : ""}
                  </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
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
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_password")+ " *"}
                      component={CustomInputRedux}
                      name="password"
                      success={this.state.passwordState === "success"}
                      error={this.state.passwordState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "password", "length", 0, null, this),
                        type: "password",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_name")+ " *"}
                      component={CustomInputRedux}
                      name="first_name"
                      success={this.state.first_nameState === "success"}
                      error={this.state.first_nameState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "first_name", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_lastName")+ " *"}
                      component={CustomInputRedux}
                      name="last_name"
                      success={this.state.last_nameState === "success"}
                      error={this.state.last_nameState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "last_name", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={6}>
                    <Field
                      name="language"
                      formName="programmbs"
                      component={LanguageSelect}
                    />
                  </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={7}>
                    <Field
                      name="country"
                      formName="programmbs"
                      component={CountrySelect}
                    />
                  </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={9}>
                    <Field
                      labelText={t("label_city")+ " *"}
                      component={CustomInputRedux}
                      name="city"
                      success={this.state.cityState === "success"}
                      error={this.state.cityState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "city", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_whatsapp")+ " *"}
                      component={CustomInputRedux}
                      name="whatsapp"
                      success={this.state.whatsappState === "success"}
                      error={this.state.whatsappState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "whatsapp", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                    <Field
                      component={CustomInputRedux}
                      name="id_group"
                      inputProps={{
                        type: "hidden",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { errorRequired ? <Danger><h6 className={classes.infoText}>{t("label_require_fields")+ "*" }</h6></Danger>: ""}
                      { successRequired ? "" :  ""}
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/register"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      </Link>                     
                      {" "}
                      <Button color="info" size="sm" onClick={this.saveClick}>
                      {t("button_send")}
                      </Button>
                      {" "}
                      </center>
                  </GridItem>
              </GridContainer>
              </form>
            </GridItem>
          </GridContainer>
                
        );
    }
}

NewForm = reduxForm({
  form: 'registerform', 
  enableReinitialize: true,
})(NewForm);


NewForm = connect(
  state => ({
    new_student: state.registerReducer.new_student, 
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    editError: state.studentReducer.editError,
    successfull_edit:state.generalReducer.successfull_edit,
    error_new_user: state.generalReducer.error_new_user
  }),
  { loadShowStudent: showStudent, dispatchNewStudent: newStudent, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful},
)(NewForm);

export default  withRouter(translate(withStyles(style)(NewForm)));



