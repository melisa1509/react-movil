import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Danger from "components/Typography/Danger.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import IndexTable from './IndexTable.jsx';
import IndexTableSa from './IndexTableSa.jsx';


import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import { dashboardStudent } from "actions/studentActions.jsx";


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class IndexRep extends React.Component {
 
  componentDidMount() {
    this.props.dispatchDashboardStudent();    
  }

  render() {
    const { classes, active_user, dashboard_student } = this.props;
    let { t } = this.props;
    const login = "es";
    return (
      <div>
          <br/><br/><br/><br/><br/>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_progress_dashboard")}</h4>
            </CardHeader>
            <CardBody>
                <center><h3 className={classes.cardTitleCenter} >{t("title_program_mbs")}</h3></center>
                {dashboard_student.progressMbs.submitted === "state.revision" ? <center><Danger><h5 className={classes.infoText}>{t("label_success_revision")}</h5></Danger></center>: ""}
                {dashboard_student.progressMbs.submitted === "state.approved" ? <center><Danger><h5 className={classes.infoText}>{t("message_approved_project")}</h5></Danger></center>: ""}
                <p>{t("label_program_mbs_starting")}</p>
                <br/>
                <IndexTable  />      
            </CardBody>
        <br/>
        {
          dashboard_student.progressSa.student_ambassador === true ? 
            <>
              <CardHeader color="success">
                  <h4 className={classes.cardTitle}>{t("title_progress_dashboard")}</h4>
              </CardHeader>
              <CardBody>
                  <center><h3 className={classes.cardTitleCenter} >{t("title_program_sa")}</h3></center>
                  {dashboard_student.progressSa.submitted === "state.revision" ? <center><Danger><h5 className={classes.infoText}>{t("label_success_revision")}</h5></Danger></center>: ""}
                  <p>{t("label_program_sa_starting")}</p>
                  <br/>
                  {active_user.roles.includes("ROLE_STUDENT_EMBASSADOR") ? <IndexTableSa  /> : <center><Danger><h5 className={classes.infoText}>{t("label_restricted_access")}</h5></Danger></center>}     
              </CardBody>
            </>          
          :""
        }        
      </div>
    );
  }
}

IndexRep.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  dashboard_student: state.studentReducer.dashboard_student,
  active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchDashboardStudent: () => dispatch( dashboardStudent() ) 
});

const IndexRepComponent = translate(withStyles(styles)(IndexRep));
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexRepComponent);