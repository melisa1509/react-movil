import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import ShowForm from './ShowForm.jsx';


import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  },
  cardCategory:{
    textAlign: "center"
  },
  verticalSpace:{
    paddingBottom: "30px"
  }
};


class ShowRep extends React.Component {

  componentDidMount(){
    window.scrollTo(0, 0);
  }
 

  render() {
    const { classes, programmbs, active, active_user} = this.props;
    let { t } = this.props;
    return (
      <>
        <br/><br/><br/><br/><br/>
            <CardHeader color="info" >
                <h4 className={classes.cardTitleCenter}>{ active_user.studentgroup.group.program === "option.program1" ? t("title_program_mbs") : t("title_program_mbs_junior")}</h4>
                <p className={classes.cardCategory}>{ programmbs.student.first_name + " " + programmbs.student.last_name + " / " + programmbs.student.studentgroup.group.name + " / " + programmbs.student.studentgroup.group.embassador.first_name + "  " + programmbs.student.studentgroup.group.embassador.last_name} </p> 
            </CardHeader>
                <ShowForm active={active} />      
      </>
    );
  }
}

ShowRep.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs,
  active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
});


const ShowRepComponent = translate(withStyles(styles)(ShowRep));
export default connect(mapStateToProps, mapDispatchToPropsActions)(ShowRepComponent);