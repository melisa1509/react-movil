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
import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import { hideRevisionAlert, redirectDashboard, sendProject } from "actions/programmbsActions.jsx";

const styles = {
    ...mainPageStyle,
    ...sweetAlertStyle
  };


class Popups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    
  }
  
  hideAlert() {
    this.props.dispatchHideRevisionAlert();
  }
  redirectDashboard(){
    this.props.dispatchRedirectDashboard(this.props.history);
  }
  handleSendProject(){
    this.props.dispatchSendProject(this.props.history);
  }
  render() {
    const { classes, progressmbs, sendRevisionProjectSuccessfull, sendRevisionProjectError, editRevisionSuccessfull, editRevisionError, approveProjectError, approveProjectSuccessfull, t } = this.props;
    let state = progressmbs === undefined ? false : progressmbs.complete;
    return (
        <>
            <AdminHeader/>
            {editRevisionSuccessfull ? 
              <SweetAlert
                  success
                  showCancel={state ? true : false}
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={state ? () => this.handleSendProject() : () => this.hideAlert()}
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
                    <h4>{t("label_save_success_revision")}</h4>
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
                  onConfirm={() => this.handleSendProject()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnText={t("button_send_revision")}
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  >
                  <h4>{t("label_save_success_revision")}</h4>
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
            {approveProjectSuccessfull ? 
              <SweetAlert
                  success
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={() => this.redirectDashboard()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnText={t("button_continue")}
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  >
                  <h4>{t("label_success_approved")}</h4>
              </SweetAlert>
            : ""}
            {approveProjectError ? 
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
            
        
      </>
    
    );
  }
}

Popups.propTypes = {
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
  dispatchSendProject: param => dispatch( sendProject(param)),
});

const PopupsComponent = translate(withStyles(styles)(Popups));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(PopupsComponent));
