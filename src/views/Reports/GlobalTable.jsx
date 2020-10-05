import React from "react";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { translate } from 'react-switch-lang';
import { VectorMap } from "react-jvectormap";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { getReports, getReportGlobalMap } from "actions/reportActions.jsx";

const bo_flag = require("assets/img/flags/BO.png");
const de_flag = require("assets/img/flags/DE.png");
const co_flag = require("assets/img/flags/CO.png");
const bj_flag = require("assets/img/flags/BJ.png");
const cd_flag = require("assets/img/flags/CD.png");
const cm_flag = require("assets/img/flags/CM.png");
const hn_flag = require("assets/img/flags/HN.png");
const ng_flag = require("assets/img/flags/NG.png");
const cl_flag = require("assets/img/flags/CL.png");
const lr_flag = require("assets/img/flags/LR.png");
const mx_flag = require("assets/img/flags/MX.png");
const et_flag = require("assets/img/flags/ET.png");
const cg_flag = require("assets/img/flags/CG.png");
const tg_flag = require("assets/img/flags/TG.png");
const ml_flag = require("assets/img/flags/ML.png");
const ug_flag = require("assets/img/flags/UG.png");
const pe_flag = require("assets/img/flags/PE.png");
const ht_flag = require("assets/img/flags/HT.png");
const py_flag = require("assets/img/flags/PY.png");
const gt_flag = require("assets/img/flags/GT.png");
const in_flag = require("assets/img/flags/IN.png");
const ar_flag = require("assets/img/flags/AR.png");
const pt_flag = require("assets/img/flags/PT.png");
const br_flag = require("assets/img/flags/BR.png");
const tr_flag = require("assets/img/flags/TR.png");
const us_flag = require("assets/img/flags/US.png");
const mg_flag = require("assets/img/flags/MG.png");

var mapData = {
  CA: 0
};
var CountryEntire=false

class GlobalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
    this.saveClick = this.saveClick.bind(this);
  }

  saveClick() {
    CountryEntire=true
  }
  
  componentWillMount() {
    this.props.dispatchGetReportGlobalMap();
  }
  render() {
    const { report_list, global_map} = this.props;
    let { t } = this.props;
    let vector_map = mapData;
    if(global_map !== undefined){
      if(global_map.numCountries !== undefined){
        vector_map = global_map.numCountries
      }
    }

    const country = global_map.topNumbers.map((prop)=>{
      let TableData=new Array()
      return(
        TableData=prop.country
      );
    });
    const mbs = global_map.topNumbers.map((prop)=>{
      let TableData=new Array()
      return(
        TableData=prop.mbs
      );
    });
    const sa = global_map.topNumbers.map((prop)=>{
      let TableData=new Array()
      return(
        TableData=prop.sa
      );
    });
    const jr = global_map.topNumbers.map((prop)=>{
      let TableData=new Array()
      return(
        TableData=prop.jr
      );
    });

    if(CountryEntire == true){
      const country = report_list.topNumbers2.map((prop)=>{
        let TableData=new Array()
        return(
          TableData=prop.country
        );
      });
      const mbs = report_list.topNumbers2.map((prop)=>{
        let TableData=new Array()
        return(
          TableData=prop.mbs
        );
      });
      const sa = report_list.topNumbers2.map((prop)=>{
        let TableData=new Array()
        return(
          TableData=prop.sa
        );
      });
     return (
      <GridContainer justify="space-between">
        <GridItem xs={12} sm={12} md={12}>
          <Table
            tableData={[
              [
                <img src={bo_flag} alt="bo_flag" key={"flag"} />,
                country[0],
                mbs[0],
                sa[0],
                jr[0]
              ],
              [
                <img src={de_flag} alt="us_flag" key={"flag"} />,
                country[1],
                mbs[1],
                sa[1],
                jr[1]
              ],
              [
                <img src={co_flag} alt="co_flag" key={"flag"} />,
                country[2],
                mbs[2],
                sa[2],
                jr[2],
              ],
              [
                <img src={bj_flag} alt="bj_flag" key={"flag"} />,
                country[3],
                mbs[3],
                sa[3],
                jr[3]
              ],
              [
                <img src={cd_flag} alt="cd_flag" key={"flag"} />,
                country[4],
                mbs[4],
                sa[4],
                jr[4]
              ],
              [
                <img src={cm_flag} alt="cm_flag" key={"flag"} />,
                country[5],
                mbs[5],
                sa[5],
                jr[5]
              ],
              [
                <img src={hn_flag} alt="hn_flag" key={"flag"} />,
                country[6],
                mbs[6],
                sa[6],
                jr[6]
              ],
              [
                <img src={ng_flag} alt="ng_flag" key={"flag"} />,
                country[7],
                mbs[7],
                sa[7],
                jr[7]
              ],
              [
                <img src={cl_flag} alt="cl_flag" key={"flag"} />,
                country[8],
                mbs[8],
                sa[8]
              ],
              [
                <img src={lr_flag} alt="lr_flag" key={"flag"} />,
                country[9],
                mbs[9],
                sa[9]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[10],
                mbs[10],
                sa[10]
              ],
              [
                <img src={et_flag} alt="et_flag" key={"flag"} />,
                country[11],
                mbs[11],
                sa[11]
              ],
              [
                <img src={cg_flag} alt="cg_flag" key={"flag"} />,
                country[12],
                mbs[12],
                sa[12]
              ],
              [
                <img src={tg_flag} alt="tg_flag" key={"flag"} />,
                country[13],
                mbs[13],
                sa[13]
              ],
              [
                <img src={ml_flag} alt="ml_flag" key={"flag"} />,
                country[14],
                mbs[14],
                sa[14]
              ],
              [
                <img src={ug_flag} alt="ug_flag" key={"flag"} />,
                country[15],
                mbs[15],
                sa[15]
              ],  
              [
                <img src={pe_flag} alt="pe_flag" key={"flag"} />,
                country[16],
                mbs[16],
                sa[16]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[17],
                mbs[17],
                sa[17]
              ],
              [
                <img src={ht_flag} alt="ht_flag" key={"flag"} />,
                country[18],
                mbs[18],
                sa[18]
              ],
              [
                <img src={py_flag} alt="py_flag" key={"flag"} />,
                country[19],
                mbs[19],
                sa[19]
              ],
              [
                <img src={gt_flag} alt="gt_flag" key={"flag"} />,
                country[20],
                mbs[20],
                sa[20]
              ],
              [
                <img src={in_flag} alt="in_flag" key={"flag"} />,
                country[21],
                mbs[21],
                sa[21]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[22],
                mbs[22],
                sa[22]
              ],
              [
                <img src={ar_flag} alt="ar_flag" key={"flag"} />,
                country[23],
                mbs[23],
                sa[23]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[24],
                mbs[24],
                sa[24]
              ],
              [
                <img src={pt_flag} alt="pt_flag" key={"flag"} />,
                country[25],
                mbs[25],
                sa[25]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[26],
                mbs[26],
                sa[26]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[27],
                mbs[27],
                sa[27]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[28],
                mbs[28],
                sa[28]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[29],
                mbs[29],
                sa[29]
              ],
              [
                <img src={br_flag} alt="br_flag" key={"flag"} />,
                country[30],
                mbs[30],
                sa[30]
              ],
              [
                <img src={mx_flag} alt="mx_flag" key={"flag"} />,
                country[31],
                mbs[31],
                sa[31]
              ],
              [
                <img src={br_flag} alt="br_flag" key={"flag"} />,
                country[32],
                mbs[32],
                sa[32]
              ],
              [
                <img src={tr_flag} alt="tr_flag" key={"flag"} />,
                country[33],
                mbs[33],
                sa[33]
              ],
              [
                <img src={us_flag} alt="us_flag" key={"flag"} />,
                country[34],
                mbs[34],
                sa[34]
              ],
              [
                <img src={mg_flag} alt="mg_flag" key={"flag"} />,
                country[35],
                mbs[35],
                sa[35]
              ],
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <VectorMap
            map={"world_mill"}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "290px"
            }} 
            containerClassName="map"
            regionStyle={{
              initial: {
                fill: "#e4e4e4",
                "fill-opacity": 0.9,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 0
              }
            }}
            series={{
              regions: [
                {
                  values: vector_map,
                  scale: ["#A4BDC6", "#153845"],
                  normalizeFunction: "polynomial"
                }
              ]
            }}
            onRegionTipShow = {function(e, el, code){
              el.html(el.html()+' ('+vector_map[code]+')')} 
            }
          />
        </GridItem>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <center>
                <Button color="default" size="sm" onClick={this.saveClick}>
                {t("button_hide_all_list")}
                </Button>
                {" "}
                </center>
            </GridItem>
        </GridContainer>
      </GridContainer>
    );
     
    }
    return (
      <GridContainer justify="space-between">
        <GridItem xs={12} sm={12} md={5}>
          <Table
            tableData={[
              [
                <img src={bo_flag} alt="bo_flag" key={"flag"} />,
                country[0],
                mbs[0],
                sa[0],
                jr[0]
              ],
              [
                <img src={de_flag} alt="us_flag" key={"flag"} />,
                country[1],
                mbs[1],
                sa[1],
                jr[1]
              ],
              [
                <img src={co_flag} alt="co_flag" key={"flag"} />,
                country[2],
                mbs[2],
                sa[2],
                jr[2]
              ],
              [
                <img src={bj_flag} alt="bj_flag" key={"flag"} />,
                country[3],
                mbs[3],
                sa[3],
                jr[3]
              ],
              [
                <img src={cd_flag} alt="cd_flag" key={"flag"} />,
                country[4],
                mbs[4],
                sa[4],
                jr[4]
              ],
              [
                <img src={cm_flag} alt="cm_flag" key={"flag"} />,
                country[5],
                mbs[5],
                sa[5],
                jr[5]
              ],
              [
                <img src={hn_flag} alt="hn_flag" key={"flag"} />,
                country[6],
                mbs[6],
                sa[6],
                jr[6]
              ],
              [
                <img src={ng_flag} alt="ng_flag" key={"flag"} />,
                country[7],
                mbs[7],
                sa[7],
                jr[7]
              ]
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <VectorMap
            map={"world_mill"}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "290px"
            }}
            containerClassName="map"
            regionStyle={{
              initial: {
                fill: "#e4e4e4",
                "fill-opacity": 0.9,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 0
              }
            }} 
            series={{
              regions: [
                {
                  values: vector_map,
                  scale: ["#A4BDC6", "#153845"],
                  normalizeFunction: "polynomial"
                }
              ]
            }}            
            onRegionTipShow = {function(e, el, code){
              el.html(el.html()+' ('+vector_map[code]+')')} 
            }
          />
        </GridItem>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <center>
                <Button color="default" size="sm" onClick={this.saveClick}>
                {t("button_show_entire_list")}
                </Button>
                {" "}
                </center>
            </GridItem>
        </GridContainer>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
    report_list: state.reportReducer.report_list,
    global_map: state.reportReducer.report_global_map
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetReports: () => dispatch( getReports() ),
  dispatchGetReportGlobalMap: () => dispatch( getReportGlobalMap() )
});

const GlobalTableComponent = translate(GlobalTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(GlobalTableComponent);

