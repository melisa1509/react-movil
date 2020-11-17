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
import ShowTable from 'views/Group/Show/ShowTable.jsx';
import ShowAmbassador from 'views/Group/Show/ShowAmbassador.jsx';

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class ShowRep extends React.Component { 

  render() {
    const { classes, styles, active_user } = this.props;
    let rol=false
    if(active_user.roles == "ROLE_EMBASSADOR" || active_user.roles == "ROLE_STUDENT_EMBASSADOR"){
      rol=true
    }
    let { t } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
          <Card>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_show_group")}</h4>
             </center>
            </CardHeader>
            <CardBody>
              {rol ? <ShowAmbassador  /> : <ShowTable  /> }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ShowRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);
const mapStateToProps = state => ({ 
  active_user: state.loginReducer.active_user, 
});

const mapDispatchToPropsActions = dispatch => ({
});


const ShowRepComponent = translate(withStyles(styles)(ShowRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowRepComponent));