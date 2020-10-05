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
import CodeSATable from './CodeSATable.jsx';
import CodeJrTable from './CodeJrTable.jsx';

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class IndexRep extends React.Component {
 

  render() {
    const { classes} = this.props;
    let { t } = this.props;
    return (
      <div>
          <br/><br/><br/><br/>
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_code_list_mbs")}</h4>
            </CardHeader>
            <CardBody>
                <IndexTable  />      
            </CardBody>
          </Card>
          <br/>
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_code_list_sa")}</h4>
            </CardHeader>
            <CardBody>
                <CodeSATable  />      
            </CardBody>
          </Card>
          <br/>
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_code_list_jr")}</h4>
            </CardHeader>
            <CardBody>
                <CodeJrTable  />      
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

const mapDispatchToPropsActions = dispatch => ({
});


const NewRepComponent = translate(withStyles(styles)(IndexRep));
export default connect(null, mapDispatchToPropsActions)(NewRepComponent);