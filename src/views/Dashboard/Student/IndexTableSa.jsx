import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { getAmbassadorList } from "actions/ambassadorActions.jsx";
import { dashboardStudent } from "actions/studentActions.jsx";
import { translate } from 'react-switch-lang';
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

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


class IndexTableSa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    const { classes, dashboard_student } = this.props;
    let { t } = this.props;         
    
    return (
      <GridContainer>
        <GridItem xs={6} sm={6} md={6} lg={6}>
        <Link to={dashboard_student.progressSa.state === "new" ? "/programsa/new" : "/programsa/edit/mision/" + dashboard_student.progressSa.id} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>account_balance</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("title_mision")}</p>
                <br/>
                <Muted><h3>{dashboard_student.progressSa.mision}</h3></Muted>
            </CardHeader>            
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={6} lg={6}>
        <Link to={dashboard_student.progressSa.state === "new" ? "/programsa/new" : "/programsa/edit/generate/" + dashboard_student.progressSa.id} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>supervised_user_circle</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{t("title_generate_groups")}</p>
              <Muted><h3>{dashboard_student.progressSa.generate}</h3></Muted>
            </CardHeader>             
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={6} lg={6}>
        <Link to={dashboard_student.progressSa.state === "new" ? "/programsa/new" : "/programsa/edit/facilitate/" + dashboard_student.progressSa.id} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>list_alt</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("title_rules")}</p>
                <Muted><h3>{dashboard_student.progressSa.facilitate}</h3></Muted>
            </CardHeader>            
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={6} lg={6}>
        <Link to={dashboard_student.progressSa.state === "new" ? "/programsa/new" : "/programsa/edit/graduate/" + dashboard_student.progressSa.id} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>school</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{t("title_graduate_groups")}</p>
              <Muted><h3>{dashboard_student.progressSa.graduate}</h3></Muted>
            </CardHeader>           
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={6} lg={6}>
        <Link to={dashboard_student.progressSa.state === "new" ? "/programsa/new" : "/programsa/edit/support/" + dashboard_student.progressSa.id} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>airplay</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("title_support_groups")}</p>
                <Muted><h3>{dashboard_student.progressSa.support}</h3></Muted>
            </CardHeader>            
          </Card>
          </Link>
        </GridItem>        
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      dashboard_student: state.studentReducer.dashboard_student
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchDashboardStudent: () => dispatch( dashboardStudent() ),  
});

const IndexTableSaComponent = translate(withStyles(styles)(IndexTableSa));
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableSaComponent);

