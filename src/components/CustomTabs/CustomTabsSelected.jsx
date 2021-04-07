/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import customTabsStyle from "assets/jss/material-dashboard-pro-react/components/customTabsStyle.jsx";

class CustomTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount(){
    this.setState({ value: this.props.active === undefined ? 0 : this.props.active });
  }

  render() {
    const {
      classes,
      headerColor,
      plainTabs,
      tabs,
      title,
      rtlActive
    } = this.props;
    const cardTitle = classNames({
      [classes.cardTitle]: true,
      [classes.cardTitleRTL]: rtlActive
    });
    return (
      <Card plain={plainTabs}>
        <CardHeader color={headerColor} plain={plainTabs}>
          {title !== undefined ? (
            <div className={cardTitle}>{title}</div>
          ) : null}
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone
            }}
          >
            {tabs.map((prop, key) => {
              var icon = {};
              if (prop.tabIcon) {
                icon = {
                  icon: <prop.tabIcon />
                };
              }
              return (
                <Tab
                  classes={{
                    root: classes.tabRootButton,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper
                  }}
                  key={key}
                  label={prop.tabName}
                  {...icon}
                />
              );
            })}
          </Tabs>
        </CardHeader>
        <CardBody>
          {tabs.map((prop, key) => {
            if (key === this.state.value) {
              return <div key={key}>{prop.tabContent}</div>;
            }
            return null;
          })}
        </CardBody>
      </Card>
    );
  }
}

CustomTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};

export default withStyles(customTabsStyle)(CustomTabs);
