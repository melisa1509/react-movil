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
import MBSTable from './MBSTable.jsx';
import SATable from './SATable.jsx';

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
    const { classes, progress_list } = this.props;
    let { t } = this.props;
    const login = "es";
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_student_list")+" "+"/"+" "+t("title_project_progress_mbs")}</h4>
            </CardHeader>
            <CardBody>
                <MBSTable  />      
            </CardBody>
          </Card>
          <br/>
          { progress_list.progressSa.length !== 0 ?          
            <Card>
              <CardHeader color="info">
                  <h4 className={classes.cardTitle}>{t("title_student_list")+" "+"/"+" "+t("title_project_progress_sa")}</h4>
              </CardHeader>
              <CardBody>
                  <SATable  />      
              </CardBody>
            </Card>
            :<></>
          }
        </GridItem>
      </GridContainer>
    );
  }
}

IndexRep.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  progress_list: state.groupReducer.progress_list, 
});

const mapDispatchToPropsActions = dispatch => ({
});


const NewRepComponent = translate(withStyles(styles)(IndexRep));
export default connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent);