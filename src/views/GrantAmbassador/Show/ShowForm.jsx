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
import MutedText from "components/Typography/Muted.jsx";

import { showGrant, showGrantAmbassador } from "actions/grantActions.jsx";
import { sendCorrectionGrantAmbassador, sendApprovedGrantAmbassador, sendRejectGrantAmbassador } from "actions/grantActions"; 
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { showDate } from "assets/functions/general.jsx";

// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import { withRouter } from 'react-router-dom';
import { editGrantAmbassador } from "actions/grantActions";
import { BASE_URL } from 'constants/urlTypes';

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


class ShowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleState: "success",
            message: "label_save_success"
        };
        this.sendCorrection = this.sendCorrection.bind(this);
        this.sendReject = this.sendReject.bind(this);
        this.sendApproved = this.sendApproved.bind(this);
        this.deleteClick= this.deleteClick.bind(this);
      }

     
      sendCorrection() {
          this.setState({ message: "label_sent_correction_successful"});
          this.props.dispatchSendCorrectionGrantAmbassador();
          
      }

      sendApproved() {
          this.setState({ message: "label_sent_approved_successful"});
          this.props.dispatchSendApprovedGrantAmbassador();
      }

      sendReject(){
         this.setState({ message: "label_sent_reject_successful"});
         this.props.dispatchSendRejectGrantAmbassador();
      }

      componentDidMount() {
        this.props.loadShowGrant(this.props.match.params.id);
        this.props.loadShowGrantAmbassador(this.props.match.params.ambassador);
      }

     
      deleteClick(){
        this.props.dispatchDeleteSuccessful();
      }
      
    render() {
        const { classes, successfull_edit, editError, errorRequired, show_grant, grant_deadline, show_grant_ambassador } = this.props;
        console.log(classes);
        let { t } = this.props;
        
        return (
          <GridContainer justify="center">
            <GridContainer justify="center">
                <center><h3 >{t("title_grant_overview")}</h3></center>
                  <GridItem xs={12} sm={12} md={11}>
                    <Table
                      striped
                      tableData={[
                        [<th>{t("label_administrator")}</th>,show_grant.administrator.first_name+ " "+ show_grant.administrator.last_name,],
                        [<th>{t("label_deadline_applications")}</th>, showDate(grant_deadline)],
                        [<th>{t("label_language")}</th>, t(show_grant.language)],
                        [<th>{t("label_ambassador")}</th>, show_grant_ambassador.ambassador.first_name + " " + show_grant_ambassador.ambassador.last_name],
                        [<th>{t("question_grant6")}</th>, t(show_grant_ambassador.question6)],
                        
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
                          style={{ display: "block", marginTop: "-100px" }}
                          onConfirm={() => this.deleteClick()}
                          confirmBtnText={t("button_continue")}
                          confirmBtnCssClass={
                              this.props.classes.button + " " + this.props.classes.success
                          }
                         
                        >
                          <h4>{t(this.state.message)}</h4>
                        </SweetAlert> 
                      : ""}
                  </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                  <SuccessBold>
                    {t("label_success_ambassador_code")}
                  </SuccessBold>
                  <br/>
                  <MutedText>
                    {show_grant_ambassador.code}
                  </MutedText>
                  <br/>
                  <SuccessBold>
                    {t("question_grant1")}
                  </SuccessBold>
                  <br/>
                    <div dangerouslySetInnerHTML={{ __html: show_grant_ambassador.question1 }}></div>
                  <br/>
                  <SuccessBold>
                    {t("question_grant2")}
                  </SuccessBold>
                  <br/>
                    <div dangerouslySetInnerHTML={{ __html: show_grant_ambassador.question2 }}></div>
                </GridItem>
              </GridContainer>
              <center><h5 className={classes.cardTitleCenter} >{t("question_grant")}</h5></center>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <SuccessBold>
                      {t("question_grant3")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.number}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_grant4")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question4}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_grant5")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question5}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_grant6")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question6}
                    </MutedText>
                    <br/>
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
                    <br/><br/>
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
                </GridItem>
              </GridContainer>
              <br/>
              <center><h5 className={classes.cardTitleCenter} >{t("label_admin_coments")}</h5></center>
              <GridContainer >
                <GridItem xs={12} sm={12} md={4}>
                    <Field
                      labelText={t("label_total_amount_approved")}
                      component={CustomInputReduxMod}
                      name="amount"
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
                      labelText={t("label_grant_corrections")}
                      component={CustomInputReduxMod}
                      name="correction"
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
              
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.center}>
                      <Link to={"/dashboard"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Button color="warning" size="sm" onClick={this.sendCorrection}>
                      {t("button_send_correction")}
                      </Button>
                      {" "}
                      <Button color="danger" size="sm" onClick={this.sendReject}>
                      {t("button_reject")}
                      </Button>
                      {" "}
                      <Button color="success" size="sm" onClick={this.sendApproved}>
                      {t("button_grant_approved")}
                      </Button>
                      {" "}
                      <Button
                        size="sm"
                        color="info"
                        href={ BASE_URL + "/file/grantapplication/" + show_grant_ambassador.id}
                        target="_blank"
                      >
                        {t('button_download_pdf')}
                      </Button>
                  </div>
                  </GridItem>
              </GridContainer>
              
              </form>
            </GridItem>
          </GridContainer>
                
        );
    }
}

ShowForm = reduxForm({
  form: 'grantAmbassadorform', 
  enableReinitialize: true
})(ShowForm);


ShowForm = connect(
  state => ({
    initialValues: state.grantReducer.data_grant_ambassador,
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    successfull_edit:state.generalReducer.successfull_edit,
    show_grant: state.grantReducer.show_grant,
    show_grant_ambassador: state.grantReducer.show_grant_ambassador,
    active_user: state.loginReducer.active_user,
    grant_deadline: state.grantReducer.grant_deadline
  }),
  { dispatchSendRejectGrantAmbassador: sendRejectGrantAmbassador, dispatchSendApprovedGrantAmbassador: sendApprovedGrantAmbassador, dispatchSendCorrectionGrantAmbassador: sendCorrectionGrantAmbassador, loadShowGrant: showGrant, loadShowGrantAmbassador: showGrantAmbassador, dispatchShowGrantAmbassador: editGrantAmbassador, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful},
)(ShowForm);

export default  withRouter(translate(withStyles(style)(ShowForm)));



