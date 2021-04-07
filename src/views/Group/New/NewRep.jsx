import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import NewForm from 'views/Group/New/NewForm.jsx';
import NewAmbassador from 'views/Group/New/NewAmbassador.jsx';

import { showAmbassador } from 'actions/ambassadorActions.jsx';
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
  constructor(props) {
    super(props);
    this.state = {       
    };
  }

  componentWillMount(){
    this.props.dispatchGetShowAmbassador(this.props.match.params.id);
  }
  
  render() {
    const { classes, show_ambassador, active_user } = this.props;
    let { t } = this.props;
    let rol=false
    let id=""
      if(active_user.roles == "ROLE_EMBASSADOR" || active_user.roles == "ROLE_STUDENT_EMBASSADOR"){
        rol=true
        id=active_user.id
      }
      else{
        id=this.props.match.params.id
      }
    const initialValuesGroup= {
      modality:"option.modality1",
      program:"option.program1",
      start_date:moment().format('YYYY-MMM-DD'),
      final_date:moment().format('YYYY-MMM-DD'),
      graduation_date:moment().format('YYYY-MMM-DD'),
      id_ambassador:id,
      number_students_graduated: 0
    }
    return (
      <>
            <br/><br/><br/><br/>
          <Card>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_new_group")}</h4>
             <p>{ show_ambassador.first_name + " " + show_ambassador.last_name }</p>
             </center>
            </CardHeader>
            <CardBody>
                {rol ? <NewAmbassador initialValues={initialValuesGroup} /> : <NewForm initialValues={initialValuesGroup} /> }  
            </CardBody>
          </Card>
      </>
    );
  }
}

NewRep.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  show_ambassador: state.ambassadorReducer.show_ambassador, 
  active_user: state.loginReducer.active_user, 
});


const mapDispatchToPropsActions = dispatch => ({
  dispatchGetShowAmbassador: key => dispatch( showAmbassador(key) )
});


const NewRepComponent = translate(withStyles(styles)(NewRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent));