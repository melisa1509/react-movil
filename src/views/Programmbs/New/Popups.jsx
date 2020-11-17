import React from "react";
import PropTypes from "prop-types";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

// core components
import { translate } from 'react-switch-lang';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import AdminHeader from "views/Header/AdminHeader.jsx";
import ShowRep from "./ShowRep.jsx";
import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import { hideRevisionAlert, redirectDashboard,  sendProject, sendPostEvaluation, activeTab } from "actions/programmbsActions.jsx";

const styles = {
    ...mainPageStyle,
    ...sweetAlertStyle
  };


class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSendProject = this.handleSendProject.bind(this);
  }
  
  hideAlert() {
    this.props.dispatchHideRevisionAlert();
  }
  redirectDashboard(){
    this.props.dispatchRedirectDashboard(this.props.history);
  }
  handleSendPostEvaluation(){
    this.props.dispatchSendPostEvaluation(this.props.history);
  }
  handleSendProject(){
    this.props.dispatchSendProject(this.props.history);
  }
  

  render() {
    const { classes, progressmbs, sendRevisionProjectSuccessfull, sendRevisionProjectError, editRevisionSuccessfull, editRevisionError, approveProjectError, approveProjectSuccessfull, t } = this.props;
    let state = progressmbs === undefined ? false : progressmbs.complete;
    return (
        <div>
            <AdminHeader/>
            {editRevisionSuccessfull ? 
              <SweetAlert
                  success
                  showCancel={state ? true : false}
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={state ? () => this.handleSendPostEvaluation() : () => this.hideAlert()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnText={ state ? t("button_send_revision") : t("button_continue")}
                  cancelBtnText={t("button_continue_editing")}
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  cancelBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.info
                  }
                  >                  
                  { state ?
                    <h4>{t("label_project_complete")}</h4>:
                    <h4>{t("label_save_success")}</h4>
                  }
              </SweetAlert>
            : ""}
            {editRevisionError ? 
              <SweetAlert
                  warning
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={() => this.hideAlert()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnText={t("button_continue")}
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  >
                  <h4>{t("label_save_error")}</h4>
              </SweetAlert>
            : ""}
            {sendRevisionProjectSuccessfull ? 
              <SweetAlert
                  success
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={() => this.handleSendPostEvaluation()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnText={t("label_send_for_revision")}
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  >
                  <h4>{t("label_save_success")}</h4>
              </SweetAlert>
            : ""}
            {sendRevisionProjectError ? 
              <SweetAlert
                  warning
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={() => this.hideAlert()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnText={t("button_continue")}
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  >
                  <h4>{t("label_save_error")}</h4>
              </SweetAlert>
            : ""}  
      </div>
    
    );
  }
}

Show.propTypes = {
  classes: PropTypes.object
};


const mapStateToProps = state => ({ 
  editRevisionError: state.programmbsReducer.editRevisionError,
  editRevisionSuccessfull: state.programmbsReducer.editRevisionSuccessfull,
  approveProjectError: state.programmbsReducer.approveProjectError,
  approveProjectSuccessfull: state.programmbsReducer.approveProjectSuccessfull,
  sendRevisionProjectError: state.programmbsReducer.sendRevisionProjectError,
  sendRevisionProjectSuccessfull: state.programmbsReducer.sendRevisionProjectSuccessfull,
  progressmbs: state.studentReducer.dashboard_student.progressMbs
    
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchHideRevisionAlert: () => dispatch( hideRevisionAlert() ),
  dispatchRedirectDashboard: param => dispatch( redirectDashboard(param) ),
  dispatchSendPostEvaluation: param => dispatch( sendPostEvaluation(param)),
  dispatchActiveTab: param => dispatch( activeTab(param)),
  dispatchSendProject: param => dispatch( sendProject(param))
});

const ShowComponent = translate(withStyles(styles)(Show));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowComponent));
