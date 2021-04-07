import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import SweetAlert from "react-bootstrap-sweetalert";
import TextEditor from "components/TextEditor/TextEditor";
import CustomInputReduxMod from 'components/CustomInput/CustomInputReduxMod.jsx';
import FileUpload from "components/CustomUpload/FileUpload.jsx";
import Table from "components/Table/Table.jsx";
import SuccessBold from "components/Typography/SuccessBold.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent";
import Danger from "components/Typography/Danger.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { showGrant, showGrantAmbassador } from "actions/grantActions.jsx";
import { sendRevisionGrantAmbassador } from "actions/grantActions"; 
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { verifyChange } from "assets/validation/index.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { lastDayMonth } from "assets/functions/general.jsx";
import { BASE_URL } from 'constants/urlTypes';

// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import { withRouter } from 'react-router-dom';
import { editGrantAmbassador } from "actions/grantActions";

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
      color:"red",
      fontWeight: "500",
    },
    ...customSelectStyle,
    ...validationFormsStyle,
    ...sweetAlertStyle
};


class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleState: "success",
        };
        this.saveClick = this.saveClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.sendRevision = this.sendRevision.bind(this);
      }

     
      saveClick() {
          this.props.dispatchEditGrantAmbassador();
      }

      sendRevision() {
        this.props.dispatchDeleteSuccessful();
        this.props.dispatchSendRevisionGrantAmbassador();
      }

      deleteClick(){
        this.props.dispatchDeleteSuccessful();
      }

      componentDidMount() {
        this.props.loadShowGrant(this.props.match.params.id);
        this.props.loadShowGrantAmbassador(this.props.match.params.ambassador);
      }

      updateFileName = (key) => {
        this.props.change('file', key);
      }

      updateFileName2 = (key) => {
        this.props.change('file2', key);
      }
      
    render() {
        const { classes, successfull_edit, editError, errorRequired, show_grant, active_user, successful_send, show_grant_ambassador } = this.props;
        let { t } = this.props;
       
        return (
          <GridContainer justify="center">
            <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <center><h3 >{t("title_grant_overview")}</h3></center>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={11}>
                   
                          {show_grant_ambassador.state === "state.revision" ? <center><Danger><h5 className={classes.infoText}>{t("label_grant_success_revision")}</h5></Danger></center>: ""}
                          {show_grant_ambassador.state === "state.approved" ? <center><Danger><h5 className={classes.infoText}>{t("label_grant_application_approved")}</h5></Danger></center>: ""}
                          {show_grant_ambassador.state === "state.reject" ? <center><Danger><h5 className={classes.infoText}>{t("label_sent_reject_successful")}</h5></Danger></center>: ""}
                          {show_grant_ambassador.state === "state.correction" ? <center><Danger><h5 className={classes.infoText}>{t("state_correction")}</h5></Danger></center>: ""}
                          {show_grant_ambassador.state === "state.correction" ? <div>{show_grant_ambassador.correction}</div>: ""}
                          {show_grant_ambassador.state === "state.reject" ? <div>{show_grant_ambassador.correction}</div>: ""}
                          {show_grant_ambassador.state === "state.approved" ? <div>{show_grant_ambassador.correction}</div>: ""}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={11}>
                    <br/>
                    <Table
                      striped
                      tableData={[
                        [<th>{t("label_administrator")}</th>,show_grant.administrator.first_name+ " "+ show_grant.administrator.last_name,],
                        [<th>{t("label_deadline_applications")}</th>, lastDayMonth(show_grant.created_at)],
                        [<th>{t("label_language")}</th>, t(show_grant.language)],
                        
                      ]}
                    />
                    <Table
                      striped={false}
                      tableData={[
                        [<div dangerouslySetInnerHTML={{ __html: show_grant.description }}></div>],
                      ]}
                    />
                  <br/>
                  </GridItem>
            </GridContainer>
            <br/>
            <center><h3 >{t("title_grant_application")}</h3></center>
            <GridItem xs={12} sm={12} md={11}>
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
                          showCancel
                          style={{ display: "block", marginTop: "-100px" }}
                          onConfirm={() => this.sendRevision()}
                          onCancel={() => this.deleteClick()}
                          confirmBtnText={t("button_send_revision")}
                          cancelBtnText={t("button_continue")}
                          confirmBtnCssClass={
                              this.props.classes.button + " " + this.props.classes.warning
                          }
                          cancelBtnCssClass={
                              this.props.classes.button + " " + this.props.classes.success
                          }
                        >
                          <h4>{t("label_save_success")}</h4>
                        </SweetAlert> 
                      : ""}
                      {successful_send ? 
                          <SweetAlert
                            success                            
                            style={{ display: "block", marginTop: "-100px" }}
                            onConfirm={() => this.deleteClick()}
                            confirmBtnText={t("button_continue")}
                            confirmBtnCssClass={
                              this.props.classes.button + " " + this.props.classes.success
                            }
                          >
                          <h4>{t("label_grant_success_revision")}</h4>
                          </SweetAlert>
                      : ""}
                  </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={4}>
                    <Field
                      labelText={t("label_success_ambassador_code")+ " *"}
                      component={CustomInputReduxMod}
                      name="code"
                      success
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
                    <InputLabel
                        htmlFor="question1"
                    >
                        <SuccessBold>{t("question_grant1")}</SuccessBold>
                    </InputLabel>
                    <br/>
                  <Field
                      name="question1"
                      component={TextEditor}
                      height={500}
                      width={900}
                      lang={active_user.language}
                    />
                </GridItem>
              </GridContainer>
              <br/>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel
                        htmlFor="question2"
                    >
                        <SuccessBold>{t("question_grant2")}</SuccessBold>
                    </InputLabel>
                    <br/>
                  <Field
                      name="question2"
                      component={TextEditor}
                      height={500}
                      width={900}
                      lang={active_user.language}
                    />
                </GridItem>
              </GridContainer>
              <br/>
              <center><h5 className={classes.cardTitleCenter} >{t("question_grant")}</h5></center>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={4}>
                    <Field
                      labelText={t("question_grant3")}
                      component={CustomInputReduxMod}
                      name="number"
                      success
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={11}>
                    <Field
                      labelText={t("question_grant4")}
                      component={CustomInputReduxMod}
                      name="question4"
                      success
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 7,
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={11}>
                    <Field
                      labelText={t("question_grant5")}
                      component={CustomInputReduxMod}
                      name="question5"
                      success
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 7,
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={4}>
                  <h6 className={classes.cardTitleCenter} >{t("question_grant6")}</h6>
                    <Field
                      component={CustomInputReduxMod}
                      name="question6"
                      success
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>              
              <br/>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <SuccessBold>
                      {t("label_grant_file")}
                    </SuccessBold>
                    <br/>
                    {
                      show_grant_ambassador.file !== "undefined" ?
                      <a
                        href={BASE_URL +  "/web/file/"  + show_grant_ambassador.file}
                        target="_blank"
                      >
                          {t("label_download_file")}
                      </a>:
                      ""
                    }    
                    <br/>            
                    <Field
                      component={FileUpload}
                      name="file"
                      changeFileName = {this.updateFileName}
                      inputProps={{
                        type: "file",
                      }}
                    /> 
                  </GridItem>
              </GridContainer>
              <br/>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <SuccessBold>
                      {t("label_grant_file2")}
                    </SuccessBold>
                    <br/>
                    {
                      show_grant_ambassador.file2 !== "undefined" ?
                      <a
                        href={BASE_URL +  "/web/file/"  + show_grant_ambassador.file2}
                        target="_blank"
                      >
                          {t("label_download_file")}
                      </a>:
                      ""
                    }    
                    <br/>               
                    <Field
                      component={FileUpload}
                      name="file2"
                      changeFileName = {this.updateFileName2}
                      inputProps={{
                        type: "file",
                      }}
                    /> 
                  </GridItem>
              </GridContainer>                        
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { errorRequired ? <Danger><h6 className={classes.infoText}>{t("label_require_fields")}</h6></Danger>: ""}
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.center}>
                      <Link to={"/grant/ambassador"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Button color="info" size="sm" onClick={this.saveClick.bind(this)}>
                      {t("button_save")}
                      </Button>
                      {" "}
                  </div>
                  </GridItem>
              </GridContainer>
              
              </form>
            </GridItem>
          </GridContainer>
                
        );
    }
}

EditForm = reduxForm({
  form: 'grantAmbassadorform', 
  enableReinitialize: true
})(EditForm);


EditForm = connect(
  state => ({
    initialValues: state.grantReducer.data_grant_ambassador,
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    successfull_edit:state.generalReducer.successfull_edit,
    show_grant: state.grantReducer.show_grant,
    active_user: state.loginReducer.active_user,
    successful_send:state.generalReducer.successful_send,
    show_grant_ambassador: state.grantReducer.show_grant_ambassador
  }),
  { dispatchSendRevisionGrantAmbassador: sendRevisionGrantAmbassador, loadShowGrant: showGrant, loadShowGrantAmbassador: showGrantAmbassador, dispatchEditGrantAmbassador: editGrantAmbassador, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful},
)(EditForm);

export default  withRouter(translate(withStyles(style)(EditForm)));



