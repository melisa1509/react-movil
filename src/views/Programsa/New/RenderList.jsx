import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

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
  },
};




class RenderList extends React.Component {

  
  render() {
    const { classes, fields } = this.props;      
       
    return (
    <GridContainer>        
      {
          fields.map((row, index) => (
            <GridItem xs={12} sm={12} md={12}>
                <Field
                component={CustomInputRedux}
                name={row}
                key={index}
                /> 
            </GridItem>
          ))          
      }        
    </GridContainer>
    );
  }
}

RenderList = reduxForm({
  form: 'programsa',
  enableReinitialize: true,
})(RenderList);

RenderList = connect(
  state => ({
    initialValues: state.programsaReducer.data, 
  }),
  {  }, 
)(RenderList);

export default translate(withStyles(styles)(RenderList));
