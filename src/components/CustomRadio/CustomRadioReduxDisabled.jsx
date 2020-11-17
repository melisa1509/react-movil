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
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class CustomRadioReduxDisabled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes, input, data } = this.props;
    return (
            <div>
              {                  
                  data.options.map((prop, key) => {
                      return (
                        <div
                          className={
                            classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
                          }
                        >
                            <FormControlLabel
                            disabled
                            control={
                                <Radio
                                checked={input.value === prop.val}
                                onChange={this.handleChange, input.onChange}
                                value={prop.val}
                                name="radio button demo"
                                aria-label="A"
                                icon={
                                    <FiberManualRecord
                                    className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                    className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                                />
                            }
                            classes={{
                                label: classes.label,
                                root: classes.labelRoot,
                                disabled: classes.disabledCheckboxAndRadio,
                            }}
                            label={prop.label}
                            />
                        </div>
                      );
                  })
              }
            </div>
        );
    }
}

CustomRadioReduxDisabled.propTypes = {
  classes: PropTypes.object
};

export default withStyles(regularFormsStyle)(CustomRadioReduxDisabled);
