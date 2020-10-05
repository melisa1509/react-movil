import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import CustomInputTable from 'components/CustomInput/CustomInputTable.jsx';
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputForm from 'components/CustomInput/CustomInputForm.jsx';

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




class RenderCellTable extends React.Component {

  
  render() {
    const { classes, widthColums, fields, numColums } = this.props;      
    const numColumsPaperwork4 = fields.length / numColums;
    const rowsPaperwork4 = [];
    let row = [];
    let cons = 0;
    for (let index = 0; index < numColumsPaperwork4; index++) {
      row = [];
      for (let i = 0; i < numColums; i++) {
        row[i] = cons;    
        cons++;    
      }
      rowsPaperwork4.push(row);     
    }
    const nameArray = fields.name.replace("]", "");
    
    return (
    <>
      {
          rowsPaperwork4.map((row, index) => (
            <tr key={index}>
              {
                row.map((code, index) => (
                  <td className={ classes.tdTable + " "+ classes.verticalCenter  } style={{ width: widthColums[index] }} key={code}>
                    <Field
                    component={CustomInputForm}
                    name={nameArray + "["+ code + "]]"}
                    key={code}
                    />
                  </td>
                ))
              }
              
            </tr>
          ))
          
      }
    </>
    );
  }
}

RenderCellTable = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(RenderCellTable);

RenderCellTable = connect(
  state => ({
  }),
  {  }, 
)(RenderCellTable);

export default translate(withStyles(styles)(RenderCellTable));
