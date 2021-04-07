import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import IndexTable from './IndexTable.jsx';
import IndexTableApplication from './IndexTableApplications.jsx';

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import IndexTableApplications from "./IndexTableApplications.jsx";


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class IndexRep extends React.Component {
 

  render() {
    const { classes, styles, active_user } = this.props;
    let { t } = this.props;
    let rol=false
    if(active_user.roles == "ROLE_EMBASSADOR" || active_user.roles == "ROLE_STUDENT_EMBASSADOR"){
      rol=true
    }
    const login = "es";
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <br/><br/><br/><br/>
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_grant_list")}</h4>
            </CardHeader>
            <CardBody>
              <IndexTable  />
            </CardBody>
          </Card>
          <br/>
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_grant_applications")}</h4>
            </CardHeader>
            <CardBody>
              <IndexTableApplications />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

IndexRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({
});
const mapStateToProps = state => ({ 
  active_user: state.loginReducer.active_user, 
});

const NewRepComponent = translate(withStyles(styles)(IndexRep));
export default connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent);