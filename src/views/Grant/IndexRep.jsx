import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Dashboard from "@material-ui/icons/Dashboard";
import Icon from "@material-ui/core/Icon";
import Face from "@material-ui/icons/Face";
import Group from "@material-ui/icons/Group";
import Equalizer from "@material-ui/icons/Equalizer";
import School from "@material-ui/icons/School";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from 'components/CustomTabs/CustomTabsRouter.jsx';

import GrantTab from './IndexTabs/GrantTab/GrantTab.jsx';
import StatisticTab from './IndexTabs/StatisticTab/StatisticTab.jsx';


import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class IndexRep extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        active: 3,       
    };
  }

  componentWillMount(){
    this.setState({ active: this.props.match.params.tab });
  }
 

  render() {
    const { classes, active_tab } = this.props;
    let { t } = this.props;    
    return (
      <div>
          <br/><br/><br/><br/>
            <CustomTabs
              title= {t("link_grants")}
              headerColor="success"
              active={active_tab }
              tabs={[
                {
                  tabName: t("link_list"),
                  tabIcon: Dashboard,
                  tabContent: <GrantTab/>
                },
                {
                  tabName: t("link_statistics"),
                  tabIcon: Equalizer,
                  tabContent: <StatisticTab/>,
                  rtlActive:true
                },
              ]}
            />
      </div>
    );
  }
}

IndexRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({
});
const mapStateToProps = state => ({ 
  active_user: state.loginReducer.active_user, 
  active_tab: state.generalReducer.active_tab
});

const NewRepComponent = withRouter(translate(withStyles(styles)(IndexRep)));
export default connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent);