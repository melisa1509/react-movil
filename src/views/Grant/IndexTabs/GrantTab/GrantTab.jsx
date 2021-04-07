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
import IndexApplicationTable from './IndexApplicationTable.jsx';

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class GrantTab extends React.Component {
 

  render() {
    const { classes, styles, active_user } = this.props;
    let { t } = this.props;    
    return (
      <div>
          <br/><br/>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_grant_list")}</h4>
            </CardHeader>
              <IndexTable  />
          <br/>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_grant_ambassador_list_revision")}</h4>
            </CardHeader>
              <IndexApplicationTable  />
        </div>
    );
  }
}

GrantTab.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({
});
const mapStateToProps = state => ({ 
  active_user: state.loginReducer.active_user, 
});

const NewRepComponent = translate(withStyles(styles)(GrantTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent);