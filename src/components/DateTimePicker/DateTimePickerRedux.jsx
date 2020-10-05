import React from "react";
import PropTypes from "prop-types";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";


import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

class DateTimePickerRedux extends React.Component {
  
  render() {
    const { input, placeholder, defaultValue } = this.props;
    return (
      
            <FormControl fullWidth>
                <Datetime
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                onChange={input.onChange}
                defaultValue={moment().calendar()}
                closeOnSelect={true}
                inputProps={{ 
                    placeholder:placeholder,
                    value: moment(input.value).format('YYYY-MMM-DD') 
                }}
                />
            </FormControl>
    );
  }
}

DateTimePickerRedux.propTypes = {
  classes: PropTypes.object
};

export default withStyles(extendedFormsStyle)(DateTimePickerRedux);
