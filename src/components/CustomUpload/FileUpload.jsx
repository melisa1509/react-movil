import React from "react";
import {ProgressBar} from 'react-bootstrap';
import { BASE_URL} from 'constants/urlTypes.jsx';
import axios from 'axios';
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";



class FileUpload extends React.Component {
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
        const { input} = this.props;
        const {uploadPercentage} = this.state;
        return (
            <div>
                <input type="file" onChange={this.uploadFile} multiple />
                <input type="hidden" value={input.value} onChange={input.onChange} />
                { uploadPercentage > 0 &&
                <div>
                <ProgressBar animated now={20} active label={`${uploadPercentage}%`} />
                <CustomLinearProgress variant="determinate" color="info" value={uploadPercentage} /> 
                </div>
                }  
                                          
            </div>
        );
    }
}

  
export default  FileUpload;



