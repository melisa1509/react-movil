import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
    textareaProcess:{
        border: "0px",
        resize: "auto",
        height: "auto !important",
        lineHeight: "1.42857 !important",
        overflow: "auto",
        margin: "0",
        fontFamily: "inherit",
    }, 
};


class ProcessTab extends React.Component {

  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    return (
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_process")}</h3>
            <br/>
            <SuccessBold>
                {t("question_process1")}
            </SuccessBold>
            <br/>
            <MutedText>
              {"1) " + programmbs.process1[0]}
            </MutedText>
            <br/>
            <MutedText>
              {"2) " + programmbs.process1[1]}
            </MutedText>
            <br/>
            <MutedText>
              {"3) " + programmbs.process1[2]}
            </MutedText>
            <br/>
            <MutedText>
              {"4) " + programmbs.process1[3]}
            </MutedText>
            <br/>
            <MutedText>
              {"5) " + programmbs.process1[4]}
            </MutedText>
            <br/>
            <MutedText>
              {"6) " + programmbs.process1[5]}
            </MutedText>
            <br/>
            <br/>
            <SuccessBold>
              {t("question_process2")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.process2}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_process3")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.process3}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_process4")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.process4}
            </MutedText>
            <RevisionForm name="revisionprocess" labelText={t("label_revision_process")+ " *"}/>
            <Controls/>
            <ControlNavigation previous={"product"} next={"price"} />
          </CardBody>
    );
  }
}

ProcessTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs
});

const mapDispatchToPropsActions = dispatch => ({
});


const ProcessTabComponent = translate(withStyles(styles)(ProcessTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(ProcessTabComponent);