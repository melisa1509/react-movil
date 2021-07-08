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
import { globalNumbers } from "actions/reportActions.jsx";

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


class DashboardAmbassador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount(){
    this.props.dispatchGlobalNumbers();
  }

  
 
  render() {
    const { classes, dashboard_ambassador, active_user } = this.props;
    let { t } = this.props;   
    console.log(dashboard_ambassador);     
    
      
    
    return (
      <GridContainer>
        <br/><br/>
        <GridItem xs={6} sm={6} md={3} lg={3}>
        <br/><br/>
        <Link to={"/group"} className={classes.dropdownLink} >
          <div>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon>group</Icon>
              </CardIcon>    
            </CardHeader>  
            <GridContainer>
              <GridItem>
                <CardHeader>
                  <Muted><h5>{t("link_groups") + " " + dashboard_ambassador.global_groups}</h5></Muted>
                  <br/>
                </CardHeader>
              </GridItem>
            </GridContainer>
          </div>
          </Link>
        </GridItem>

        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={"/student"} className={classes.dropdownLink} >
          <div>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>how_to_reg</Icon>
              </CardIcon>    
            </CardHeader>  
            <GridContainer>
              <GridItem>
                <CardHeader>
                  <Muted><h5>{t("link_participants") + " " + dashboard_ambassador.global_participants}</h5></Muted>
                  <br/>
                </CardHeader>
              </GridItem>
            </GridContainer>
          </div>
          </Link>
        </GridItem>

        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={"/certificate"} className={classes.dropdownLink} >
          <div>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>how_to_reg</Icon>
              </CardIcon>    
            </CardHeader>  
            <GridContainer>
              <GridItem>
                <CardHeader>
                  <Muted><h5>{t("link_certificates") + " " + dashboard_ambassador.global_certificates}</h5></Muted>
                  <br/>
                </CardHeader>
              </GridItem>
            </GridContainer>
          </div>
          </Link>
        </GridItem>

        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={"/"} className={classes.dropdownLink} >
          <div>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>how_to_reg</Icon>
              </CardIcon>    
            </CardHeader>  
            <GridContainer>
              <GridItem>
                <CardHeader>
                  <Muted><h5>{t("link_success_stories") + " " + dashboard_ambassador.global_stories}</h5></Muted>
                  <br/>
                </CardHeader>
              </GridItem>
            </GridContainer>
          </div>
          </Link>
        </GridItem>
        
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      dashboard_ambassador: state.reportReducer.global_numbers,
      active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowProgrammbs: key => dispatch(getShowProgrammbs(key)),
  dispatchGlobalNumbers: () => dispatch( globalNumbers() )
});

const DashboardAmbassadorComponent = translate(withStyles(styles)(DashboardAmbassador));
export default connect(mapStateToProps, mapDispatchToPropsActions)(DashboardAmbassadorComponent);

