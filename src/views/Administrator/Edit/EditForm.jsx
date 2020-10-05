import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { store } from "store";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckboxRedux.jsx';
import Danger from "components/Typography/Danger.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx'; 
import { showAdministrator } from "actions/administratorActions.jsx";
import { editAdministrator } from "actions/administratorActions.jsx"; 
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { verifyChange } from "assets/validation/index.jsx";
import LanguageSelect from "views/Select/LanguageSelect.jsx";
import CountrySelect from "views/Select/CountrySelect.jsx";
import RoleSelect from "views/Select/RoleSelect.jsx";
import SweetAlert from "react-bootstrap-sweetalert";

// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
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


class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          usernameState: "success",
          first_nameState: "success",
          last_nameState: "success",
        };
        this.saveClick = this.saveClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
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
        
        if(this.state.usernameState === "error" || this.state.first_nameState === "error" || this.state.last_nameState === "error"){
          const stateRedux = store.getState();
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.usernameState === "success" && this.state.first_nameState === "success" && this.state.last_nameState ==="success" ){
        const reduxState = store.getState();
        this.props.dispatchEditAdministrator();
        this.props.dispatchSuccessRequiredFields();
        }
      }

      deleteClick(){
        this.props.dispatchDeleteSuccessful();
      }
     
      componentDidMount() {
        this.props.loadShowAdministrator(this.props.match.params.id);
      }
      
    render() {
        const { classes, successfull_edit, editError, errorRequired, successRequired, show_administrator, data } = this.props;
        let { t } = this.props;
        const languages = {         
          options:[
            { label: t("label_english"),    val: "language_grader[en]"  },
            { label: t("label_spanish"),    val: "language_grader[es]"  },
            { label: t("label_french"),     val: "language_grader[fr]"  },
            { label: t("label_portuguese") , val: "language_grader[pr]"  },
          ]
        }
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
                      labelText={t("label_firstname")+ " *"}
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
                      labelText={t("label_lastname")+ " *"}
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
                      component={CountrySelect}
                      name="country"
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                    <Field
                      component={LanguageSelect}
                      name="language"
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                    <Field
                      component={RoleSelect}
                      name="roles"
                    />
                </GridItem>
              </GridContainer>
              <br/>
              <SuccessBold>
                  {t("label_language_grader")}
              </SuccessBold>
              <div>      
                  {
                      languages.options.map((prop, key) => {
                          return (
                            <Field
                              component={CustomCheckbox}
                              name={prop.val}
                              label={prop.label}                             
                            />
                            );
                      })
                  }
              </div>
              <br/>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { errorRequired ? <Danger><h6 className={classes.infoText}>{t("label_require_fields")+ "*" }</h6></Danger>: ""}
                      { successRequired ? "" :  ""}
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/admin"}>
                      <Button color="default" size="sm" onClick={this.deleteClick}>
                      {t("button_return_to_list")}
                      </Button>
                      </Link>
                      {" "}
                      <Link to={"/admin/editpassword/" +  show_administrator.id}>
                      <Button color="warning" size="sm" onClick={this.deleteClick}>
                      {t("button_change_password")}
                      </Button>
                      </Link>
                      {" "}
                      <Button color="info" size="sm" onClick={this.saveClick}>
                      {t("button_save")}
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

EditForm = reduxForm({
  form: 'adminform', 
  enableReinitialize: true,
})(EditForm);


EditForm = connect(
  state => ({
    initialValues: state.administratorReducer.show_administrator,
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    edit_administrator: state.administratorReducer.edit_administrator,
    editError: state.administratorReducer.editError,
    successfull_edit:state.generalReducer.successfull_edit,
    show_administrator: state.administratorReducer.show_administrator,
    data: state.administratorReducer.data,
  }),
  { loadShowAdministrator: showAdministrator, dispatchEditAdministrator: editAdministrator, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful},
)(EditForm);

export default  withRouter(translate(withStyles(style)(EditForm)));



