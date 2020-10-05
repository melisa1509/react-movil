import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SuccessBold from "components/Typography/SuccessBold.jsx";
import MutedText from "components/Typography/Muted.jsx";
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';
import RevisionForm from './RevisionForm.jsx';
import {optionQualityLife} from './OptionQualityLife.jsx';
import {adjustCoordinates} from "assets/functions/general.jsx";

import { translate } from 'react-switch-lang';


const styles = {
    cardTitleCenter:{
        textAlign: "center"
      },
    textareaProcess:{
        border: "0px",
        resize: "auto",
        height: "auto !important",
        lineHeight: "1.42857 !important",
        overflow: "auto",
        margin: "0",
        fontFamily: "inherit",
    }, 
};


class ProcessTab extends React.Component {

  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    
    return (
          <CardBody style={{ width: '800px', overflow: 'auto'}}>
            <h3 className={classes.cardTitleCenter} >{t("title_quality_life")}</h3>
            <br/>
            <SuccessBold>
                {t("label_quality")}
            </SuccessBold>
            <br/>
            <GridContainer justify="center" className={classes.cardTitleCenter}>
                <GridItem xs={12} sm={12} md={12}>
                  <svg width={300} height={30}>
                    <text id="qualityP1Text" x={135} y={30} fill="black" fontSize={15} fontWeight="bold" >P1</text>
                  </svg>
                
              <svg width={330} height={330}>
                <circle cx={160} cy={160} r={150} stroke="#8ba8a7" strokeWidth={1} fill="#c2cfd0" />
                <circle cx={160} cy={160} r={130} stroke="#8ba8a7" strokeWidth={1} fill="#c2cfd0" />
                <circle cx={160} cy={160} r={110} stroke="#8ba8a7" strokeWidth={1} fill="#c2cfd0" />
                <circle cx={160} cy={160} r={90} stroke="#8ba8a7" strokeWidth={1} fill="#ffffff" />
                <circle cx={160} cy={160} r={40} stroke="#8ba8a7" strokeWidth={1} fill="#ffffff" />
                <line x1={160} y1={10} x2={160} y2={310} style={{
                      stroke: '#a0a0a0',
                      strokeWidth: 1
                    }} />
                <line x1={10} y1={160} x2={310} y2={160} style={{
                      stroke: '#a0a0a0',
                      strokeWidth: 1
                    }} />
                <line x1={266} y1={266} x2={54} y2={54} style={{
                      stroke: '#a0a0a0',
                      strokeWidth: 1
                    }} />
                <line x1={54} y1={266} x2={266} y2={54} style={{
                      stroke: '#a0a0a0',
                      strokeWidth: 1
                    }} />
                <rect x={154} y={4} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={12} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <rect x={154} y={24} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={32} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={154} y={44} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={52} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={154} y={64} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={72} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={154} y={114} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={122} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={183} y={127} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={186} y={135} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={218} y={92} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={221} y={100} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={233} y={77} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={236} y={85} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={247} y={63} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={250} y={71} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={261} y={49} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={264} y={57} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <rect x={194} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={197} y={162} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={244} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={247} y={162} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={264} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={267} y={162} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={284} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={287} y={162} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={304} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={307} y={162} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <rect x={183} y={183} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={186} y={191} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={218} y={218} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={221} y={226} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={232} y={232} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={235} y={240} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={247} y={247} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={250} y={255} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={261} y={261} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={264} y={269} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <rect x={154} y={194} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={202} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={154} y={244} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={252} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={154} y={264} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={272} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={154} y={284} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={292} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={154} y={304} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={157} y={312} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <rect x={128} y={182} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={131} y={190} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={92} y={218} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={95} y={226} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={78} y={232} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={81} y={240} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={63} y={247} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={66} y={255} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={49} y={261} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={52} y={269} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <rect x={114} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={117} y={162} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={64} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={67} y={162} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={44} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={47} y={162} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={24} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={27} y={162} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={4} y={154} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={7} y={162} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <rect x={127} y={127} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={130} y={135} fill="#21393c" fontSize={8} fontWeight="bold">1</text>
                <rect x={92} y={92} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={95} y={100} fill="#21393c" fontSize={8} fontWeight="bold">2</text>
                <rect x={78} y={78} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={81} y={86} fill="#21393c" fontSize={8} fontWeight="bold">3</text>
                <rect x={63} y={63} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={66} y={71} fill="#21393c" fontSize={8} fontWeight="bold">4</text>
                <rect x={49} y={49} width={10} height={10} style={{
                      fill: '#dae0db',
                      strokeWidth: 1,
                      stroke: '#325457'
                    }} />
                <text x={52} y={57} fill="#21393c" fontSize={8} fontWeight="bold">5</text>
                <polygon id="red_line" points={adjustCoordinates(programmbs.quality_q1) + " "+ adjustCoordinates(programmbs.quality_q2) + " "+ adjustCoordinates(programmbs.quality_q3) + " "+ adjustCoordinates(programmbs.quality_q4) + " "+ adjustCoordinates(programmbs.quality_q5) + " "+ adjustCoordinates(programmbs.quality_q6) + " "+ adjustCoordinates(programmbs.quality_q7) + " "+ adjustCoordinates(programmbs.quality_q8)} style={{
                      fill: 'none',
                      stroke: 'red',
                      strokeWidth: 3,
                      fillRule: 'evenodd'
                    }} />
                <text id="qualityP4Text" x={275} y={266} fill="black" fontSize={14} fontWeight="bold">P4</text>
                <text id="qualityP3Text" x={300} y={145} fill="black" fontSize={14} fontWeight="bold">P3</text>
                <text id="qualityP2Text" x={275} y={52} fill="black" fontSize={14} fontWeight="bold">P2</text>
                <text id="qualityP6Text" x={30} y={266} fill="black" fontSize={14} fontWeight="bold">P6</text>
                <text id="qualityP7Text" x={0} y={145} fill="black" fontSize={14} fontWeight="bold">P7</text>
                <text id="qualityP8Text" x={30} y={52} fill="black" fontSize={14} fontWeight="bold">P8</text>
                <text id="qualityP5Text" x={150} y={330} fill="black" fontSize={14} fontWeight="bold">P5</text>
              </svg>
           
              </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp1")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p1}
                    </MutedText>
                    <MutedText>
                      { programmbs.quality_q1 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q1))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg1")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_g1}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp2")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p2}
                    </MutedText>
                    <MutedText>
                      {programmbs.quality_q2 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q2))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg2")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_g3}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp3")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p3}
                    </MutedText>
                    <MutedText>
                      {programmbs.quality_q3 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q3))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg3")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_g3}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp4")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p4}
                    </MutedText>
                    <MutedText>
                      {programmbs.quality_q4 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q4))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg4")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_g4}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp5")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p5}
                    </MutedText>
                    <MutedText>
                      {programmbs.quality_q5 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q5))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg5")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_g5}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp6")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p6}
                    </MutedText>
                    <MutedText>
                      {programmbs.quality_q6 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q6))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg6")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_g6}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp7")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p7}
                    </MutedText>
                    <MutedText>
                      {programmbs.quality_q7 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q7))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg7")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_g7}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <GridContainer className={classes.cardTitleCenter}>
              <GridItem xs={12} sm={12} md={12}>
                <SuccessBold >
                  {t("question_qualityp8")}
                </SuccessBold>
              </GridItem>
          </GridContainer>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.quality_p8}
                    </MutedText>
                    <MutedText>
                      {programmbs.quality_q8 !== undefined ? "" : t(optionQualityLife(programmbs.quality_q8))}
                    </MutedText>
                </GridItem>
          </GridContainer>
          <br/>
          <SuccessBold>
            {t("question_qualityg8")}
          </SuccessBold>
          <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MutedText>
                      {programmbs.qualityg8}
                    </MutedText>
                </GridItem>
          </GridContainer>

            <RevisionForm name="revisionquality" labelText={t("label_revision_quality")+ " *"}/>
            <Controls/>
            <ControlNavigation previous={"paperwork"} next={"service"} />
          </CardBody>
    );
  }
}

ProcessTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs
});

const mapDispatchToPropsActions = dispatch => ({
});


const ProcessTabComponent = translate(withStyles(styles)(ProcessTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(ProcessTabComponent);