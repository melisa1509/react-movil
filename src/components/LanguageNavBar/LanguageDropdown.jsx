import React from 'react';

import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';

import { Link } from "react-router-dom";
import { translate } from 'react-switch-lang';
import { setDefaultLanguage, getDefaultLanguage, getLanguage, setLanguage } from 'react-switch-lang';

import usFlag from "assets/img/flags/US.png";
import esFlag from "assets/img/flags/ES.png";
import brFlag from "assets/img/flags/BR.png";
import frFlag from "assets/img/flags/FR.png";
import { ContactSupportOutlined } from '@material-ui/icons';

class Dropdown extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props; 
      // we use this to make the card to appear after the page has been rendered
      this.state = {
        selectedLanguage : <span><img src={usFlag} alt="..."/>{" " + t('label_english')}</span>
      };
    }
  
    handleLanguage(lang){
        setLanguage(lang);        
    }
  
    render() {
      const { classes, t, route } = this.props;
      let selectedLanguage = <span><img src={usFlag} alt="..."/>{" " + t('label_english')}</span>;
      switch (getLanguage()) {
        case 'en':
            selectedLanguage = <span><img src={usFlag} alt="..."/>{" " + t('label_english')}</span>;
            break;
        case 'es':
            selectedLanguage = <span><img src={esFlag} alt="..."/>{" " + t('label_spanish')}</span>;
            break;
        case 'fr':
            selectedLanguage = <span><img src={frFlag} alt="..."/>{" " + t('label_french')}</span>;
            break;
        case 'pt':
            selectedLanguage = <span><img src={brFlag} alt="..."/>{" " + t('label_portuguese')}</span>;
            break;
       
    }
      return (
        <div>      
            <CustomDropdown
                buttonProps={{
                    color: "transparent"
                }}
                buttonText={selectedLanguage}
                dropdownList={[
                    <Link to={route} onClick={() => this.handleLanguage('en')}><span><img src={usFlag} alt="..."/>{" " + t('label_english')}</span></Link>,
                    <Link to={route} onClick={() => this.handleLanguage('es')}><span><img src={esFlag} alt="..."/>{" " + t('label_spanish')}</span></Link>,
                    <Link to={route} onClick={() => this.handleLanguage('fr')}><span><img src={frFlag} alt="..."/>{" " + t('label_french')}</span></Link>,
                    <Link to={route} onClick={() => this.handleLanguage('pt')}><span><img src={brFlag} alt="..."/>{" " + t('label_portuguese')}</span></Link>,         
                ]}
            />
        </div>
      );
    }
  }
  
  export default translate(Dropdown);
  