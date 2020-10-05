import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { getAmbassadorList } from "actions/ambassadorActions.jsx";

import { translate } from 'react-switch-lang';
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import { getShowProgrammbs } from "actions/programmbsActions.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Muted from "components/Typography/Muted.jsx"


const styles = {
  cardIconTitle:{
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "10px"
  },
    ...dashboardStyle,
};


class IndexTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  
 
  render() {
    const { classes, dashboard_student, active_user } = this.props;
    let { t } = this.props;        
    
      
    
    return (
      <GridContainer>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/plan" : "/programmbs/edit/plan/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>account_balance</Icon>
              </CardIcon>
                <p className={classes.cardCategory}><Muted><h5>{t("title_plan") + " " + dashboard_student.progressMbs.plan}</h5></Muted></p>
                <br/>
            </CardHeader>            
          </div>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/product" : "/programmbs/edit/product/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>domain</Icon>
              </CardIcon>
              <p className={classes.cardCategory}><Muted><h5>{t("title_product") + " " + dashboard_student.progressMbs.product}</h5></Muted></p>
              <br/>              
            </CardHeader>             
          </div>
          </Link>
        </GridItem>
        <br/><br/>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/process" : "/programmbs/edit/process/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>timeline</Icon>
              </CardIcon>
                <p className={classes.cardCategory}><Muted><h5>{t("title_process") + " " + dashboard_student.progressMbs.process}</h5></Muted></p>
                <br/>                
            </CardHeader>            
          </div>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/price" : "/programmbs/edit/price/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>monetization_on</Icon>
              </CardIcon>
              <p className={classes.cardCategory}><Muted><h5>{t("title_price") + " " + dashboard_student.progressMbs.price}</h5></Muted></p>
              <br/>              
            </CardHeader>           
          </div>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/promotion" : "/programmbs/edit/promotion/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>record_voice_over</Icon>
              </CardIcon>
                <p className={classes.cardCategory}><Muted><h5>{t("title_promotion") + " " + dashboard_student.progressMbs.promotion}</h5></Muted></p>
                <br/>                
            </CardHeader>            
          </div>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/paperwork" : "/programmbs/edit/paperwork/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>file_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}><Muted><h5>{t("title_paperwork") + " " + dashboard_student.progressMbs.paperwork}</h5></Muted></p>
              <br/>              
            </CardHeader>             
          </div>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/quality" : "/programmbs/edit/quality/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>accessibility_new</Icon>
              </CardIcon>
                <p className={classes.cardCategory}><Muted><h5>{t("title_quality_life") + " " + dashboard_student.progressMbs.quality}</h5></Muted></p>
                <br/>
            </CardHeader>            
          </div>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={active_user.evaluation === undefined ? "/student/preevaluation" : (dashboard_student.progressMbs.state === "new" ? "/programmbs/new/service" : "/programmbs/edit/service/" + dashboard_student.progressMbs.id)} className={classes.dropdownLink} >
          <div>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>pan_tool</Icon>
              </CardIcon>
              <p className={classes.cardCategory}><Muted><h5>{t("title_service") + " " + dashboard_student.progressMbs.service}</h5></Muted></p>
              <br/>              
            </CardHeader>           
          </div>
          </Link>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      dashboard_student: state.studentReducer.dashboard_student,
      active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowProgrammbs: key => dispatch(getShowProgrammbs(key))
});

const IndexTableComponent = translate(withStyles(styles)(IndexTable));
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent);

