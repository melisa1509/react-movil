import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getShowProgramsa } from "actions/programsaActions.jsx";
import { store } from "store";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Domain from "@material-ui/icons/Domain";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Timeline from "@material-ui/icons/Timeline";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import FileCopy from "@material-ui/icons/FileCopy";
import AccessibityNew from "@material-ui/icons/AccessibilityNew";
import PanTool from "@material-ui/icons/PanTool";
import Face from "@material-ui/icons/Face";


// core components
import Accordion from "components/Accordion/Accordion.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import MisionTab from "./MisionTab.jsx";
import GenerateGroupsTab from "./GenerateGroupsTab.jsx";
import FacilitateGroupsTab from "./FacilitateGroupsTab.jsx";
import GraduateGroupsTab from "./GraduateGroupsTab.jsx";
import SupportGroupsTab from "./SupportGroupsTab.jsx";



// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { withRouter } from 'react-router-dom';
import { SupervisedUserCircle, ListAlt, School, Airplay } from "@material-ui/icons";


const style = {
    infoText: {
      fontWeight: "300",
      margin: "10px 0 30px",
      textAlign: "center"
    },
    inputAdornmentIcon: {
      color: "#555"
    },
    choiche: {
      textAlign: "center",
      cursor: "pointer",
      marginTop: "20px"
    },
    ...customSelectStyle,
    ...validationFormsStyle
};




class ShowForm extends React.Component {

    render() {
        const { classes, programsa, active } = this.props;
        let { t } = this.props;
        return (
          <Accordion
                  active={0}
                  collapses={[
                    {
                      title: t("title_mision"),
                      content: (
                        <MisionTab />
                      )
                    },
                    {
                      title: t("title_generate_groups"),
                      content: (
                        <GenerateGroupsTab />
                      )
                    },
                    {
                      title: t("title_rules"),
                      content: (
                        <FacilitateGroupsTab />
                      )
                    },
                    {
                      title: t("title_graduate_groups"),
                      content: (
                        <GraduateGroupsTab />
                      )
                    },
                    {
                      title: t("title_support_groups"),
                      content: (
                        <SupportGroupsTab />
                      )
                    },
                  ]}
                />
                
        );
    }
}

const mapStateToProps = state => ({ 
      programsa: state.programsaReducer.programsa,
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowProgramsa: key => dispatch(getShowProgramsa(key)), 
});

const ShowFormComponent = translate(withStyles(style)(ShowForm));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowFormComponent));



