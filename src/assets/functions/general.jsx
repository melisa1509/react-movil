import moment from "moment";
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
    
    return prefix + date.toLocaleDateString(undefined, date_options);
}

export const monthDate = ( time = new Date() , prefix = "") => {
    const date_options = {  year: 'numeric', month: 'long' };
    const date =  typeof time === "object" ? time : new Date (time.slice(0,10).split("-") ) ;
    
    return prefix + date.toLocaleDateString(undefined, date_options).charAt(0).toUpperCase() + date.toLocaleDateString(undefined, date_options).slice(1);
}

export const convertDate = date => {
    return moment(date).format('YYYY-MMM-DD');
}

export const lastDayMonth = time => {
    const date_options = {  year: 'numeric', month: 'short', day: 'numeric' };
    return  moment(time).clone().endOf('month').format('DD MMM YYYY');
}
