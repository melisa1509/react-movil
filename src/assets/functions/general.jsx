import moment from "moment";

// function that transform json values checkbox selected in to array
export const jsonToArray = (jsonValues) => {
    var arrayValues = [];
    for( let prop in jsonValues){
        if(jsonValues[prop] === true ){
            arrayValues.push(prop);
        }
    }
    return arrayValues;
}

export const adjustCoordinates = (coordinates) => {
    var arrayCoordinates = coordinates.split(",");
    var adjust_coordinates = parseInt(arrayCoordinates[0], 10) - 115;
    return adjust_coordinates + "," + arrayCoordinates[1];
}

export const adjustDate = value => {
    let date = new Date(value)
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return date;
}

export const showDate = ( time = new Date() , prefix = "") => {
    const date_options = {  year: 'numeric', month: 'short', day: 'numeric' };
    const date =  typeof time === "object" ? time : new Date (time.slice(0,10).split("-") ) ;
    if(checkBrowser()){
        let updated_at=[];      
        updated_at[9] = time[3];
        updated_at[8] = time[2];
        updated_at[7] = time[1];
        updated_at[6] = time[0];
        
        updated_at[5] = time[4];

        updated_at[4] = time[6];
        updated_at[3] = time[5];
        
        updated_at[2] = time[7];

        updated_at[1] = time[9];
        updated_at[0] = time[8];

        return updated_at;
    }
    else{
        return moment(date).format('DD-MMM-YYYY');
    }
    
}

export const monthDate = ( time = new Date() , prefix = "") => {
    const date_options = {  year: 'numeric', month: 'long' };
    const date =  typeof time === "object" ? time : new Date (time.slice(0,10).split("-") ) ;

    if(checkBrowser()){
        let updated_at=[];      
        updated_at[9] = time[3];
        updated_at[8] = time[2];
        updated_at[7] = time[1];
        updated_at[6] = time[0];
        
        updated_at[5] = time[4];

        updated_at[4] = time[6];
        updated_at[3] = time[5];
       
        return updated_at;
    }
    else{
        return moment(date).format('MMM-YYYY');
    }
    
}

export const convertDate = date => {
    return moment(date).format('YYYY-MMM-DD');
}

export const lastDayMonth = time => {
    const date_options = {  year: 'numeric', month: 'short', day: 'numeric' };
    return  moment(time).clone().endOf('month').format('DD MMM YYYY');
}

export const checkBrowser = () => {
    let userAgentString = navigator.userAgent;
     // Detect Chrome
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;
    // Detect Safari
    let safariAgent = userAgentString.indexOf("Safari") > -1;
      
    // Discard Safari since it also matches Chrome
    if ((chromeAgent) && (safariAgent)) 
        safariAgent = false;

    return safariAgent;
}

export const checkArray = array => {
    let new_array = [];
        for (var key in array) {
            const element = array[key];
            if(element === null || element === undefined || element === "undefined"){
                new_array.push("");
            }
            else{
                new_array.push(element);
            }
        }
    return new_array;
}
