
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class CustomRadio extends React.Component {
  
  render() {
    const { classes, data } = this.props;
    return(
        <div>
            {
                data.options.map((prop, key) => {
                    const nOption = key + 1;
                    return (
                        <div
                          className={
                            classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
                          }
                        >
                          <FormControlLabel
                            control={
                              <Radio
                                checked={"option" + nOption === data.value ? true : false }
                                onChange={this.handleChange}
                                value="a"
                                name="radio button enabled"
                                aria-label="A"
                                icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                checkedIcon={
                                  <FiberManualRecord className={classes.radioChecked} />
                                }
                                classes={{
                                  checked: classes.radio,
                                  root: classes.radioRoot
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
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

CustomRadio.propTypes = {
  classes: PropTypes.object
};

export default withStyles(regularFormsStyle)(CustomRadio);
