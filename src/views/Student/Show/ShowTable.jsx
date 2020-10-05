import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showStudent } from "actions/studentActions.jsx";
import { deleteStudent } from "actions/studentActions.jsx";

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
};

class ShowTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
     this.deleteClick = this.deleteClick.bind(this);
    }

    deleteClick() {
      this.props.dispatchDeleteStudent(this.props.match.params.id, this.props.history);
    }
    componentDidMount() {
      this.props.dispatchShowStudent(this.props.match.params.id);
    }

    render() {
        const { show_student, successful_delete } = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <GridItem xs={12} sm={12} md={12}>
              </GridItem>
            <Table
              striped
              tableHead={[]}
              tableData={[
                [<th>{t("label_email")}</th>,<p>{show_student.username}</p>],
                [<th>{t("label_name")}</th>,show_student.first_name],
                [<th>{t("label_lastName")}</th>,show_student.last_name],
                [<th>{t("label_country")}</th>,show_student.country],
                [<th>{t("label_city")}</th>, show_student.city],
                [<th>{t("label_whatsapp")}</th>, show_student.whatsapp],
                [<th>{t("label_language")}</th>,  show_student.language],
              ]}
            />
            <br/>
             <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/student"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Link to={"/student/edit/" + show_student.id}>
                      <Button color="info" size="sm">
                      {t("button_edit")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Link to={"/student/editpassword/" + show_student.id}>
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
  show_student: state.studentReducer.show_student,
  delete_student: state.studentReducer.delete_student, 
  successful_delete: state.generalReducer.successful_delete
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowStudent: key => dispatch(showStudent(key)), 
  dispatchDeleteStudent: (key, history) => dispatch(deleteStudent(key, history))
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));


