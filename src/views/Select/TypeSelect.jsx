import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables
import { connect } from "react-redux";
import { updateTypeSelect } from "actions/selectActions.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import Success from "components/Typography/Success.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";



const style = {
    ...customSelectStyle,
    ...validationFormsStyle
};


class TypeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            // Select
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false
        };
        
    }
     
      
    sendState() {
        return this.state;
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.dispatchUpdateTypeSelect(event.target.value);
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    isValidated() {
        return true;
    }


    render() {
        const { classes, input } = this.props;
        let { t } = this.props;
        
        return (
                <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel
                        htmlFor="simple-select"
                    >
                        <Success>{t("label_type_grant")}</Success>
                    </InputLabel>
                    <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                            value={input.value}
                            onChange={this.handleSimple , input.onChange}
                            inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                        }}
                    >
                        <MenuItem
                            disabled
                            classes={{
                                root: classes.selectMenuItem
                            }}
                            value="-1"
                        >
                            {t("label_choose_type")}
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="state.startup"
                        >
                            {t("label_start_up")}
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="state.schollarship"
                        >
                            {t("label_schollarship")}
                        </MenuItem>                        
                    </Select>
                </FormControl>
        );
    }
}

const mapStateToProps = state => ({ 
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchUpdateTypeSelect: key => dispatch( updateTypeSelect(key) ), 
});

const TypeSelectComponent = translate(withStyles(style)(TypeSelect));
export default connect(mapStateToProps, mapDispatchToPropsActions)(TypeSelectComponent);



