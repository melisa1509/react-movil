import React from "react";
import PropTypes from "prop-types";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
import { getShowProgrammbs } from "actions/programmbsActions.jsx";

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

import { hideRevisionAlert, redirectDashboard, sendPostEvaluation } from "actions/programmbsActions.jsx";

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
    this.handleSendPostEvaluation = this.handleSendPostEvaluation.bind(this);
  }
  
  hideAlert() {
    this.props.dispatchHideRevisionAlert();
  }
  redirectDashboard(){
    this.props.dispatchRedirectDashboard(this.props.history);
  }

  componentWillMount() {
    this.props.dispatchShowProgrammbs(this.props.match.params.id);
  }

  handleSendPostEvaluation(){
    this.props.dispatchSendPostEvaluation(this.props.history);
  }
  render() {
    const { classes, sendRevisionProjectSuccessfull, sendRevisionProjectError, editRevisionSuccessfull, editRevisionError, approveProjectError, approveProjectSuccessfull, t } = this.props;
    return (
        <div>
            {editRevisionSuccessfull ? 
              <SweetAlert
                  success
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={() => this.hideAlert()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnText={t("button_continue")}
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  >
                  <h4>{t("label_save_success")}</h4>
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
                confirmBtnText={t("lable_sent_for_revision")}
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
            
        <div
          className={classes.main}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundColor: "#fff"
          }}
        >
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <ShowRep />
              </GridItem>
            </GridContainer>
        </div>
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
  sendRevisionProjectSuccessfull: state.programmbsReducer.sendRevisionProjectSuccessfull
    
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchHideRevisionAlert: () => dispatch( hideRevisionAlert() ),
  dispatchRedirectDashboard: param => dispatch( redirectDashboard(param) ),
  dispatchShowProgrammbs: key => dispatch(getShowProgrammbs(key)), 
  dispatchSendPostEvaluation: param => dispatch( sendPostEvaluation(param)),
});

const ShowComponent = translate(withStyles(styles)(Show));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowComponent));
