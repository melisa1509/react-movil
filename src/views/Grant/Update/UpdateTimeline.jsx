import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showGrantUpdate } from "actions/grantActions.jsx";
import { newGrantUpdate } from "actions/grantActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";

// @material-ui/icons
import CardTravel from "@material-ui/icons/CardTravel";
import Extension from "@material-ui/icons/Extension";
import Fingerprint from "@material-ui/icons/Fingerprint";
import FlightLand from "@material-ui/icons/FlightLand";
import Build from "@material-ui/icons/Build";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Timeline from "components/Timeline/Timeline.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { withRouter } from 'react-router-dom';
import { showDate } from "assets/functions/general.jsx";
import { BASE_URL } from 'constants/urlTypes';

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

class UpdateTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
     this.saveClick = this.saveClick.bind(this);
     this.deleteClick= this.deleteClick.bind(this);
    }

    saveClick() {
      this.props.dispatchNewGrantUpdate();
    }
    componentDidMount() {
      this.props.dispatchShowGrantUpdate(this.props.match.params.id);
      
    }

    deleteClick(){
      this.props.dispatchDeleteSuccessful();
      this.props.dispatchShowGrant(this.props.match.params.id);
    }

    render() {
        const { show_grant_update, t} = this.props;
        const list = show_grant_update === undefined ? [] : show_grant_update;
        let ind = 0;
        const updates = list.map((prop, key) => {
            ind++;
            switch (ind) {
              case 1:
                  return {
                    inverted: true,
                    badgeColor: "danger",
                    badgeIcon: CardTravel,
                    title: prop.user.first_name + " "+ prop.user.last_name,
                    titleColor: "danger",
                    body: (
                      <p>
                        {prop.description}
                      </p>
                    ),
                    footerTitle: showDate(prop.create_at),
                    footer: (
                      <p>
                        {
                          prop.file !== "undefined" ?
                          <a
                            href={BASE_URL +  "/web/file/"  + prop.file}
                            target="_blank"
                          >
                              {t("label_download_file")}
                          </a>:
                          ""
                        }
                      </p>
                    )
                  }
              case 2:
                  return {
                    badgeColor: "success",
                    badgeIcon: Extension,
                    title: prop.user.first_name + " "+ prop.user.last_name,
                    titleColor: "success",
                    body: (
                      <p>
                        {prop.description}
                      </p>
                    ),
                    footerTitle: showDate(prop.create_at),
                    footer: (
                      <p>
                        {
                          prop.file !== "undefined" ?
                          <a
                            href={BASE_URL +  "/web/file/"  + prop.file}
                            target="_blank"
                          >
                              {t("label_download_file")}
                          </a>:
                          ""
                        }
                      </p>
                    )
                  }
              case 3:
                  return {
                    inverted: true,
                    badgeColor: "info",
                    badgeIcon: Fingerprint,
                    title: prop.user.first_name + " "+ prop.user.last_name,
                    titleColor: "info",
                    body: (
                      <p>
                        {prop.description}
                      </p>
                    ),
                    footerTitle: showDate(prop.create_at),
                    footer: (
                      <p>
                        {
                          prop.file !== "undefined" ?
                          <a
                            href={BASE_URL +  "/web/file/"  + prop.file}
                            target="_blank"
                          >
                              {t("label_download_file")}
                          </a>:
                          ""
                        }
                      </p>
                    )
                  }
              case 4:
                  ind = 0;
                  return {
                    badgeColor: "warning",
                    badgeIcon: FlightLand,
                    title: prop.user.first_name + " "+ prop.user.last_name,
                    titleColor: "warning",
                    body: (
                      <p>
                        {prop.description}
                      </p>
                    ),
                    footerTitle: showDate(prop.create_at),
                    footer: (
                      <p>
                        {
                          prop.file !== "undefined" ?
                          <a
                            href={BASE_URL +  "/web/file/"  + prop.file}
                            target="_blank"
                          >
                              {t("label_download_file")}
                          </a>:
                          ""
                        }
                      </p>
                    )
                  }
              default:
                  return {
                    inverted: true,
                    badgeColor: "danger",
                    badgeIcon: CardTravel,
                    title: prop.user.first_name + " "+ prop.user.last_name,
                    titleColor: "danger",
                    body: (
                      <p>
                        {prop.description}
                      </p>
                    ),
                    footerTitle: showDate(prop.create_at),
                    footer: (
                      <p>
                        {
                          prop.file !== "undefined" ?
                          <a
                            href={BASE_URL +  "/web/file/"  + prop.file}
                            target="_blank"
                          >
                              {t("label_download_file")}
                          </a>:
                          ""
                        }
                      </p>
                    )
                  }
            }
            
        })
        
       
        return (
            <Timeline stories={updates} />
                
        );
    }
}
const mapStateToProps = state => ({ 
  show_grant: state.grantReducer.show_grant,
  delete_grant: state.grantReducer.delete_grant, 
  successfull_new: state.generalReducer.successful_new,
  show_grant_update: state.grantReducer.show_grant_update
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGrantUpdate: key => dispatch(showGrantUpdate(key)), 
  dispatchNewGrantUpdate: () => dispatch(newGrantUpdate()),
  dispatchDeleteSuccessful: () => dispatch(deleteSuccessful())
});

const UpdateTimelineComponent = translate(withStyles(style)(UpdateTimeline));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(UpdateTimelineComponent));


