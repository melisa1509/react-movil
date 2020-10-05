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
import PreForm from 'views/Register/PreEvaluation/PreForm.jsx';
import Logo from "assets/img/logo_interweave.png";

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



class NewRep extends React.Component {
  
  render() {
    const { classes, styles, new_student } = this.props;
    let { t } = this.props;
    const initialValuePre= {  
        question1:"option1",
        question2:"option1",
        question3:"option1",  
        question4:"option1",  
        question5:"option1",  
        question6:"option1",  
        question7:"option1",    
        id_student:new_student.id
    }
    return (
      <div>
          <br/>
          <GridContainer justify="center">
          <GridItem>
            <img src={Logo} height="100px" alt="..." />
          </GridItem>
        </GridContainer>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_students_register")}</h4>
             </center>
            </CardHeader>
            <CardBody>
                <PreForm initialValues={initialValuePre} />  
            </CardBody>
      </div>
    );
  }
}

NewRep.propTypes = {
  classes: PropTypes.object,
};

const mapDispatchToPropsActions = dispatch => ({

});
const mapStateToProps = state => ({ 
  new_student: state.studentReducer.new_student, 
});

const NewRepComponent = translate(withStyles(styles)(NewRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent));