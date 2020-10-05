import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { store } from "store";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import MutedText from "components/Typography/Muted.jsx";
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';
import RevisionForm from './RevisionForm.jsx';

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};


class PlanTab extends React.Component {

  
  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    return (
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_plan")}</h3>
            <br/>
            <SuccessBold>
              {t("question_plan1")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.plan1}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_plan2")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.plan2}
            </MutedText>
            <br/>
            <RevisionForm name="revisionplan" labelText={t("label_revision_plan")+ " *"} />
            <br/>
            <Controls/>
            <ControlNavigation previous={"plan"} next={"product"} />
          </CardBody>
    );
  }
}

PlanTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs
});

const mapDispatchToPropsActions = dispatch => ({
  
});


const PlanTabComponent = translate(withStyles(styles)(PlanTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(PlanTabComponent);