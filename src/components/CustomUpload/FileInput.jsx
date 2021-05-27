import React from "react";
import {ProgressBar} from 'react-bootstrap';
import { BASE_URL} from 'constants/urlTypes.jsx';
import axios from 'axios';
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

import customInputStyle from "assets/jss/material-dashboard-pro-react/components/customInputStyleFile.jsx";



class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupnameState: "success",
            interweaveLocalState: "success",
            authorizationCodeState: "success",
            uploadPercentage: 0,
        };
    }

    uploadFile = ({ target: { files } }) =>{
      let data = new FormData();
     

     for (let index = 0; index < files.length; index++) {
      data.append( 'file[]', files[index] );
     }

      const options = {
        onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent;
          let percent = Math.floor( (loaded * 100) / total )
  
          if( percent < 100 ){
            this.setState({ uploadPercentage: percent })
          }
        }
      }
  
      axios.post(BASE_URL + "/file/upload", data, options).then(res => { 
          this.props.changeFileName(res.data.data);
          this.setState({ uploadPercentage: 100 }, ()=>{
            setTimeout(() => {
              this.setState({ uploadPercentage: 0 })
            }, 1000);
          })
      })
    }     
    
      
    render() {
        const {uploadPercentage} = this.state;
        const {
          classes,
          formControlProps,
          labelText,
          id,
          labelProps,
          inputProps,
          error,
          white,
          inputRootCustomClasses,
          success,
          helperText,
          input,
          value
        } = this.props; 
        const labelClasses = classNames({
          [" " + classes.labelRootError]: error,
          [" " + classes.labelRootSuccess]: success && !error
        });
        const underlineClasses = classNames({
          [classes.underlineError]: error,
          [classes.underlineSuccess]: success && !error,
          [classes.underline]: true,
          [classes.whiteUnderline]: white
        });
        const marginTop = classNames({
          [inputRootCustomClasses]: inputRootCustomClasses !== undefined
        });
        const inputClasses = classNames({
          [classes.input]: true,
          [classes.whiteInput]: white
        });
        var formControlClasses;
        if (formControlProps !== undefined) {
          formControlClasses = classNames(
            formControlProps.className,
            classes.formControl
          );
        } else {
          formControlClasses = classes.formControl;
        }
        var helpTextClasses = classNames({
          [classes.labelRootError]: error,
          [classes.labelRootSuccess]: success && !error
        });
        return (
            <FormControl {...formControlProps} className={formControlClasses}>
                <input type="file" onChange={this.uploadFile} multiple />
                {labelText !== undefined ? (
                <InputLabel
                  className={classes.labelRoot + " " + labelClasses}
                  htmlFor={id}
                  {...labelProps}
                >
                  {labelText}
                 
                  </InputLabel>
                ) : null}
                <input
                 
                  id={id}
                  type="hidden" 
                  value={input.value} 
                  onChange={input.onChange} 
                />
                {helperText !== undefined ? (
                  <FormHelperText id={id + "-text"} className={helpTextClasses}>
                    {helperText}
                  </FormHelperText>
                ) : null}
                { uploadPercentage > 0 &&
                <div>
                <ProgressBar animated now={20} active label={`${uploadPercentage}%`} />
                <CustomLinearProgress variant="determinate" color="info" value={uploadPercentage} /> 
                </div>
                }  
                                          
            </FormControl>
        );
    }
}

FileInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node
};

  
export default withStyles(customInputStyle)(FileInput);



