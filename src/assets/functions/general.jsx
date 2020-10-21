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
