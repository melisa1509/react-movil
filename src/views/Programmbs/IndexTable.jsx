import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showGroup } from "actions/groupActions.jsx";
import { deleteGroup } from "actions/groupActions.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Icon from "@material-ui/core/Icon";
import TableMenu from "components/Table/TableMenu.jsx";
import Button from "components/CustomButtons/Button.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { withRouter } from 'react-router-dom';
import Muted from "components/Typography/Muted";

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
    ...validationFormsStyle,
    ...customSelectStyle
};

class ShowTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }

  
    render() {
        const { show_group, classes} = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="left">
            <GridItem xs={12} sm={12} md={9}>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>account_balance</Icon>{" "}{t("title_plan") + " " + "100% "}{"  "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>domain</Icon>{" "}{t("title_product") + " " + "100% "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>timeline</Icon>{" "}{t("title_process") + " " + "100% "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>monetization_on</Icon>{" "}{t("title_price") + " " + "100% "}{"  "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>record_voice_over</Icon>{" "}{t("title_promotion") + " " + "100% "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>file_copy</Icon>{" "}{t("title_paperwork") + " " + "100% "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>accessibility_new</Icon>{" "}{t("title_quality_life") + " " + "100% "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
            <Link to={"/student/preevaluation"}>
                <Button fullWidth block color="white" style={{justifyContent: "flex-start"}}   size="lg">
                    <Icon>pan_tool</Icon>{" "}{t("title_service") + " " + "100% "}<Icon>double_arrow</Icon>
                </Button>
            </Link>
           
            
            </GridItem>
          </GridContainer>
                
        );
    }
}
const mapStateToProps = state => ({ 
  show_group: state.groupReducer.show_group,
  delete_group: state.groupReducer.delete_group, 
  successful_delete: state.generalReducer.successful_delete
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGroup: key => dispatch(showGroup(key)), 
  dispatchDeleteGroup: (key, history) => dispatch(deleteGroup(key, history))
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));


