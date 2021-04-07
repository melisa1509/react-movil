import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { store } from "store";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { loadFormProgrammbs } from "actions/programmbsActions.jsx";

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
  thBackgroundColor:{
    backgroundColor: "#4caf50",
    color: "#fff",
    fontWeight: "bold"
  },
  tdBackgroundColor:{
    backgroundColor: "#4caf5091",
    paddingLeft: "20px",
    color: "#495057",
    fontWeight: "bold"
  },
  verticalCenter: {
    verticalAlign: "middle",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  tdTable: {
    border: "1px solid #49505794",
    boxSizing: "border-box",
  },
  borderSpacing:{
    borderSpacing: "0px",
    borderCollapse: "collapse"
  },
  inputTable:{
    border: "0px",
    color: "#495057",
    paddingLeft: "10px"
  },
  horizontalRight: {
    textAlign: "right",
    paddingRight: "5px",
    paddingLeft: "5px"
  },
  horizontalLeft: {
    textAlign: "left",
    paddingRight: "5px",
    paddingLeft: "5px"
  }
};

class CustomInputForm extends React.Component {

  
  render() {
    const { classes, input } = this.props;
    return (       
            <input 
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  };
                }}
                onKeyPress={e => {
                  if (e.keyCode === 13) {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  };
                }}
                type="text" 
                className={ classes.inputTable + " " + classes.horizontalLeft } 
                style={{ width: '100%' }}  
                onChange={input.onChange} 
                value={input.value} 
            />                       
    );
  }
}


export default withStyles(styles)(CustomInputForm);
