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
import SnackbarContent from "components/Snackbar/SnackbarContent";
import Danger from "components/Typography/Danger.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx'; 
import SweetAlert from "react-bootstrap-sweetalert";

import { showCode } from "actions/codeActions.jsx";
import { editCode} from "actions/codeActions.jsx"; 
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { verifyChange } from "assets/validation/index.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { withRouter } from 'react-router-dom';

// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";


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
            countrySatate: "success",
            codeState: "success",
            programState: "success",
            numberState: "success",
        };
        this.saveClick = this.saveClick.bind(this);
      }
     
      saveClick() {
        if (this.state.countryState === "") {
          this.setState({ countryState: "error" });
        }
        if (this.state.codeState === "") {
          this.setState({ codeState: "error" });
        }
        if (this.state.programState === "") {
          this.setState({ programState: "error" });
        }
        if (this.state.numberState === "") {
          this.setState({ numberState: "error" });
        }

        if(this.state.numberState === "error"){
          const stateRedux = store.getState();
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.numberState === "success"){
          const reduxState = store.getState();
          this.props.dispatchEditCode();
          this.props.dispatchSuccessRequiredFields();
        }
      }
     
      componentDidMount() {
        this.props.loadShowCode(this.props.match.params.id);
      }

      deleteClick(){
        this.props.dispatchDeleteSuccessful();
      }
      
    render() {
        const { classes, successfull_edit, editError, errorRequired, successRequired } = this.props;
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
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_country")+ " *"}
                      component={CustomInputRedux}
                      name="name"
                      success={this.state.countryState === "success"}
                      error={this.state.countryState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "country", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_code")+ " *"}
                      component={CustomInputRedux}
                      name="country"
                      success={this.state.codeState === "success"}
                      error={this.state.codeState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "code", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_program")+ " *"}
                      component={CustomInputRedux}
                      name="program"
                      success={this.state.programState === "success"}
                      error={this.state.programState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "program", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_number")+ " *"}
                      component={CustomInputRedux}
                      name="number"
                      success={this.state.numberState === "success"}
                      error={this.state.numberState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "number", "length", 0, null, this),
                        type: "text",
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
                      <Link to={"/code"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
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
  form: 'codeform', 
  enableReinitialize: true,
})(EditForm);


EditForm = connect(
  state => ({
    initialValues: state.codeReducer.data,
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    edit_code: state.codeReducer.edit_code,
    editError: state.codeReducer.editError,
    successfull_edit:state.generalReducer.successfull_edit,
    show_code: state.codeReducer.show_code,
  }),
  { loadShowCode: showCode, dispatchEditCode: editCode, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful},
)(EditForm);

export default  withRouter(translate(withStyles(style)(EditForm)));



