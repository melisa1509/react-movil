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
import RevisionForm from './RevisionForm.jsx';

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};


class MisionTab extends React.Component {

  
  render() {
    const { classes, programsa } = this.props;
    let { t } = this.props;
    console.log(programsa);
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_mision")}</h3>
            <br/>
            <SuccessBold>
              {t("question_mision1")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.mision1}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_mision2")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.mision2}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_mision3")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.mision3}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_mision4")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.mision4}
            </MutedText>
            <br/>
            <RevisionForm name="revisionmision" labelText={t("label_revision_mision")} />
            <br/>
            <Controls/>
          </CardBody>
        </Card>
    );
  }
}

MisionTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programsa: state.programsaReducer.programsa
});

const mapDispatchToPropsActions = dispatch => ({
  
});


const MisionTabComponent = translate(withStyles(styles)(MisionTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(MisionTabComponent);