import React from "react";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables
import { connect } from "react-redux";
import { updateAmbassadorSelect } from "actions/selectActions.jsx";
import { getReportAmbassador } from "actions/reportActions.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";



const style = {
    ...customSelectStyle,
    ...validationFormsStyle
};


class ReportSelect extends React.Component {
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
        this.props.dispatchUpdateAmbassadorSelect(event.target.value);
        this.props.dispatchGetReportAmbassador(event.target.value);
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    isValidated() {
        return true;
    }

    render() {
        const { classes, ambassador_country } = this.props;
        let { t } = this.props;
        
        return (
                <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                    >
                        {t("label_ambassador")}
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
                            disabled
                            classes={{
                                root: classes.selectMenuItem
                            }}
                            value="-1"
                        >
                            {t("label_chose_ambassador")}
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem
                            }}
                            value="ALL"
                        >
                            {t("label_all_ambassadors")}
                        </MenuItem>
                        {
                            ambassador_country.map( (prop) => {
                                return(
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={prop.id}
                                    >
                                        {prop.first_name +" "+ prop.last_name}
                                    </MenuItem>
                                )
                            })
                        }

                    </Select>
                </FormControl>
        );
    }
}

const mapStateToProps = state => ({ 
    initialValues: state.selectReducer.selected_ambassador,
    ambassador_country: state.reportReducer.ambassador_country, 
    report_ambassador: state.reportReducer.report_ambassador
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchUpdateAmbassadorSelect: key => dispatch( updateAmbassadorSelect(key)), 
  dispatchGetReportAmbassador: key => dispatch( getReportAmbassador(key))

});

const ReportSelectComponent = translate(withStyles(style)(ReportSelect));
export default connect(mapStateToProps, mapDispatchToPropsActions)(ReportSelectComponent);



