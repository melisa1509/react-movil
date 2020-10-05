import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { store } from "store";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomRadio from 'components/CustomRadio/CustomRadio.jsx';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import MutedText from "components/Typography/Muted.jsx";
import Controls from './Controls.jsx';
import RevisionForm from './RevisionForm.jsx';
import RenderCell from './RenderCell.jsx';
import CustomRenderCell from './CustomRenderCell.jsx';

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
  thBackgroundColor:{
    backgroundColor: "#4caf50",
    color: "#fff",
    fontWeight: "bold"
  },
  tdBackgroundColor:{
    backgroundColor: "#4caf5091",
    paddingLeft: "20px",
    color: "#495057",
    fontWeight: "bold"
  },
  verticalCenter: {
    verticalAlign: "middle",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  tdTable: {
    border: "1px solid #49505794",
    boxSizing: "border-box",
  },
  borderSpacing:{
    borderSpacing: "0px",
    borderCollapse: "collapse"
  },
  inputTable:{
    border: "0px",
    color: "#495057",
    padding: "10px",
  },
  tdBold:{
    fontWeight: "bold",
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  textAlignRight:{
    textAlign: "Right"
  }
};




class GenerateGroupsTab extends React.Component {

  
  render() {
    const { classes, programsa } = this.props;
    let { t } = this.props;
    
    
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_graduate_groups")}</h3>
            <br/>
            <SuccessBold>
              {t("question_graduated1")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.graduate1}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_graduated2")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.graduate2}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_graduated3")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.graduate3}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_graduated4")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programsa.graduate4}
            </MutedText>
            <br/>
            <RevisionForm name="revisiongraduate" labelText={t("label_revision_graduate")} />
            <br/>
            <Controls/>
          </CardBody>
        </Card>
    );
  }
}

GenerateGroupsTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programsa: state.programsaReducer.programsa
});

const mapDispatchToPropsActions = dispatch => ({
  
});


const GenerateGroupsTabComponent = translate(withStyles(styles)(GenerateGroupsTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(GenerateGroupsTabComponent);