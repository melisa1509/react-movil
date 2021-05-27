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
import { showDate, monthDate } from "assets/functions/general.jsx";
import MutedBold from "components/Typography/MutedBold.jsx";
import InfoBold from "components/Typography/InfoBold.jsx";

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


class ShowStartupForm extends React.Component {
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
                        [<th>{t("label_date")}</th>, monthDate(show_grant_ambassador.created_at)],
                        [<th>{t("label_language")}</th>, t(show_grant.language)],
                        [<th>{t("label_ambassador")}</th>, show_grant_ambassador.ambassador.first_name + " " + show_grant_ambassador.ambassador.last_name],
                        [<th>{t("label_country")}</th>, t(show_grant_ambassador.ambassador.country)],
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
                </GridItem>
              </GridContainer>
              <center><InfoBold><h4 className={classes.cardTitleCenter} >{t("label_grant_history")}</h4></InfoBold></center>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <SuccessBold>
                      {t("question_startup_grant3")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question3}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant4")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question4}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant5")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question5}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant7")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question7}
                    </MutedText>
                    <br/>
                    <center><InfoBold><h4 className={classes.cardTitleCenter} >{t("label_grant_present_need")}</h4></InfoBold></center>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant12")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {t(show_grant_ambassador.question12)}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant8")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question8}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant9")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question9}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant10")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question10}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant11")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question11}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant13")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question13}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_amount")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question6}
                    </MutedText>
                    <br/>
                    <SuccessBold>
                      {t("question_startup_grant14")}
                    </SuccessBold>
                    <br/>
                    <MutedText>
                      {show_grant_ambassador.question14}
                    </MutedText>
                    <br/><br/><br/>
                    <InfoBold>
                      {t("label_grant_startup_attach")}
                    </InfoBold>
                    <br/>
                      <MutedBold>{t("label_grant_startup_includes")}</MutedBold>
                    <br/>
                    <br/>
                    <SuccessBold>
                      {t("label_grant_startup_file3")}
                    </SuccessBold>
                    <br/>
                    {
                      show_grant_ambassador.file3 !== "undefined" && show_grant_ambassador.file3 !== undefined ?
                      <a
                        href={BASE_URL +  "/web/file/"  + show_grant_ambassador.file3}
                        target="_blank"
                      >
                          {t("label_download_file")}
                      </a>:
                      ""
                    }
                    <br/><br/>
                    <SuccessBold>
                      {t("label_grant_startup_file4")}
                    </SuccessBold>
                    <br/>
                    {
                      show_grant_ambassador.file4 !== "undefined" && show_grant_ambassador.file4 !== undefined ?
                      <a
                        href={BASE_URL +  "/web/file/"  + show_grant_ambassador.file4}
                        target="_blank"
                      >
                          {t("label_download_file")}
                      </a>:
                      ""
                    }
                    <br/><br/>
                    <SuccessBold>
                      {t("label_grant_startup_file5")}
                    </SuccessBold>
                    <br/>
                    {
                      show_grant_ambassador.file5 !== "undefined" && show_grant_ambassador.file5 !== undefined ?
                      <a
                        href={BASE_URL +  "/web/file/"  + show_grant_ambassador.file5}
                        target="_blank"
                      >
                          {t("label_download_file")}
                      </a>:
                      ""
                    }
                    <br/><br/>
                    <SuccessBold>
                      {t("label_grant_startup_file6")}
                    </SuccessBold>
                    <br/>
                    {
                      show_grant_ambassador.file6 !== "undefined" && show_grant_ambassador.file6 !== undefined ?
                      <a
                        href={BASE_URL +  "/web/file/"  + show_grant_ambassador.file6}
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
                 <MutedBold>{t("label_grant_startup_plan")}</MutedBold>
              <br/><br/><br/>
              <center><InfoBold><h4 className={classes.cardTitleCenter} >{t("label_grant_future_impact")}</h4></InfoBold></center>
              <br/>
              <SuccessBold>
                {t("question_startup_number")}
              </SuccessBold>
              <br/>
              <MutedText>
                {show_grant_ambassador.number}
              </MutedText>
              <br/>
              <SuccessBold>
                {t("question_startup_grant15")}
              </SuccessBold>
              <br/>
              <MutedText>
                {show_grant_ambassador.question15}
              </MutedText>
              <br/><br/>
                <SuccessBold>
                    {t("label_grant_file_startup")}
                </SuccessBold>
                <br/>
                {
                    show_grant_ambassador.file !== "undefined" && show_grant_ambassador.file !== undefined ?
                    <a
                    href={BASE_URL +  "/web/file/"  + show_grant_ambassador.file}
                    target="_blank"
                    >
                        {t("label_download_file")}
                    </a>:
                    ""
                }

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

ShowStartupForm = reduxForm({
  form: 'grantAmbassadorform', 
  enableReinitialize: true
})(ShowStartupForm);


ShowStartupForm = connect(
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
)(ShowStartupForm);

export default  withRouter(translate(withStyles(style)(ShowStartupForm)));



