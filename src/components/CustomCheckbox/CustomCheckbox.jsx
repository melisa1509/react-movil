
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class CustomCheckbox extends React.Component {
  
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
                            classes.checkboxAndRadio +
                            " " +
                            classes.checkboxAndRadioHorizontal
                        }
                        >
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={data.value === undefined ? false: data.value.includes("option" + nOption) }
                                checkedIcon={
                                <Check className={classes.checkedIcon} />
                                }
                                icon={<Check className={classes.uncheckedIcon} />}
                                classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                                }}
                            />
                            }
                            classes={{
                            label: classes.label,
                            root: classes.labelRoot
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

CustomCheckbox.propTypes = {
  classes: PropTypes.object
};

export default withStyles(regularFormsStyle)(CustomCheckbox);
