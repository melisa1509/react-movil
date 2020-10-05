import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import DateRange from "@material-ui/icons/DateRange";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Muted from "components/Typography/Muted.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';
import { getReports } from "actions/reportActions.jsx";
import { globalNumbers } from "actions/reportActions.jsx";

import IndexTable from './IndexTable.jsx';
import IndexAmbassadorTable from './IndexAmbassadorTable.jsx';
import CountryTable from "./CountryTable.jsx";
import CountryJrTable from "./CountryJrTable.jsx";
import AmbassadorTable from "./AmbassadorTable.jsx";
import AmbaJRTable from "./AmbaJRTable.jsx";
import AmbaJRTableReports from "./AmbaJRTableReports.jsx";
import GlobalTable from "./GlobalTable.jsx";
import AmbassadorTableReports from "./AmbassadorTableReports.jsx";


const styles = {
  cardIconTitle:{
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "10px"
  },
    ...dashboardStyle,
};

class IndexRep extends React.Component {

  componentDidMount(){
    this.props.dispatchGlobalNumbers();
}
  render() {
    const { classes, report_list, active_user, global_numbers } = this.props;
    let { t } = this.props;
    let rol=false
    if(active_user.roles == "ROLE_EMBASSADOR"){
      rol=true
    }
    const initialValuesReport= {
      country:"label_all_country",
    }
    return (
      <div>
      <br/><br/><br/><br/>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>supervisor_account</Icon>
              </CardIcon>
                <p className={classes.cardCategory}>{t("label_student_graduated_mbs")}</p>
                <Muted><h3>{global_numbers.global_mbs}</h3></Muted>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {global_numbers.date_range}
              </div>
            </CardFooter> 
          </Card>
          <br/>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>person_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{t("label_student_graduated_sa")}</p>
              <Muted><h3>{global_numbers.global_sa}</h3></Muted>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {global_numbers.date_range}
              </div>
            </CardFooter>  
          </Card>
          <br/>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{t("label_student_graduated_jr")}</p>
              <Muted><h3>{global_numbers.global_mbs_junior}</h3></Muted>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {global_numbers.date_range}
              </div>
            </CardFooter>  
          </Card>       
          <br/>
          <Card>
            <CardHeader icon >
              <CardIcon color="success">
                <Icon>language</Icon>
              </CardIcon>
              <Muted>
                <h4>{t("title_global_certificates_by_countries")}</h4>
              </Muted>
            </CardHeader>
            <CardBody>
              <GlobalTable/>
            </CardBody>
          </Card>
          <br/>
          <Card>
            <CardHeader icon >
              <CardIcon color="info">
                <Icon>dns</Icon>
              </CardIcon>
              <Muted>
                {rol ? <h4>{t("title_number_people_improvement")}</h4> :<h4>{t("title_number_people_improvement") + " " + t( "title_by_country") + " "+ "MBS Students"}</h4> }
              </Muted>
            </CardHeader>
            <CardBody>
                {rol ? <AmbassadorTableReports/> : <CountryTable initialValues={initialValuesReport}/> }     
            </CardBody>
          </Card>
          <br/>
          {rol? " " :
          <Card>
            <CardHeader icon >
              <CardIcon color="warning">
                <Icon>rss_feed</Icon>
              </CardIcon>
              <Muted>
                <h4>{t("title_number_people_improvement") + " " + t( "title_by_ambassador")}</h4>
              </Muted>
            </CardHeader>
            <CardBody>
                <AmbassadorTable/>      
            </CardBody>
          </Card>
          }          
          <br/>
          <Card>
            <CardHeader icon >
              <CardIcon color="success">
                <Icon>dns</Icon>
              </CardIcon>
              <Muted>
                {rol ? <h4>{t("title_number_people_improvement")}</h4> :<h4>{t("title_number_people_improvement") + " " + t( "title_by_country")+" "+ "MBS Junior Students"}</h4> }
              </Muted>
            </CardHeader>
            <CardBody>
                {rol ? <AmbaJRTableReports/> : <CountryJrTable initialValues={initialValuesReport}/> }     
            </CardBody>
          </Card>
          <br/>
          {rol? " " :
          <Card>
            <CardHeader icon >
              <CardIcon color="warning">
                <Icon>rss_feed</Icon>
              </CardIcon>
              <Muted>
                <h4>{t("title_number_people_improvement") + " " + t( "title_by_ambassador")}</h4>
              </Muted>
            </CardHeader>
            <CardBody>
                <AmbaJRTable/>      
            </CardBody>
          </Card>
          }
          <br/>
          <Card>
            <CardHeader icon >
              <CardIcon color="rose">
              <Icon>equalizer</Icon>
              </CardIcon>
              <Muted>
                <h4>{rol ? t("title_evaluation_statistics"): t("title_evaluation_statistics") + " " + t( "title_by_student")}</h4>
              </Muted>
            </CardHeader>
            <CardBody>
              {rol ? <IndexAmbassadorTable/>: <IndexTable  />  }        
            </CardBody>
          </Card>
      </div>
    );
 }
}

IndexRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapStateToProps = state => ({ 
  report_list: state.reportReducer.report_list,
  active_user: state.loginReducer.active_user,
  global_numbers: state.reportReducer.global_numbers,

});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetReports: () => dispatch( getReports() ),
  dispatchGlobalNumbers: () => dispatch( globalNumbers() )
});


const NewRepComponent = translate(withStyles(styles)(IndexRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent));