import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables
import { connect } from "react-redux";
import { updateCountrySelect } from "actions/selectActions.jsx";
import { getReportCountry } from "actions/reportActions.jsx";
import { getAmbassadorCountry } from "actions/reportActions.jsx";
import { CountryList } from "actions/selectActions.jsx";

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
        this.props.dispatchUpdateCountrySelect(event.target.value);
        this.props.dispatchGetReportCountry(event.target.value);
        this.props.dispatchGetAmbassadorCountry(event.target.value);
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    isValidated() {
        return true;
    }
    componentDidMount() {
        this.props.dispatchLoadCountryList();
      }
    render() {
        const { classes, country_list } = this.props;
        let { t } = this.props;
        return (
                <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel
                        htmlFor="simple-select"
                    >
                        {t("label_country")}
                    </InputLabel>
                    <Select 
                        id="simple-select"
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
                            {t("label_chose_country")}
                        </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="ALL"
                        >
                            {t("label_all_country")}
                        </MenuItem>
                        {
                            country_list.map( (country) => {
                                return(
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value={country.alpha3Code}
                                    >
                                        {country.name}
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
    country_list: state.selectReducer.country_list, 
    report_list: state.reportReducer.report_list, 
    report_country: state.reportReducer.report_country
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchUpdateCountrySelect: key => dispatch( updateCountrySelect(key) ), 
  dispatchGetReportCountry: key => dispatch( getReportCountry(key)),
  dispatchGetAmbassadorCountry: key => dispatch (getAmbassadorCountry(key)),
  dispatchLoadCountryList: () => dispatch(CountryList())

});

const ReportSelectComponent = translate(withStyles(style)(ReportSelect));
export default connect(mapStateToProps, mapDispatchToPropsActions)(ReportSelectComponent);



