import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import CustomInputTable from 'components/CustomInput/CustomInputTable.jsx';
import Badge from "components/Badge/Badge.jsx";
import { loadFormProgrammbs, addRownP4 } from "actions/programmbsActions.jsx";
import { Field, FieldArray, reduxForm, arrayPush, arrayPop } from 'redux-form';
import Button from "components/CustomButtons/Button.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomRadioRedux from 'components/CustomRadio/CustomRadioRedux.jsx';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckboxRedux.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import Primary from "components/Typography/Primary.jsx";
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';
import RenderCellTable from './RenderCellTable.jsx';
import CustomRenderCell from './CustomRenderCell.jsx';

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




class PaperworkTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        p4_array_state: "initialState",
        p4_state: ["0", "1", "3", "4", "5","0", "1", "3", "4", "5"],
        count: 20
    };
  }

  addRownP4 = () => {    
    this.props.pushArray('programmbs', "paperwork4[p4_array]", "");
    this.props.pushArray('programmbs', "paperwork4[p4_array]", "");
    this.props.pushArray('programmbs', "paperwork4[p4_array]", "");
    this.props.pushArray('programmbs', "paperwork4[p4_array]", "");
    this.props.pushArray('programmbs', "paperwork4[p4_array]", "");
  }

  removeRowP4 = () => {    
    this.props.popArray('programmbs', "paperwork4[p4_array]");
    this.props.popArray('programmbs', "paperwork4[p4_array]");
    this.props.popArray('programmbs', "paperwork4[p4_array]");
    this.props.popArray('programmbs', "paperwork4[p4_array]");
    this.props.popArray('programmbs', "paperwork4[p4_array]");       
  }

  addRownP5 = () => {    
    this.props.pushArray('programmbs', "paperwork5[p5_array]", "");
    this.props.pushArray('programmbs', "paperwork5[p5_array]", "");
  }

  removeRowP5 = () => {    
    this.props.popArray('programmbs', "paperwork5[p5_array]");
    this.props.popArray('programmbs', "paperwork5[p5_array]");
  }

  addRownP6 = () => {    
    this.props.pushArray('programmbs', "paperwork6[p6_array]", "");
    this.props.pushArray('programmbs', "paperwork6[p6_array]", "");
  }

  removeRowP6 = () => {    
    this.props.popArray('programmbs', "paperwork6[p6_array]");
    this.props.popArray('programmbs', "paperwork6[p6_array]");
  }

  addRownP7 = () => {    
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
    this.props.pushArray('programmbs', "paperwork7[p7_array]", "");
  }

  removeRowP7 = () => {    
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
    this.props.popArray('programmbs', "paperwork7[p7_array]");
  }

  addRownP8 = () => {    
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
    this.props.pushArray('programmbs', "paperwork8[p8_array]", "");
  }

  removeRowP8 = () => {    
    this.props.popArray('programmbs', "paperwork8[p8_array]");
    this.props.popArray('programmbs', "paperwork8[p8_array]");
    this.props.popArray('programmbs', "paperwork8[p8_array]");
    this.props.popArray('programmbs', "paperwork8[p8_array]");
    this.props.popArray('programmbs', "paperwork8[p8_array]");
    this.props.popArray('programmbs', "paperwork8[p8_array]");
    this.props.popArray('programmbs', "paperwork8[p8_array]");
    this.props.popArray('programmbs', "paperwork8[p8_array]");
  }
  
  
  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    let counter = 1;
    const optionsPaperwork2 = {
         value: programmbs.paperwork2,
         options:[
            { label: t("label_paperwork2_option1"), val: "option1" },
            { label: t("label_paperwork2_option2"), val: "option2" },
            { label: t("label_paperwork2_option3"), val: "option3" },
            { label: t("label_paperwork2_option4"), val: "option4" }
         ]
    }

    const optionsPaperwork3 = {
        options:[
           { label: t("label_paperwork3_option1"), val: "paperwork3[option1]" },
           { label: t("label_paperwork3_option2"), val: "paperwork3[option2]" },
           { label: t("label_paperwork3_option3"), val: "paperwork3[option3]" },
        ]
    }

    const languages = {         
      options:[
        { label: t("label_english"),    val: "language_grader[en]"  },
        { label: t("label_spanish"),    val: "language_grader[es]"  },
        { label: t("label_french"),     val: "language_grader[fr]"  },
        { label: t("label_portuguese") , val: "language_grader[pr]"  },
      ]
    }

    const radios = {         
      options:[
        { label: t("label_english"),     val: "en"  },
        { label: t("label_spanish"),     val: "es"  },
        { label: t("label_french"),      val: "fr"  },
        { label: t("label_portuguese") , val: "pr"  },
      ]
    }
    
    let p4_array_state = this.state.p4_array_state;
    if(this.state.p4_array_state === "initialState"){
      p4_array_state = ["0", "1", "3", "4", "5","0", "1", "3", "4", "5","0", "1", "3", "4", "5"];
    }
       
    
    const widthColumsPaperwork4 = ["10%", "45%", "15%", "15%", "15%"];
    
    const widthColumsPaperwork5 = ["70%", "30%"];  
    
    const widthColumsPaperwork6 = ["70%", "30%"];    
   

    const titlePaperwork7 = [];
    const titleArray = Array.from(programmbs.paperwork7.p7_title);
    titleArray.unshift(t("label_month"));
    titlePaperwork7.push(titleArray);
    const widthColumsPaperwork7Title = ["28%","8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%"];


    const initialCapitalPaperwork7 = [];
    const initialCapitalArray = Array.from(programmbs.paperwork7.p7_initial_capital === undefined ? [] : programmbs.paperwork7.p7_initial_capital);
    initialCapitalArray.unshift(t("label_initial_capital"));
    initialCapitalPaperwork7.push(initialCapitalArray);
    const widthColumsPaperwork7InitialCapital = ["28%","8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%"];

    const arrayPaperwork7 = programmbs.paperwork7.p7_array.map((prop, key) => {
      return(
        {value: prop, key: key }
      )
    })
    const numColumsPaperwork7 = arrayPaperwork7.length / 10;
    const rowsPaperwork7 = [];
    const widthColumsPaperwork7 = ["28%","8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%"];
    let start7 = 0;
    let end7 = 9;
    for (let index = 0; index <= numColumsPaperwork7; index++) {
      rowsPaperwork7.push({start: start7, end: end7});
      start7 = start7 + 10;
      end7 = end7 + 10;
    }

    const incomePaperwork7 = [];
    const incomeArray = Array.from(programmbs.paperwork7.p7_income);
    incomeArray.unshift(t("label_total_income"));
    incomePaperwork7.push(incomeArray);

    const arrayPaperwork8 = programmbs.paperwork8.p8_array.map((prop, key) => {
      return(
        {value: prop, key: key }
      )
    })
    const numColumsPaperwork8 = arrayPaperwork8.length / 10;
    const rowsPaperwork8 = [];
    const widthColumsPaperwork8 = ["28%","8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%"];
    let start8 = 0;
    let end8 = 9;
    for (let index = 0; index <= numColumsPaperwork8; index++) {
      rowsPaperwork8.push({start: start8, end: end8});
      start8 = start8 + 10;
      end8 = end8 + 10;
    }

    const expensesPaperwork8 = [];
    const expensesArray = Array.from(programmbs.paperwork8.p8_expenses);
    expensesArray.unshift(t("label_total_expenses"));
    expensesPaperwork8.push(expensesArray);

    const earnings_losesPaperwork8 = [];
    const earnings_losesArray = Array.from(programmbs.paperwork8.p8_earnings_loses);
    earnings_losesArray.unshift(t("label_earnings_loses"));
    earnings_losesPaperwork8.push(earnings_losesArray);

    const balancePaperwork8 = [];
    const balanceArray = Array.from(programmbs.paperwork8.p8_balance);
    balanceArray.unshift(t("label_ending_balance"));
    balancePaperwork8.push(balanceArray);

    
    return (
      <CardBody style={{ overflow: 'auto' }}>
            <h3 className={classes.cardTitleCenter} >{t("title_paperwork")}</h3>
            
            <br/>
              <Field
                  labelText={t("question_paperwork1")}
                  component={CustomInputRedux}
                  name="paperwork1"
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
              {t("question_paperwork2")}
            </SuccessBold>
            <br/>
            <Field
                component={CustomRadioRedux}
                name="paperwork2"
                data={optionsPaperwork2}
              />
            <br/>
            <SuccessBold>
              {t("question_paperwork3")}
            </SuccessBold>
            <br/>
            <div>      
                  {
                      optionsPaperwork3.options.map((prop, key) => {
                       
                          return (
                            <Field
                              component={CustomCheckbox}
                              name={prop.val}
                              label={prop.label}                             
                            />
                            );
                      })
                  }
              </div>
            <br/>
            <h3 className={classes.cardTitleCenter}>{t("title_paperwork4")}</h3>
            <SuccessBold>{t("label_paperwork4")}</SuccessBold>
            <br/>
            <table className={classes.borderSpacing} id="table_paperwork4" style={{ width: '800px' }}>
              <thead>
                <tr>
                  <th className={classes.thBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter } colSpan={5}>
                    <h4>{t("title_paperwork4")}</h4>
                  </th>
                </tr>
                <tr>
                  <th className={classes.textCenter + " "+ classes.tdTable + " "+ classes.verticalCenter } style={{ width: '15%' }}>{t("th_paperwork4_date")}</th>
                  <th className={classes.textCenter + " "+ classes.tdTable + " "+ classes.verticalCenter }>{t("th_paperwork4_description")}</th>
                  <th className={classes.textCenter + " "+ classes.tdTable + " "+ classes.verticalCenter }>{t("th_paperwork4_expenses")}</th>
                  <th className={classes.textCenter + " "+ classes.tdTable + " "+ classes.verticalCenter }>{t("th_paperwork4_income")}</th>
                  <th className={classes.textCenter + " "+ classes.tdTable + " "+ classes.verticalCenter }>{t("th_paperwork4_balance")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter } colSpan={4}>{t("label_initial_capital")}</td>
                  <td className={classes.tdTable} style={{ width: '15%' }}>
                      <Field component={CustomInputTable} name="paperwork4[p4_initial_capital]" />
                  </td>
                </tr>
                {              
                  
                        <FieldArray name="paperwork4[p4_array]" numColums={5} component={RenderCellTable} widthColums={widthColumsPaperwork4} /> 
                    
                }
                <tr>
                  <td colSpan={5}>
                      <center>
                        <Button simple color="tumblr" onClick={this.removeRowP4}>
                          <RemoveCircle/>{t("button_remove_row")}
                        </Button>
                        <Button simple color="twitter" onClick={this.addRownP4}>
                          <AddCircle/>{t("button_add_row")}
                        </Button>                      
                      </center>
                  </td>                  
                </tr>
                <tr>
                  <td className={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter } colSpan={4}>{t("label_ending_balance")}</td>
                  <td className={classes.tdTable} style={{ width: '15%' }}>
                      <Field component={CustomInputTable} name="paperwork4[p4_balance]" />
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <br/>
            <br/>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <table className={classes.borderSpacing} style={{ width: '380px' }}>
                  <thead>
                    <tr>
                      <th className={classes.thBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter } colSpan={2}>
                        <h4 className="td-bold">{t("title_result_accounts")}</h4>
                      </th>
                    </tr>
                    <tr>
                      <td className={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter }>{t("label_initial_capital")}</td>
                      <td className={classes.tdTable} style={{ width: '15%' }}>
                          <Field component={CustomInputTable} name="paperwork5[p5_initial_capital]" />
                      </td>
                    </tr>
                    <tr>
                    <td className={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold  } colSpan={2}>{t("label_income")}</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        
                            <FieldArray name="paperwork5[p5_array]" numColums={2} component={RenderCellTable} widthColums={widthColumsPaperwork5} /> 
                          
                    }
                    <tr>
                      <td colSpan={2}>
                          <center>
                            <Button simple color="tumblr" onClick={this.removeRowP5}>
                              <RemoveCircle/>{t("button_remove_row")}
                            </Button>
                            <Button simple color="twitter" onClick={this.addRownP5}>
                              <AddCircle/>{t("button_add_row")}
                            </Button>                      
                          </center>
                      </td>                  
                    </tr>
                    <tr>
                      <td className={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold + " "+ classes.textAlignRight } style={{ width: '70%' }}>{t("label_total_income")}</td>
                      <td className={classes.tdTable} style={{ width: '30%' }}>
                          <Field component={CustomInputTable} name="paperwork5[p5_income]" />
                      </td>
                    </tr>
                <tr>
                <td className={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold  } colSpan={2}>{t("label_expenses")}</td>
                </tr>
                  {
                    
                        <FieldArray name="paperwork6[p6_array]" numColums={2} component={RenderCellTable} widthColums={widthColumsPaperwork6} /> 
                       
                  }
                <tr>
                  <td colSpan={2}>
                      <center>
                        <Button simple color="tumblr" onClick={this.removeRowP6}>
                          <RemoveCircle/>{t("button_remove_row")}
                        </Button>
                        <Button simple color="twitter" onClick={this.addRownP6}>
                          <AddCircle/>{t("button_add_row")}
                        </Button>                      
                      </center>
                  </td>                  
                </tr>
                <tr>
                <td className={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold + " "+ classes.textAlignRight } style={{ width: '70%' }}>{t("label_total_expenses")}</td>
                <td className={classes.tdTable} style={{ width: '30%' }}>
                      <Field component={CustomInputTable} name="paperwork6[p6_expenses]" />
                  </td>
                </tr>
                <tr>
                <td className={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter }>{t("label_earnings_loses")}</td>
                <td className={classes.tdTable} style={{ width: '30%' }}>
                <Field component={CustomInputTable} name="paperwork6[p6_earnings_loses]" />
                  </td>
                </tr>
                <tr>
                  <td className={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter }>{t("label_ending_balance")}</td>
                  <td className={classes.tdTable} style={{ width: '30%' }}>
                  <Field component={CustomInputTable} name="paperwork6[p6_balance]" />
                  </td>
                </tr>
              </tbody>
              </table>
              </GridItem>
            </GridContainer>
            <br/>
            <h3 className={classes.cardTitleCenter}>{t("label_paperwork3_option3")}</h3>
            <SuccessBold>{t("label_paperwork7")}</SuccessBold>
            <br/>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
              <table className={classes.borderSpacing} id="table_paperwork7" style={{ width: '1000px' }}>
                <thead>
                  <tr>
                    <th className={classes.thBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter} colSpan={10}>
                      <h4 className="td-bold">{t("label_paperwork3_option3")}</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    titlePaperwork7.map((prop,key) => {
                      return(
                            <CustomRenderCell data={prop} widthColums={widthColumsPaperwork7Title} nameField="paperwork7[p7_title"/>
                      )
                    })     
                  }
                
                  {
                    initialCapitalPaperwork7.map((prop,key) => {
                      return(
                            <CustomRenderCell data={prop} widthColums={widthColumsPaperwork7Title} cellStyles={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter} nameField="paperwork7[p7_initial_capital"/>
                      )
                    })     
                  }
                  <tr>
                      <td className={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold  } colSpan={10}>{t("label_income")}</td>
                  </tr>
                  {
                   
                            <FieldArray name="paperwork7[p7_array]" numColums={10} component={RenderCellTable} widthColums={widthColumsPaperwork7} />
                       
                  }
                  <tr>
                      <td colSpan={10}>
                          <center>
                            <Button simple color="tumblr" onClick={this.removeRowP7}>
                              <RemoveCircle/>{t("button_remove_row")}
                            </Button>
                            <Button simple color="twitter" onClick={this.addRownP7}>
                              <AddCircle/>{t("button_add_row")}
                            </Button>                      
                          </center>
                      </td>                  
                    </tr>
                  {
                    incomePaperwork7.map((prop,key) => {
                      return(
                            <CustomRenderCell data={prop} widthColums={widthColumsPaperwork7Title} cellStyles={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold + " "+ classes.textAlignRight } nameField="paperwork7[p7_income"/>
                      )
                    })     
                  }
                  <tr>
                      <td className={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold  } colSpan={10}>{t("label_expenses")}</td>
                  </tr>
                  {
                    
                        <FieldArray name="paperwork8[p8_array]" numColums={10} component={RenderCellTable} widthColums={widthColumsPaperwork8} />
                       
                  }
                  <tr>
                      <td colSpan={10}>
                          <center>
                            <Button simple color="tumblr" onClick={this.removeRowP8}>
                              <RemoveCircle/>{t("button_remove_row")}
                            </Button>
                            <Button simple color="twitter" onClick={this.addRownP8}>
                              <AddCircle/>{t("button_add_row")}
                            </Button>                      
                          </center>
                      </td>                  
                    </tr>
                  {
                    expensesPaperwork8.map((prop,key) => {
                      return(
                            <CustomRenderCell nameField="paperwork8[p8_expenses" data={prop} widthColums={widthColumsPaperwork7Title} cellStyles={classes.tdTable + " "+ classes.verticalCenter + " "+ classes.tdBold + " "+ classes.textAlignRight } />
                      )
                    })     
                  }
                  {
                    earnings_losesPaperwork8.map((prop,key) => {
                      return(
                            <CustomRenderCell nameField="paperwork8[p8_earnings_loses" data={prop} widthColums={widthColumsPaperwork7Title} cellStyles={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter} />
                      )
                    })     
                  }
                  {
                    balancePaperwork8.map((prop,key) => {
                      return(
                            <CustomRenderCell nameField="paperwork8[p8_balance"data={prop} widthColums={widthColumsPaperwork7Title} cellStyles={classes.tdBackgroundColor + " "+ classes.tdTable + " "+ classes.verticalCenter} />
                      )
                    })     
                  }
               
                  </tbody>
                </table>
              </GridItem>
            </GridContainer>            
            { programmbs.revisionpaperwork !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programmbs.revisionpaperwork}</p>                
              </div>
              :""
            }
            <br/>
            <Controls/>
            <ControlNavigation previous={"promotion"} next={"quality"} />
        </CardBody>
    );
  }
}

PaperworkTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(PaperworkTab);

PaperworkTab = connect(
  state => ({
    initialValues: state.programmbsReducer.data, 
    programmbs: state.programmbsReducer.programmbs
  }),
  { load: loadFormProgrammbs, pushArray: arrayPush, popArray: arrayPop}, 
)(PaperworkTab);


export default translate(withStyles(styles)(PaperworkTab));
