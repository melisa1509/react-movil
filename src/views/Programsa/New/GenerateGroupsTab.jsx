import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import CustomInputTable from 'components/CustomInput/CustomInputTable.jsx';
import Badge from "components/Badge/Badge.jsx";
import { loadFormProgramsa } from "actions/programsaActions.jsx";
import { Field, FieldArray, reduxForm, arrayPush, arrayPop } from 'redux-form';
import Button from "components/CustomButtons/Button.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import RenderList from './RenderList.jsx';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckboxRedux.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import Primary from "components/Typography/Primary.jsx";
import Controls from './Controls.jsx';

import { translate } from 'react-switch-lang';
import { AddCircle, RemoveCircle } from "@material-ui/icons";


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
    padding: "10px",
  },
  tdBold:{
    fontWeight: "bold",
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  textAlignRight:{
    textAlign: "Right"
  }
};




class GenerateGroupsTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  addRown = () => {    
    this.props.pushArray('programsa', "generate_groups3", "");    
  }

  removeRow = () => {    
    this.props.popArray('programsa', "generate_groups3");          
  }

  render() {
    const { classes, programsa } = this.props;
    let { t } = this.props;
    
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_generate_groups")}</h3>
            <Field
                  labelText={t("question_generateGroups1")}
                  component={CustomInputRedux}
                  name="generate_groups1"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
              />
            <br/>
              <Field
                  labelText={t("question_generateGroups2")}
                  component={CustomInputRedux}
                  name="generate_groups2"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
              />
            <br/>            
            <SuccessBold>
                  {t("question_generateGroups3")}
            </SuccessBold>
            {             
              <FieldArray name="generate_groups3" component={RenderList} />               
            }
            <br/>
                  <Button simple color="tumblr" onClick={this.removeRow}>
                    <RemoveCircle/>{t("button_remove_row")}
                  </Button>
                  <Button simple color="twitter" onClick={this.addRown}>
                    <AddCircle/>{t("button_add_row")}
                  </Button>                      
            <br/>
            <Field
                  labelText={t("question_generateGroups4")}
                  component={CustomInputRedux}
                  name="generate_groups4"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
              />
            <br/>
            <Field
                  labelText={t("question_generateGroups5")}
                  component={CustomInputRedux}
                  name="generate_groups5"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
              />                     
                <br/>
               
            { programsa.revisionGenerateGroups !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programsa.revisionGenerateGroups}</p>                
              </div>
              :""
            }
            <br/>
            <Controls/>
          </CardBody>
        </Card>
    );
  }
}

GenerateGroupsTab = reduxForm({
  form: 'programsa',
  enableReinitialize: true,
})(GenerateGroupsTab);

GenerateGroupsTab = connect(
  state => ({
    programsa: state.programsaReducer.programsa
  }),
  { load: loadFormProgramsa, pushArray: arrayPush, popArray: arrayPop}, 
)(GenerateGroupsTab);


export default translate(withStyles(styles)(GenerateGroupsTab));
