import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { translate } from 'react-switch-lang';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import navPillsStyle from "assets/jss/material-dashboard-pro-react/components/navPillsStyle.jsx";
import { withRouter } from 'react-router-dom';

class NavPills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }
  handleChange = (event, active) => {
    this.setState({ active });
  };

  handleNavigation = (active) => {
    this.setState({ active });
    window.scrollTo(0, 0);
  }; 

  handleChangeIndex = index => {
    this.setState({ active: index });
  };
  
  render() {
    const {
      classes,
      tabs,
      direction,
      color,
      horizontal,
      alignCenter,
      t
    } = this.props;
    const flexContainerClasses = classNames({
      [classes.flexContainer]: true,
      [classes.horizontalDisplay]: horizontal !== undefined
    });
    const tabButtons = (
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone
        }}
        value={this.state.active}
        onChange={this.handleChange}
        centered={alignCenter}
      >
        {tabs.map((prop, key) => {
          var icon = {};
          if (prop.tabIcon !== undefined) {
            icon["icon"] = <prop.tabIcon className={classes.tabIcon} />;
          }
          const pillsClasses = classNames({
            [classes.pills]: true,
            [classes.horizontalPills]: horizontal !== undefined,
            [classes.pillsWithIcons]: prop.tabIcon !== undefined
          });
          return (
            <Tab
              label={prop.tabButton}
              key={key}
              {...icon}
              classes={{
                root: pillsClasses,
                selected: classes[color]
              }}
            />
          );
        })}
      </Tabs>
    );
    const tabContent = (
      <div className={classes.contentWrapper}>
        <SwipeableViews
          axis={direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.active}
          onChangeIndex={this.handleChangeIndex}
          style={{ overflowY: "hidden" }}
        >
          {tabs.map((prop, key) => {
            return (
              <div className={classes.tabContent} key={key} ref={this.myRef}>
                {prop.tabContent}
                <GridContainer justify="center" >
                    <GridItem xs={3} sm={3} md={3}>            
                            <center>
                                    {key === 0 ? ""
                                        : 
                                        <Button color="default" fullWidth onClick={() => this.handleNavigation(key - 1)}>
                                            {t("button_previous")}
                                        </Button>
                                    }
                                      
                            </center>               
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}></GridItem>
                    <GridItem xs={3} sm={3} md={3}>            
                            <center>
                                    {key === (tabs.length - 1 ) ? ""
                                        :
                                        <Button color="info" fullWidth onClick={() => this.handleNavigation(key + 1)}>
                                            {t("button_next")}
                                        </Button>  
                                    }
                            </center>               
                    </GridItem>
                </GridContainer>
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
    return horizontal !== undefined ? (
      <GridContainer>
        <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
        <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
      </GridContainer>
    ) : (
      <div>
        {tabButtons}
        {tabContent}
      </div>
    );
  }
}

NavPills.defaultProps = {
  active: 0,
  color: "primary"
};

NavPills.propTypes = {
  classes: PropTypes.object.isRequired,
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};

export default translate(withRouter(withStyles(navPillsStyle)(NavPills)));
