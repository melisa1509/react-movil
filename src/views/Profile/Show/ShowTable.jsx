import React from "react";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";
import { Link } from "react-router-dom";
import { BASE_URL } from 'constants/urlTypes';

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import defaultImage from "assets/img/default-avatar.png";

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
    ...customSelectStyle,
    ...validationFormsStyle
};

class ShowTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }
    
    render() {
        const { active_user } = this.props;
        let { t } = this.props;
        return (
          <GridContainer>
            <GridItem xs={12}>
            <div className="picture-container">
                <div className="picture">
                  <img
                    src={active_user.picture === "NULL" || active_user.picture === "undefined" || active_user.picture === undefined ? defaultImage : BASE_URL +  "/web/file/"  + active_user.picture }
                    className="picture-src"
                    alt="..."
                  />
                </div>
              </div>
            <Table
              striped
              tableHead={[]}
              tableData={[
                [<th>{t("label_username")}</th>,<p>{active_user.username}</p>],
                [<th>{t("label_name")}</th>,<p>{active_user.first_name}</p>],
                [<th>{t("label_lastName")}</th>,<p>{active_user.last_name}</p>],
                [<th>{t("label_country")}</th>,<p>{active_user.country}</p>],
                [<th>{t("label_city")}</th>,<p>{active_user.city}</p>],
                [<th>{t("label_whatsApp")}</th>,<p>{active_user.whatsapp}</p>],
                [<th>{t("label_language")}</th>,<p>{active_user.language}</p>],
              ]}
            />
            <br/>
             <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                        <Link to={"/profile/edit/"}>
                          <Button color="info" size="sm">
                          {t("button_edit")}
                          </Button>
                        </Link>
                          {" "}
                        <Link to={"/profile/editpassword/"}>
                          <Button color="default" size="sm">
                          {t("button_change_password")}
                        </Button>
                        </Link>
                      </center>
                  </GridItem>
              </GridContainer>
              </GridItem>
      </GridContainer>
                
        );
    }
}
const mapStateToProps = state => ({ 
  active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));


