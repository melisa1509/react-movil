import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables
import { connect } from "react-redux";

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


class StateSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    isValidated() {
        return true;
    }


    render() {
        const { classes} = this.props;
        let { t } = this.props;
        
        return (
                <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                    >
                        <Success>{t("label_state")}</Success>
                    </InputLabel>
                    <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                            value={this.state.simpleSelect}
                            onChange={this.handleSimple}
                            inputProps={{
                            name: "simpleSelect",
                            id: "simple-select"
                        }}
                    >
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="state.draft"
                        >
                            {t("state_draft")}
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="state.publish"
                        >
                            {t("state_publish")}
                        </MenuItem>
                    </Select>
                </FormControl>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToPropsActions = dispatch => ({
});

const StateSelectComponent = translate(withStyles(style)(StateSelect));
export default connect(mapStateToProps, mapDispatchToPropsActions)(StateSelectComponent);



