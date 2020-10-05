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
import Logo from "assets/img/logo_interweave.png";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "0px"
  } 
};


class IndexRep extends React.Component {
 

  render() {
    const { classes, styles, active_user } = this.props;
    let { t } = this.props;
    const login = "es";
    return (
      <div>
          <br/>
            <GridContainer justify="center">
              <GridItem>
                <img src={Logo} height="100px" alt="..." />
              </GridItem>
            </GridContainer>
            <br/>
            <CardHeader color="info">
                <center><h4 className={classes.cardTitle}>{t("title_students_register")}</h4></center>
                <center>{t("title_register_explanation")}</center>
            </CardHeader>
            <CardBody>
              <IndexTable/> 
            </CardBody>
      </div>
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