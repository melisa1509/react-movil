import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { store } from "store";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomRadio from 'components/CustomRadio/CustomRadio.jsx';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import MutedText from "components/Typography/Muted.jsx";
import Controls from './Controls.jsx';
import RevisionForm from './RevisionForm.jsx';

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
    const { classes, data, widthColums, cellStyles } = this.props;
    return (
        <tr>
            {
                data.map((prop, key) => {
                    if(key === 0){
                        return (
                            <td className={ cellStyles}>
                                {prop}
                            </td>
                        );
                    }
                    else{
                        return (
                            <td className={ classes.tdTable + " "+ classes.verticalCenter } style={{ width: widthColums[key] }}>
                                <input type="text" className={ classes.inputTable } style={{ width: '100%' }} defaultValue={prop} />
                            </td>
                        );
                    }
                    
                    
                })
            }
        </tr>
    );
  }
}

CustomRenderCell.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
});

const mapDispatchToPropsActions = dispatch => ({
});


const CustomRenderCellComponent = translate(withStyles(styles)(CustomRenderCell));
export default connect(mapStateToProps, mapDispatchToPropsActions)(CustomRenderCellComponent);