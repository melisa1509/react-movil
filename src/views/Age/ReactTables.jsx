
import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import TitleConected from "views/Age/TitleConected.jsx";
import FetchDataTable from 'views/Age/FetchReactTable.jsx';

import { getData } from "actions/actions.jsx";

import { dataTable, dataTableHalf } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { translate } from "react-translate";

import { setData } from "actions/actions.jsx";


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class ReactTables extends React.Component {
  

  handleUpdateClick = () => {
   
    this.props.dispatchSetData();
    
  }

  handleUpdateClickSuccess = () => {
    this.props.dispatchSetData();
  }

  componentDidMount() {
    // calling the new action creator
    //this.props.dispatchSetData();
  }


  render() {
    const { classes, styles } = this.props;
    let { t } = this.props;
    const login = "es";
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitle}>{t("login")}</h4>
            </CardHeader>
            
            <CardBody>
              <FetchDataTable  />      
            </CardBody>
            <GridItem xs={12} sm={12} md={12} justify="center">
              <Button
                color="rose"
                onClick={this.handleUpdateClick}
                >Rose
              </Button>
              <Button
                color="success"
                onClick={this.handleUpdateClickSuccess}
                >other
              </Button>
            </GridItem>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ReactTables.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({
  dispatchSetData: () => dispatch( getData() )
});


const ReactTablesComponent = translate('buttons')(withStyles(styles)(ReactTables));
export default connect(null, mapDispatchToPropsActions)(ReactTablesComponent);
