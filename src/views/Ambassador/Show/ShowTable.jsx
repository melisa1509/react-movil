import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showAmbassador } from "actions/ambassadorActions.jsx";
import { deleteAmbassador } from "actions/ambassadorActions.jsx";

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
      this.props.dispatchDeleteAmbassador(this.props.match.params.id, this.props.history);
    }
    componentDidMount() {
      this.props.dispatchShowAmbassador(this.props.match.params.id);
    }

    render() {
        const { show_ambassador, successful_delete } = this.props;
        let { t } = this.props;
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
                [<th>{t("label_email")}</th>,show_ambassador.username],
                [<th>{t("label_name")}</th>,show_ambassador.first_name],
                [<th>{t("label_lastName")}</th>,show_ambassador.last_name],
                [<th>{t("label_country")}</th>,show_ambassador.country],
                [<th>{t("label_city")}</th>, show_ambassador.city],
                [<th>{t("label_code")}</th>,  show_ambassador.code],
                [<th>{t("label_whatsApp")}</th>, show_ambassador.whatsapp],
              ]}
            />
            <br/>
             <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/ambassador"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Link to={"/ambassador/edit/" + show_ambassador.id}>
                      <Button color="info" size="sm">
                      {t("button_edit")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Link to={"/ambassador/editpassword/" + show_ambassador.id}>
                      <Button color="warning" size="sm">
                      {t("button_change_password")}
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
  show_ambassador: state.ambassadorReducer.show_ambassador,
  delete_ambassador: state.ambassadorReducer.delete_ambassador, 
  successful_delete: state.generalReducer.successful_delete
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowAmbassador: key => dispatch(showAmbassador(key)), 
  dispatchDeleteAmbassador: (key, history) => dispatch(deleteAmbassador(key, history))
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));


