import React from "react";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { translate } from 'react-switch-lang';

// core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import AmbassadorSelect from "views/Select/AmbassadorSelect.jsx";
import { getReportAmbassador } from "actions/reportActions.jsx";

import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const style = {
    ...customSelectStyle,
    ...validationFormsStyle
};

class AmbassadorTableReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  componentDidMount(){
    this.props.dispatchGetReportAmbassador();
  }
  render() {
    const {report_ambassador} = this.props;
    let { t } = this.props;

    const question = report_ambassador.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[[t(prop.question)]]
      );
    });
    const studentPre  = report_ambassador.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.studentsPre]
      );
    });
    const students  = report_ambassador.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.students]
      );
    });
    const percentagePre  = report_ambassador.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.percentagePre +"%"]
      );
    });
    const percentage = report_ambassador.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.percentage +"%" ]
      );
    });

    return (
      <GridContainer justify="center">
        <GridItem xs={12}>
        <br/> 
          <Table
              tableData={[
                [<th>Questions</th>,<th>PreEvaluations</th>," ",<th>PostEvaluations</th>," "],
                [question[0],studentPre[0], percentagePre[0],students[0],percentage[0]],
                [question[1],studentPre[1], percentagePre[1],students[1],percentage[1]],
                [question[2],studentPre[2], percentagePre[2],students[2],percentage[2]],
                [question[3],studentPre[3], percentagePre[3],students[3],percentage[3]],
                [question[4],studentPre[4], percentagePre[4],students[4],percentage[4]],
                [question[5],studentPre[5], percentagePre[5],students[5],percentage[5]],
                [question[6],studentPre[6], percentagePre[6],students[6],percentage[6]],
                [question[7],studentPre[7], percentagePre[7],students[7],percentage[7]],
                [question[8],studentPre[8], percentagePre[8],students[8],percentage[8]],
             ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      report_country: state.reportReducer.report_country,
      report_ambassador: state.reportReducer.report_ambassador,
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetReportAmbassador: () => dispatch( getReportAmbassador() )
});

const AmbassadorTableReportsComponent = translate(withStyles(style)(AmbassadorTableReports));
export default connect(mapStateToProps, mapDispatchToPropsActions)(AmbassadorTableReportsComponent);

