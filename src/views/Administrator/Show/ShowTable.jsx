import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showAdministrator} from "actions/administratorActions.jsx";
import { deleteAdministrator } from "actions/administratorActions.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { withRouter } from 'react-router-dom';

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
     this.deleteClick = this.deleteClick.bind(this);
    }

    deleteClick() {
      this.props.dispatchDeleteAdministrator(this.props.match.params.id, this.props.history);
    }
    componentDidMount() {
      this.props.dispatchShowAdministrator(this.props.match.params.id);
    }

    render() {
        const { show_administrator, successful_delete } = this.props;
        let { t } = this.props;
        let roles=""
        if(show_administrator.roles == "ROLE_ADMIN"){
          roles="SUPER ADMIN"
        }
        if(show_administrator.roles == "ROLE_LANGUAGE_ADMIN"){
          roles="LANGUAGE ADMIN"
        }
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <GridItem xs={12} sm={12} md={12}>
                  { successful_delete ?      
                  <SnackbarContent
                    message={
                      <center>{t("label_successful_delete")}</center>
                    }
                    close={false}
                    color="success"
                  />
                  : ""}
              </GridItem>
            <Table
              striped
              tableHead={[]}
              tableData={[
                [<th>{t("label_email")}</th>,show_administrator.username],
                [<th>{t("label_name")}</th>,show_administrator.first_name],
                [<th>{t("label_lastName")}</th>,show_administrator.last_name],
                [<th>{t("label_role")}</th>,roles],
                [<th>{t("label_language")}</th>,show_administrator.language],
                [<th>{t("label_language_grader")}</th>,JSON.stringify(show_administrator.language_grader)],
                [<th>{t("label_country")}</th>,show_administrator.country],
              ]}
            />
            <br/>
             <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/admin"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Link to={"/admin/edit/" + show_administrator.id}>
                      <Button color="info" size="sm">
                      {t("button_edit")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Button color="danger" size="sm" onClick={this.deleteClick}>
                      {t("button_delete")}
                      </Button>
                      {" "}
                      </center>
                  </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
                
        );
    }
}
const mapStateToProps = state => ({ 
  show_administrator: state.administratorReducer.show_administrator,
  delete_admin: state.administratorReducer.delete_admin, 
  successful_delete: state.generalReducer.successful_delete
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowAdministrator: key => dispatch(showAdministrator(key)), 
  dispatchDeleteAdministrator: (key, history) => dispatch(deleteAdministrator(key, history))
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));


