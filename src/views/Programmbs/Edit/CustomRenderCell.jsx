import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputTable from 'components/CustomInput/CustomInputTable.jsx';
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
  }
};




class CustomRenderCell extends React.Component {

  
  render() {
    const { classes, data, widthColums, cellStyles, nameField } = this.props;
    return (
        <tr>
            {
                data.map((prop, key) => {
                    if(key === 0){
                        return (
                            <td className={ cellStyles} key={key}>
                                {prop}
                            </td>
                        );
                    }
                    else{
                        return (
                            <td className={ classes.tdTable + " "+ classes.verticalCenter } style={{ width: widthColums[key] }} key={key}>
                                <Field
                                component={CustomInputTable}
                                name={nameField + "[" + (key - 1) + "]]"}
                                />
                            </td>
                        );
                    }
                    
                    
                })
            }
        </tr>
    );
  }
}

CustomRenderCell = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(CustomRenderCell);


CustomRenderCell = connect(
  state => ({
    initialValues: state.programmbsReducer.data, 
  }),
  {  }, 
)(CustomRenderCell);


export default translate(withStyles(styles)(CustomRenderCell));
