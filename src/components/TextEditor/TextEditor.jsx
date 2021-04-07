import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import { Editor } from '@tinymce/tinymce-react';


import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

class TextEditor extends React.Component {
  
  render() {
    const { input, height, width, lang } = this.props;
    return (
      
            <FormControl >
                <Editor
                    apiKey='ciub0gjh4346udf5npj2yg77rt2ewkl162hcxz8cwn2z88io'
                    initialValue=""
                    init={{
                      language: lang,
                      menubar: 'file edit format',
                      plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                      toolbar: 'bold italic | fontsizeselect numlist bullist | alignleft aligncenter alignright alignjustify |',
                      toolbar_sticky: false,
                      autosave_ask_before_unload: true,
                      autosave_interval: '30s',
                      autosave_prefix: '{path}{query}-{id}-',
                      autosave_restore_when_empty: false,
                      autosave_retention: '2m',
                      image_advtab: true,
                      branding:false,
                      width:  (window.innerWidth - 45),
                      height: 600,
                      mobile: {
                        menubar: true
                      }
                    }}
                    value={input.value}
                    onEditorChange={input.onChange}
                />
            </FormControl>
    );
  }
}

TextEditor.propTypes = {
  classes: PropTypes.object
};

export default withStyles(extendedFormsStyle)(TextEditor);
