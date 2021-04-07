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

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Muted from "components/Typography/Muted.jsx"
import { showGrantStatistic } from "actions/grantActions";


const styles = {
  cardIconTitle:{
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "10px"
  },
    ...dashboardStyle,
};


class GlobalStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  componentDidMount(){
    this.props.dispatchShowGrantStatistic();
  }

  
 
  render() {
    const { classes, show_grant_statistic } = this.props;
    let { t } = this.props;   
    
      
    
    return (
      <GridContainer>

        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={"/"} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>attach_money</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("link_total_amount")}</p>
                <br/>
                <Muted><h3>{show_grant_statistic.total_list.total_amount}</h3></Muted>
            </CardHeader>            
          </Card>
          </Link>
        </GridItem>

        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={"/"} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>recent_actors</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("link_applications")}</p>
                <br/>
                <Muted><h3>{show_grant_statistic.total_list.total_applications}</h3></Muted>
            </CardHeader>            
          </Card>
          </Link>
        </GridItem>

        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={"/group"} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon>groups</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("link_groups")}</p>
                <br/>
                <Muted><h3>{show_grant_statistic.total_list.total_groups}</h3></Muted>
            </CardHeader>            
          </Card>
          </Link>
        </GridItem>

        <GridItem xs={6} sm={6} md={3} lg={3}>
        <Link to={"/student"} className={classes.dropdownLink} >
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>school</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("link_participants")}</p>
                <br/>
                <Muted><h3>{show_grant_statistic.total_list.total_participants}</h3></Muted>
            </CardHeader>            
          </Card>
          </Link>
        </GridItem>

        
        
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      show_grant_statistic: state.grantReducer.show_grant_statistic,
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGrantStatistic: () => dispatch(showGrantStatistic()),
});

const GlobalStatisticComponent = translate(withStyles(styles)(GlobalStatistic));
export default connect(mapStateToProps, mapDispatchToPropsActions)(GlobalStatisticComponent);

