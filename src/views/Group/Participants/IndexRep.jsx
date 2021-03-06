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
import IndexAmbassador from './IndexAmbassador.jsx';
import IndexAmbassadorOnline from './IndexAmbassadorOnline.jsx';

import { getCertificateList } from "actions/certificateActions.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import PreForm from "./PreForm.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};

class IndexRep extends React.Component {  
  render() {
    const { classes,active_user, group_list} = this.props;
    let { t } = this.props;
    let rol=false
    if(active_user.roles == "ROLE_EMBASSADOR" || active_user.roles == "ROLE_STUDENT_EMBASSADOR"){
      rol=true
    }
    return (
      <div>
          <br/><br/><br/><br/>
          <Card>
            <CardHeader color="info">
                { rol ? <h4 className={classes.cardTitle}>{t("title_student_list") +" "+ t("title_paper_documentation") + " / "+ t("state_project_mbs") + " " + t("state.without_starting")}</h4> :<h4 className={classes.cardTitle}>{t("title_student_list")}</h4>}
            </CardHeader>
            <CardBody>
                {rol ? <IndexAmbassador  /> : <IndexTable  /> }   
            </CardBody>
          </Card>
          <br/>    
          {rol ?
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_student_list") +" "+ t("title_online_documentation")}</h4>
            </CardHeader>
            <CardBody>
                 <IndexAmbassadorOnline />
            </CardBody>
          </Card>          
          :""}      
      </div>
    );
  }
}

IndexRep.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  active_user: state.loginReducer.active_user,
  group_list: state.groupReducer.group_list, 
  certificate_list: state.certificateReducer.certificate_list, 
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetCertificateList: (key) => dispatch( getCertificateList(key))
});


const NewRepComponent = translate(withStyles(styles)(IndexRep));
export default connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent);